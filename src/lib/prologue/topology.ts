export const PROLOGUE_SEED = "ottofile-v1";
export const KERNEL_ROWS = 8;
export const KERNELS_PER_ROW = 32;
export const KERNEL_COUNT = KERNEL_ROWS * KERNELS_PER_ROW;

export type KernelTopology = {
  starts: Float32Array;
  controls: Float32Array;
  targets: Float32Array;
  metadata: Float32Array;
};

function hashSeed(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The topology is a visual system, not botanical data. Eight longitudinal
 * rows are the only authored fact; the per-row density is never exposed in UI.
 */
export function createKernelTopology(): KernelTopology {
  const random = mulberry32(hashSeed(PROLOGUE_SEED));
  const starts = new Float32Array(KERNEL_COUNT * 3);
  const controls = new Float32Array(KERNEL_COUNT * 3);
  const targets = new Float32Array(KERNEL_COUNT * 3);
  const metadata = new Float32Array(KERNEL_COUNT * 4);

  for (let row = 0; row < KERNEL_ROWS; row += 1) {
    const angle = (row / KERNEL_ROWS) * Math.PI * 2 + Math.PI / 8;
    const rowOffset = (random() * 2 - 1) * 0.045;

    for (let longitudinal = 0; longitudinal < KERNELS_PER_ROW; longitudinal += 1) {
      const index = row * KERNELS_PER_ROW + longitudinal;
      const offset = index * 3;
      const metaOffset = index * 4;
      const along = longitudinal / (KERNELS_PER_ROW - 1);
      const endTaper = Math.pow(Math.sin(along * Math.PI), 0.48);
      const tipBias = 1 - Math.max(0, along - 0.72) * 1.45;
      const contour = 0.28 + endTaper * 0.72 * tipBias;
      const profileIrregularity = 0.97 + Math.sin(longitudinal * 1.7 + row * 0.9) * 0.025;
      const radius = 0.49 * contour * profileIrregularity;
      const targetX = -0.78 + Math.cos(angle) * radius;
      const targetY = (along - 0.5) * 4.72 + 0.32 + rowOffset;
      const targetZ = Math.sin(angle) * radius * 0.78;

      // The first ten samples are deliberately composed around the cover;
      // the rest occupy a wider, seeded field revealed by scroll.
      const early = index < 10;
      const side = index % 2 === 0 ? -1 : 1;
      const startX = early ? side * (0.9 + random() * 1.75) : (random() * 2 - 1) * 4.6;
      const startY = early ? 0.7 + random() * 1.8 : (random() * 2 - 1) * 3.7;
      const startZ = -1.4 + random() * 4.8;
      const arcX = (startX + targetX) * 0.5 + (random() * 2 - 1) * 1.35;
      const arcY = (startY + targetY) * 0.5 + 0.8 + random() * 1.8;
      const arcZ = (startZ + targetZ) * 0.5 + (random() * 2 - 1) * 0.7;

      starts.set([startX, startY, startZ], offset);
      controls.set([arcX, arcY, arcZ], offset);
      targets.set([targetX, targetY, targetZ], offset);

      // order closes the cob from its centre towards the two tips.
      const centreDistance = Math.abs(along - 0.5) * 2;
      const order = centreDistance * 0.72 + random() * 0.28;
      metadata.set([row, longitudinal, index % 8, order], metaOffset);
    }
  }

  return { starts, controls, targets, metadata };
}

export type MeshData = {
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint16Array;
};

export function createKernelMesh(): MeshData {
  const radialSegments = 12;
  const verticalSegments = 10;
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  for (let vertical = 0; vertical <= verticalSegments; vertical += 1) {
    const v = vertical / verticalSegments;
    const latitude = (v - 0.5) * Math.PI;
    const ring = Math.pow(Math.max(0, Math.cos(latitude)), 0.72);
    const y = Math.sin(latitude) * 0.17;
    const crown = 0.78 + v * 0.28;

    for (let radial = 0; radial <= radialSegments; radial += 1) {
      const u = radial / radialSegments;
      const angle = u * Math.PI * 2;
      const nx = Math.cos(angle) * ring;
      const nz = Math.sin(angle) * ring;
      const micro = 1 + Math.sin(radial * 2.31 + vertical * 1.73) * 0.018;
      positions.push(nx * 0.204 * crown * micro, y, nz * 0.142 * micro);
      normals.push(nx, Math.sin(latitude), nz);
    }
  }

  for (let vertical = 0; vertical < verticalSegments; vertical += 1) {
    for (let radial = 0; radial < radialSegments; radial += 1) {
      const a = vertical * (radialSegments + 1) + radial;
      const b = a + radialSegments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices),
  };
}

type FlatMesh = { positions: Float32Array; roles: Float32Array };

function pushTriangle(target: number[], roles: number[], role: number, ...points: number[][]) {
  points.forEach((point) => {
    target.push(point[0], point[1], point[2]);
    roles.push(role);
  });
}

function pushRibbon(
  target: number[],
  roles: number[],
  role: number,
  root: [number, number, number],
  tip: [number, number, number],
  width: number,
) {
  const segments = 5;
  const control: [number, number, number] = [
    root[0] + (tip[0] - root[0]) * 0.52,
    root[1] + (tip[1] - root[1]) * 0.52 + 0.48,
    root[2] + (tip[2] - root[2]) * 0.52,
  ];
  const edges: Array<[[number, number, number], [number, number, number]]> = [];

  for (let segment = 0; segment <= segments; segment += 1) {
    const t = segment / segments;
    const inverse = 1 - t;
    const point: [number, number, number] = [
      inverse * inverse * root[0] + 2 * inverse * t * control[0] + t * t * tip[0],
      inverse * inverse * root[1] + 2 * inverse * t * control[1] + t * t * tip[1],
      inverse * inverse * root[2] + 2 * inverse * t * control[2] + t * t * tip[2],
    ];
    const tangentX = 2 * inverse * (control[0] - root[0]) + 2 * t * (tip[0] - control[0]);
    const tangentY = 2 * inverse * (control[1] - root[1]) + 2 * t * (tip[1] - control[1]);
    const tangentLength = Math.hypot(tangentX, tangentY) || 1;
    const taper = Math.pow(1 - t, 0.72);
    const normalX = (-tangentY / tangentLength) * width * taper;
    const normalY = (tangentX / tangentLength) * width * taper;
    edges.push([
      [point[0] + normalX, point[1] + normalY, point[2]],
      [point[0] - normalX, point[1] - normalY, point[2]],
    ]);
  }

  for (let segment = 0; segment < segments; segment += 1) {
    const [left, right] = edges[segment];
    const [nextLeft, nextRight] = edges[segment + 1];
    pushTriangle(target, roles, role, left, right, nextRight);
    pushTriangle(target, roles, role, left, nextRight, nextLeft);
  }
}

export function createPlantFieldMesh(): FlatMesh & {
  primaryVertexCount: number;
  plantVertexOffsets: number[];
} {
  const positions: number[] = [];
  const roles: number[] = [];

  // The tapered rachis sits behind the kernel rows. It is not a substitute
  // object: only its tips and the narrow channels between rows can be seen.
  const rachisLevels = 8;
  for (let level = 0; level < rachisLevels; level += 1) {
    const t0 = level / rachisLevels;
    const t1 = (level + 1) / rachisLevels;
    const y0 = -2.08 + t0 * 4.8;
    const y1 = -2.08 + t1 * 4.8;
    const profile0 = Math.pow(Math.sin(t0 * Math.PI), 0.38);
    const profile1 = Math.pow(Math.sin(t1 * Math.PI), 0.38);
    const half0 = 0.05 + profile0 * 0.13;
    const half1 = 0.05 + profile1 * 0.13;
    const left0: [number, number, number] = [-0.78 - half0, y0, -0.24];
    const right0: [number, number, number] = [-0.78 + half0, y0, -0.24];
    const left1: [number, number, number] = [-0.78 - half1, y1, -0.24];
    const right1: [number, number, number] = [-0.78 + half1, y1, -0.24];
    pushTriangle(positions, roles, 4, left0, right0, right1);
    pushTriangle(positions, roles, 4, left0, right1, left1);
  }

  // Primary stem and husk. They are present from frame one and emerge only
  // through the camera withdrawal, never through an opacity crossfade.
  pushTriangle(positions, roles, 0, [0.61, -7, 0], [0.74, -7, 0], [0.7, 4.4, 0]);
  pushTriangle(positions, roles, 0, [0.61, -7, 0], [0.7, 4.4, 0], [0.64, 4.4, 0]);
  pushTriangle(positions, roles, 0, [-0.22, -0.88, 0], [0.65, -0.58, 0], [0.64, -0.4, 0]);
  pushTriangle(positions, roles, 0, [-0.22, -0.88, 0], [0.64, -0.4, 0], [-0.26, -0.67, 0]);
  pushRibbon(positions, roles, 1, [0.66, -5.55, 0], [-3.05, -3.1, 0.25], 0.13);
  pushRibbon(positions, roles, 1, [0.67, -3.65, 0], [3.15, -1.35, -0.18], 0.13);
  pushRibbon(positions, roles, 1, [0.66, -1.85, 0], [-2.6, 0.2, 0.14], 0.11);
  pushRibbon(positions, roles, 1, [0.66, 0.65, 0], [2.75, 2.55, -0.12], 0.1);
  pushRibbon(positions, roles, 1, [0.66, 2.45, 0], [-1.75, 4.05, 0.1], 0.08);
  pushRibbon(positions, roles, 2, [-1.14, -1.92, 0.18], [-1.42, 1.35, 0.04], 0.12);
  pushRibbon(positions, roles, 2, [-0.42, -1.92, -0.18], [-0.14, 1.35, -0.04], 0.12);

  const primaryVertexCount = positions.length / 3;
  const plantVertexOffsets = [primaryVertexCount];
  const random = mulberry32(hashSeed(`${PROLOGUE_SEED}-field`));
  const plantRandom = Array.from({ length: 48 }, () => Array.from({ length: 6 }, () => random()));

  // Depth-major ordering keeps all eight cultivated lanes in every LOD:
  // mobile draws three depths, tablet four and desktop all six.
  for (let plant = 0; plant < 48; plant += 1) {
    const lane = plant % 8;
    const depth = Math.floor(plant / 8);
    const values = plantRandom[lane * 6 + depth];
    const z = -7.5 - depth * 3.15 - values[0] * 0.5;
    const x = (lane / 7 - 0.5) * 10.4 + (values[1] * 2 - 1) * 0.18;
    const groundY = -6.9;
    const height = 1.45 + values[2] * 0.95;
    const stemHalf = 0.025 + values[3] * 0.018;
    const startVertex = positions.length / 3;

    pushTriangle(
      positions,
      roles,
      3,
      [x - stemHalf, groundY, z],
      [x + stemHalf, groundY, z],
      [x + stemHalf * 0.55, groundY + height, z],
    );
    pushTriangle(
      positions,
      roles,
      3,
      [x - stemHalf, groundY, z],
      [x + stemHalf * 0.55, groundY + height, z],
      [x - stemHalf * 0.55, groundY + height, z],
    );
    const leafDirection = lane % 2 === 0 ? -1 : 1;
    pushRibbon(
      positions,
      roles,
      3,
      [x, groundY + height * 0.42, z],
      [x + leafDirection * (0.55 + values[4] * 0.5), groundY + height * 0.68, z + 0.05],
      0.055,
    );
    pushRibbon(
      positions,
      roles,
      3,
      [x, groundY + height * 0.64, z],
      [x - leafDirection * (0.45 + values[5] * 0.45), groundY + height * 0.82, z - 0.04],
      0.045,
    );
    plantVertexOffsets.push(startVertex + (positions.length / 3 - startVertex));
  }

  return {
    positions: new Float32Array(positions),
    roles: new Float32Array(roles),
    primaryVertexCount,
    plantVertexOffsets,
  };
}
