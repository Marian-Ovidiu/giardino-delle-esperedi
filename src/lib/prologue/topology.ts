export const PROLOGUE_SEED = "ottofile-v1";
export const KERNEL_ROWS = 8;
export const KERNELS_PER_ROW = 32;
export const KERNEL_COUNT = KERNEL_ROWS * KERNELS_PER_ROW;

export type KernelTopology = {
  starts: Float32Array;
  controls: Float32Array;
  targets: Float32Array;
  metadata: Float32Array;
  /**
   * The seeded vertical offset of each of the eight kernel rows.
   *
   * Exposed so the closing incisions can be generated FROM the rows rather
   * than merely looping to eight: each mark inherits the pressure irregularity
   * of the row it came from, which is what makes the unroll a transformation
   * of one object instead of a coincidence of counts.
   */
  rowOffsets: Float32Array;
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
  const rowOffsets = new Float32Array(KERNEL_ROWS);

  for (let row = 0; row < KERNEL_ROWS; row += 1) {
    const angle = (row / KERNEL_ROWS) * Math.PI * 2 + Math.PI / 8;
    const rowOffset = (random() * 2 - 1) * 0.045;
    rowOffsets[row] = rowOffset;

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

  return { starts, controls, targets, metadata, rowOffsets };
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

  /*
   * A TOOTH, NOT A BEAD.
   *
   * The kernel used to be 0.432 radial × 0.34 along-cob (1.27 : 1) — near
   * spherical. Against the 0.1523 along-cob pitch that is 2.23x overlap:
   * kernels drowned in each other and the eight rows had nowhere to show a
   * seam. Rendered at full opacity with the veil removed the cob was still
   * formless, which is how we know the 0.18 layer opacity was never the cause.
   *
   * Now 0.44 w (radial) × 0.20 h (along-cob) × 0.30 d (circumferential) —
   * 2.2 : 1, and 1.31x overlap, so kernels imbricate like roof tiles the way
   * they do on the client's own illustration. Volume is roughly preserved, so
   * the cob's mass does not change.
   *
   * Art Director direction: docs/prologo-rifinitura.md §1.
   */
  const halfRadial = 0.22;
  const halfAxial = 0.1;
  const halfCircumferential = 0.15;
  /** The plane of the outer face, as a fraction of the radial half-extent. */
  const faceLimit = 0.62;

  for (let vertical = 0; vertical <= verticalSegments; vertical += 1) {
    const v = vertical / verticalSegments;
    const latitude = (v - 0.5) * Math.PI;
    const ring = Math.pow(Math.max(0, Math.cos(latitude)), 0.72);
    const y = Math.sin(latitude) * halfAxial;

    for (let radial = 0; radial <= radialSegments; radial += 1) {
      const u = radial / radialSegments;
      const angle = u * Math.PI * 2;
      const nx = Math.cos(angle) * ring;
      const nz = Math.sin(angle) * ring;
      const micro = 1 + Math.sin(radial * 2.31 + vertical * 1.73) * 0.018;

      // Flatten the outer 40% of the radial profile: beyond the face plane the
      // surface is squashed almost flat, so the kernel presents a face instead
      // of a dome. A shallow distal crease down the centre of that face stops
      // it reading as a slab.
      let px = nx * halfRadial * micro;
      let faceNormalBlend = 0;
      if (px > halfRadial * faceLimit) {
        const beyond = px - halfRadial * faceLimit;
        px = halfRadial * faceLimit + beyond * 0.22;
        faceNormalBlend = Math.min(1, beyond / (halfRadial * (1 - faceLimit)));
        const crease = Math.cos(v * Math.PI) * 0.012;
        px -= crease * faceNormalBlend;
      }

      positions.push(px, y, nz * halfCircumferential * micro);

      // On the flattened face the surface is a plane, so its normal is the
      // radial axis. Blending avoids a hard shading edge at the face rim.
      const flat = faceNormalBlend * faceNormalBlend;
      normals.push(nx + (1 - nx) * flat, Math.sin(latitude) * (1 - flat), nz * (1 - flat));
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

  /*
   * THE PLANT — grown, tapered, noded, tasselled.
   *
   * It used to be a uniform-width rectangle 11.4 units tall carrying five
   * ribbons from arbitrary heights, with the cob floating beside it on an
   * invisible peduncle. The cob is 4.72 units, so it occupied 41% of its own
   * plant's height; on real maize an ear is about 9% of the stalk. The plant
   * had been scaled down to the cob, which is exactly why it read as "un
   * rametto". The cob is NOT shrunk — `pannocchia` needs it at frame scale.
   * The plant grows instead, and the camera pulls back to match.
   *
   * Art Director direction: docs/prologo-rifinitura.md §3.
   */
  const GROUND = -7;
  const STALK_TOP = 41;
  const STALK_HEIGHT = STALK_TOP - GROUND;
  const STALK_X = 0.675;
  const NODES = 11;
  const stalkRandom = mulberry32(hashSeed(`${PROLOGUE_SEED}-stalk`));

  /** 0.16 at the base to 0.07 at the tip — an object, not a drawn line. */
  const stalkHalf = (t: number) => 0.16 - t * 0.09;

  const stalkSegments = 22;
  for (let segment = 0; segment < stalkSegments; segment += 1) {
    const t0 = segment / stalkSegments;
    const t1 = (segment + 1) / stalkSegments;
    const y0 = GROUND + t0 * STALK_HEIGHT;
    const y1 = GROUND + t1 * STALK_HEIGHT;
    const h0 = stalkHalf(t0);
    const h1 = stalkHalf(t1);
    pushTriangle(
      positions,
      roles,
      0,
      [STALK_X - h0, y0, 0],
      [STALK_X + h0, y0, 0],
      [STALK_X + h1, y1, 0],
    );
    pushTriangle(
      positions,
      roles,
      0,
      [STALK_X - h0, y0, 0],
      [STALK_X + h1, y1, 0],
      [STALK_X - h1, y1, 0],
    );
  }

  // Nodes. Leaves emerge FROM them, alternating, instead of sprouting from
  // arbitrary points on a node-less pole.
  for (let node = 0; node < NODES; node += 1) {
    const t = 0.06 + (node / (NODES - 1)) * 0.86;
    const y = GROUND + t * STALK_HEIGHT;
    const half = stalkHalf(t);
    const side = node % 2 === 0 ? -1 : 1;
    const jitter = stalkRandom();

    // A visible node mark: a slight collar where the leaf attaches.
    pushTriangle(
      positions,
      roles,
      0,
      [STALK_X - half * 1.5, y, 0],
      [STALK_X + half * 1.5, y, 0],
      [STALK_X + half * 1.2, y + half * 1.6, 0],
    );

    /*
     * Leaves are scaled TO the plant, not to the old pole. On maize a lower
     * leaf is roughly a third of the stalk's height in length and arches hard;
     * at 48 units, the 7-unit ribbons that used to be here read as twigs.
     * They shorten and steepen toward the tip, as they do on the plant.
     */
    const reach = (16.5 - t * 10.5) * (0.84 + jitter * 0.3);
    const rise = 4.2 - t * 2.4 + jitter * 1.3;
    const width = 0.36 - t * 0.2;
    const zLean = side * 0.5 * (jitter - 0.5);

    /*
     * A maize leaf ARCHES — a long shallow curve, not a peak. One straight
     * ribbon gave a rigid spike and eleven of them read as a fir tree; two
     * segments put a hard corner at the shoulder and made them chevrons.
     * Three segments with gentle angles carry the curve, and the blade
     * narrows along its length to a point.
     */
    const knots: [number, number, number][] = [
      [0, 0, 0],
      [0.34, rise * 0.72, 0.35],
      [0.7, rise, 0.75],
      [1, rise * 0.36, 1],
    ];
    for (let segment = 0; segment < knots.length - 1; segment += 1) {
      const [a, ay, az] = knots[segment];
      const [c, cy, cz] = knots[segment + 1];
      pushRibbon(
        positions,
        roles,
        1,
        [STALK_X + side * reach * a, y + ay, zLean * az],
        [STALK_X + side * reach * c, y + cy, zLean * cz],
        width * (1 - segment * 0.26),
      );
    }
  }

  /*
   * THE TASSEL.
   *
   * There was none. A maize plant is identified by its tassel before anything
   * else — it is the most recognisable silhouette in the crop, and its absence
   * was the single largest reason the stage read as a twig.
   */
  const TASSEL_BASE = STALK_TOP;
  pushRibbon(
    positions,
    roles,
    1,
    [STALK_X, TASSEL_BASE, 0],
    [STALK_X + 0.35, TASSEL_BASE + 5.6, 0],
    0.055,
  );
  for (let branch = 0; branch < 7; branch += 1) {
    const t = branch / 6;
    const side = branch % 2 === 0 ? -1 : 1;
    const jitter = stalkRandom();
    const root = TASSEL_BASE + 0.4 + t * 2.1;
    pushRibbon(
      positions,
      roles,
      1,
      [STALK_X + side * 0.05, root, 0],
      [
        STALK_X + side * (1.5 + jitter * 1.25) * (1 - t * 0.42),
        root + 2.5 + jitter * 1.4,
        side * 0.3 * (jitter - 0.5),
      ],
      0.042,
    );
  }

  // The shank. The cob used to float beside the stalk on a peduncle triangle
  // invisible at any opacity: the protagonist was not attached to the plant it
  // grows on.
  pushRibbon(positions, roles, 0, [STALK_X, -1.55, 0], [-0.58, -1.15, -0.12], 0.09);

  /*
   * HUSK — five ribbons, from 0.34, longer than the cob.
   *
   * It was two grey ribbons revealed at 0.44, so the `pannocchia` stage showed
   * a NAKED cob. The reference illustration is roughly half husk. Value 0.80,
   * not stone: composited at 0.18 that sits about 3.6% darker than paper
   * against the old husk's 8%. The husk is the LIGHT shape and the cob is the
   * DARK shape — that opposition is the whole structure of the reference, and
   * all three organs used to be rendered in one grey.
   */
  /*
   * They must OPEN. Five parallel ribbons rising straight from a common root
   * tile into a pale slab behind the cob — which is what the first attempt
   * produced. In the reference the husks peel outward and downward with hooked
   * tips, so the tips fan wide and two of them fall below the cob's base.
   * `pushRibbon` draws a straight ribbon, so the curl is carried by the spread
   * of the tips rather than by bending any one leaf.
   */
  const huskSpread: [number, number, number][] = [
    // rootX, tipX, tipY
    [-1.15, -3.15, 1.4],
    [-0.95, -1.85, 3.5],
    [-0.78, -0.55, 3.9],
    [-0.6, 0.75, 2.9],
    [-0.42, 1.85, -0.4],
  ];
  for (let leaf = 0; leaf < huskSpread.length; leaf += 1) {
    const [rootX, tipX, tipY] = huskSpread[leaf];
    const jitter = stalkRandom();
    const z = (leaf - 2) * 0.16;
    pushRibbon(
      positions,
      roles,
      2,
      [rootX, -2.5, z * 0.35],
      [tipX + (jitter - 0.5) * 0.4, tipY + (jitter - 0.5) * 0.7, z],
      0.19 + jitter * 0.05,
    );
  }

  const primaryVertexCount = positions.length / 3;
  const plantVertexOffsets = [primaryVertexCount];
  const random = mulberry32(hashSeed(`${PROLOGUE_SEED}-field`));
  /*
   * NO LANES.
   *
   * This used to be `const lane = plant % 8` — the field was sown in eight
   * lanes, and `snapshot()` exposed `fieldLaneCount: 8`. Two things wrong with
   * that. Eight rows per cob is a varietal characteristic of a single ear and
   * has nothing whatever to do with how many rows you sow in a field, so it
   * was a fabricated agronomic claim. And it put a SECOND eight on a site that
   * is allowed exactly one — the same error class the Content Strategist ruled
   * on over the rail's 64 marks: a property of the interface masquerading as a
   * property of the plant.
   *
   * Spacing is now irregular and seeded. Art Director direction §2 and §4.
   */
  const FIELD_PLANTS = 360;
  const FIELD_DEPTHS = 10;
  // At the field camera the frame is 145 units wide at the near row, so 200
  // runs past both edges: a field with visible ends is a flowerbed.
  //
  // 36 plants per band, not 14. The count the direction asked for was derived
  // in the old world, where a plant was 2 units tall and the frame 27 wide;
  // once the world grew 4.2x to match the hero plant, the same count spread
  // to a spacing of 15 units and read as a scatter. At 5.6 units, against
  // leaves that reach 11 to 21, the plants overlap and the field reads as mass.
  const FIELD_SPAN = 125;
  const perDepth = FIELD_PLANTS / FIELD_DEPTHS;
  const plantRandom = Array.from({ length: FIELD_PLANTS }, () =>
    Array.from({ length: 6 }, () => random()),
  );

  // Depth-major ordering keeps the full width of the field in every LOD: a
  // shallower device draws fewer depth bands, never a narrower field.
  for (let plant = 0; plant < FIELD_PLANTS; plant += 1) {
    const depth = Math.floor(plant / perDepth);
    const withinDepth = plant % perDepth;
    const values = plantRandom[plant];
    const z = -20 - depth * 9 - values[0] * 4;
    // Irregular across the span, so no rhythm can be read as a sown row.
    const x = ((withinDepth + (values[1] - 0.5) * 0.85) / (perDepth - 1) - 0.5) * FIELD_SPAN;
    const groundY = -7;
    // Same world as the hero plant: a 2-unit stalk behind a 54-unit one
    // was the reason the hero cob stood three times taller than a whole
    // mature plant and hung unattached in the sky above the crop.
    const height = 34 + values[2] * 16;
    const stemHalf = 0.5 + values[3] * 0.36;
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
    const leafDirection = values[3] > 0.5 ? -1 : 1;
    pushRibbon(
      positions,
      roles,
      3,
      [x, groundY + height * 0.42, z],
      [x + leafDirection * (11 + values[4] * 10), groundY + height * 0.68, z + 1],
      1.1,
    );
    pushRibbon(
      positions,
      roles,
      3,
      [x, groundY + height * 0.64, z],
      [x - leafDirection * (9 + values[5] * 9), groundY + height * 0.82, z - 0.8],
      0.9,
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
