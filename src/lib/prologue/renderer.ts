import {
  createKernelMesh,
  createKernelTopology,
  createPlantFieldMesh,
  KERNEL_COUNT,
  KERNEL_ROWS,
  KERNELS_PER_ROW,
  PROLOGUE_SEED,
} from "./topology";
import {
  fieldFragmentShader,
  fieldVertexShader,
  incisionFragmentShader,
  incisionVertexShader,
  kernelFragmentShader,
  kernelVertexShader,
} from "./shaders";

type Stage = "dispersione" | "attrazione" | "pannocchia" | "pianta" | "campo" | "registro";

export type PrologueSnapshot = {
  progress: number;
  stage: Stage;
  kernelCount: number;
  lockedCount: number;
  rows: number;
  cameraZ: number;
  plantReveal: number;
  fieldReveal: number;
  flattened: number;
  pointerYaw: number;
  pointerPitch: number;
  dpr: number;
  plantCount: number;
  fieldDepthCount: number;
  depthScale: number;
  drawCalls: number;
  renderCount: number;
  seed: string;
  renderHash: string;
};

type ProgramInfo = {
  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
};

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smooth(value: number) {
  const bounded = clamp(value);
  return bounded * bounded * (3 - 2 * bounded);
}

function range(progress: number, start: number, end: number) {
  return smooth((progress - start) / (end - start));
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to allocate WebGL shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader compilation failure.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to allocate WebGL program.");
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown WebGL linking failure.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function createBuffer(
  gl: WebGL2RenderingContext,
  location: number,
  size: number,
  data: Float32Array,
  divisor = 0,
) {
  const buffer = gl.createBuffer();
  if (!buffer) throw new Error("Unable to allocate WebGL buffer.");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data as Float32Array<ArrayBuffer>, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  if (divisor) gl.vertexAttribDivisor(location, divisor);
  return buffer;
}

function perspective(out: Float32Array, fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  out.fill(0);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) / (near - far);
  out[11] = -1;
  out[14] = (2 * far * near) / (near - far);
  return out;
}

function lookAt(
  out: Float32Array,
  eye: [number, number, number],
  target: [number, number, number],
) {
  let zx = eye[0] - target[0];
  let zy = eye[1] - target[1];
  let zz = eye[2] - target[2];
  const zLength = Math.hypot(zx, zy, zz) || 1;
  zx /= zLength;
  zy /= zLength;
  zz /= zLength;
  let xx = zz;
  let xy = 0;
  let xz = -zx;
  const xLength = Math.hypot(xx, xy, xz) || 1;
  xx /= xLength;
  xy /= xLength;
  xz /= xLength;
  const yx = zy * xz - zz * xy;
  const yy = zz * xx - zx * xz;
  const yz = zx * xy - zy * xx;

  out.set([
    xx,
    yx,
    zx,
    0,
    xy,
    yy,
    zy,
    0,
    xz,
    yz,
    zz,
    0,
    -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
    -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
    -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
    1,
  ]);
  return out;
}

function multiply(out: Float32Array, a: Float32Array, b: Float32Array) {
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      out[column * 4 + row] =
        a[row] * b[column * 4] +
        a[4 + row] * b[column * 4 + 1] +
        a[8 + row] * b[column * 4 + 2] +
        a[12 + row] * b[column * 4 + 3];
    }
  }
  return out;
}

function stageFor(progress: number): Stage {
  if (progress < 0.12) return "dispersione";
  if (progress < 0.34) return "attrazione";
  if (progress < 0.44) return "pannocchia";
  if (progress < 0.6) return "pianta";
  if (progress < 0.76) return "campo";
  return "registro";
}

function hashState(values: number[]) {
  let hash = 2166136261;
  values.forEach((number) => {
    const integer = Math.round(number * 10_000);
    hash ^= integer;
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export class PrologueRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly gl: WebGL2RenderingContext;
  private readonly kernel: ProgramInfo;
  private readonly field: ProgramInfo;
  private readonly incision: ProgramInfo;
  private readonly kernelIndexCount: number;
  private readonly fieldVertexCounts: Record<180 | 252 | 360, number>;
  private readonly incisionVertexCount: number;
  private readonly buffers: WebGLBuffer[] = [];
  private progress = 0;
  private pointer: [number, number] = [0, 0];
  private width = 1;
  private height = 1;
  private dpr = 1;
  private plantCount: 180 | 252 | 360 = 360;
  private depthScale = 1;
  private renderCount = 0;
  private readonly projection = new Float32Array(16);
  private readonly view = new Float32Array(16);
  private readonly viewProjection = new Float32Array(16);
  private cameraZ = 11;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    if (!gl) throw new Error("WebGL2 is unavailable.");
    this.gl = gl;

    const kernelMesh = createKernelMesh();
    const topology = createKernelTopology();
    const kernelProgram = createProgram(gl, kernelVertexShader, kernelFragmentShader);
    const kernelVao = gl.createVertexArray();
    if (!kernelVao) throw new Error("Unable to allocate kernel VAO.");
    gl.bindVertexArray(kernelVao);
    this.buffers.push(createBuffer(gl, 0, 3, kernelMesh.positions));
    this.buffers.push(createBuffer(gl, 1, 3, kernelMesh.normals));
    this.buffers.push(createBuffer(gl, 2, 3, topology.starts, 1));
    this.buffers.push(createBuffer(gl, 3, 3, topology.controls, 1));
    this.buffers.push(createBuffer(gl, 4, 3, topology.targets, 1));
    this.buffers.push(createBuffer(gl, 5, 4, topology.metadata, 1));
    const kernelIndexBuffer = gl.createBuffer();
    if (!kernelIndexBuffer) throw new Error("Unable to allocate kernel index buffer.");
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kernelIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, kernelMesh.indices, gl.STATIC_DRAW);
    this.buffers.push(kernelIndexBuffer);
    this.kernel = { program: kernelProgram, vao: kernelVao };
    this.kernelIndexCount = kernelMesh.indices.length;

    const fieldMesh = createPlantFieldMesh();
    const fieldProgram = createProgram(gl, fieldVertexShader, fieldFragmentShader);
    const fieldVao = gl.createVertexArray();
    if (!fieldVao) throw new Error("Unable to allocate field VAO.");
    gl.bindVertexArray(fieldVao);
    this.buffers.push(createBuffer(gl, 0, 3, fieldMesh.positions));
    this.buffers.push(createBuffer(gl, 1, 1, fieldMesh.roles));
    this.field = { program: fieldProgram, vao: fieldVao };
    /*
     * LOD by DEPTH, never by width. 14 plants per depth band, so a shallower
     * device draws fewer bands and the field keeps its full 34-unit span —
     * a narrower field would read as a flowerbed again, which is the defect
     * this change exists to fix.
     */
    this.fieldVertexCounts = {
      180: fieldMesh.plantVertexOffsets[180] ?? fieldMesh.primaryVertexCount,
      252: fieldMesh.plantVertexOffsets[252] ?? fieldMesh.primaryVertexCount,
      360: fieldMesh.plantVertexOffsets[360] ?? fieldMesh.positions.length / 3,
    };

    const incisionProgram = createProgram(gl, incisionVertexShader, incisionFragmentShader);
    const incisionVao = gl.createVertexArray();
    if (!incisionVao) throw new Error("Unable to allocate incision VAO.");
    gl.bindVertexArray(incisionVao);
    /*
     * The eight closing marks are generated FROM the eight kernel rows.
     *
     * They used to be an independent buffer that merely looped to KERNEL_ROWS
     * — eight marks that RESEMBLED the rows without being them. Each line now
     * carries its own row's seeded offset, so it inherits the pressure
     * irregularity of the row it came from and the unroll is one object lying
     * down rather than a coincidence of counts.
     *
     * Proof by continuity, never by enumeration: nobody is asked to count. A
     * reader who counts finds eight; a reader who does not sees a cob become a
     * record. Art Director direction, docs/prologo-rifinitura.md §2.
     */
    const corners: number[] = [];
    const lineIndices: number[] = [];
    const bands: number[] = [];
    const rowOffsets: number[] = [];
    for (let line = 0; line < KERNEL_ROWS; line += 1) {
      const rowOffset = topology.rowOffsets[line];
      for (const band of [-2, -1, 0, 1]) {
        for (let segment = 0; segment < 12; segment += 1) {
          const x0 = -1 + (segment / 12) * 2;
          const x1 = -1 + ((segment + 1) / 12) * 2;
          corners.push(x0, -1, x1, -1, x0, 1, x0, 1, x1, -1, x1, 1);
          lineIndices.push(line, line, line, line, line, line);
          bands.push(band, band, band, band, band, band);
          rowOffsets.push(rowOffset, rowOffset, rowOffset, rowOffset, rowOffset, rowOffset);
        }
      }
    }
    this.buffers.push(createBuffer(gl, 0, 2, new Float32Array(corners)));
    this.buffers.push(createBuffer(gl, 1, 1, new Float32Array(lineIndices)));
    this.buffers.push(createBuffer(gl, 2, 1, new Float32Array(bands)));
    this.buffers.push(createBuffer(gl, 3, 1, new Float32Array(rowOffsets)));
    this.incisionVertexCount = lineIndices.length;
    this.incision = { program: incisionProgram, vao: incisionVao };

    gl.bindVertexArray(null);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.BLEND);
  }

  resize(cssWidth: number, cssHeight: number) {
    this.width = Math.max(1, cssWidth);
    this.height = Math.max(1, cssHeight);
    const viewport = window.innerWidth;
    const deviceDpr =
      viewport < 768
        ? 1
        : viewport < 1280
          ? Math.min(devicePixelRatio, 1.25)
          : Math.min(devicePixelRatio, 1.5);
    const pixelBudgetDpr = Math.sqrt(4_200_000 / (this.width * this.height));
    const dimensionDpr = Math.min(4096 / this.width, 4096 / this.height);
    this.dpr = Math.max(0.1, Math.min(deviceDpr, pixelBudgetDpr, dimensionDpr));
    this.plantCount = viewport < 768 ? 180 : viewport < 1280 ? 252 : 360;
    this.depthScale = viewport < 768 ? 0.72 : viewport < 1280 ? 0.86 : 1;
    const width = Math.round(this.width * this.dpr);
    const height = Math.round(this.height * this.dpr);
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
    }
    this.gl.viewport(0, 0, width, height);
    this.render();
  }

  setProgress(progress: number) {
    this.progress = clamp(progress);
    if (
      (this.progress >= 0.34 && this.progress <= 0.44) ||
      (this.progress >= 0.76 && this.progress <= 0.92)
    ) {
      this.pointer = [0, 0];
    }
    this.render();
  }

  setPointer(yaw: number, pitch: number) {
    const gated =
      (this.progress >= 0.34 && this.progress <= 0.44) ||
      (this.progress >= 0.76 && this.progress <= 0.92);
    this.pointer = gated ? [0, 0] : [clamp(yaw, -1, 1), clamp(pitch, -1, 1)];
    this.render();
  }

  render() {
    this.renderCount += 1;
    const gl = this.gl;
    const plantPullback = range(this.progress, 0.44, 0.6);
    const fieldPullback = range(this.progress, 0.6, 0.76);
    const registerPullback = range(this.progress, 0.76, 0.92);
    /*
     * The plant-stage pullback was 12.5 -> 21.5, i.e. 1.7x: the camera barely
     * moved, so the promised step out from cob to plant never happened. The
     * stalk is now 48 units tall, so the withdrawal has to match it — 4.2x —
     * or the plant simply does not fit the frame.
     */
    /*
     * The withdrawal is arithmetic, not taste. At a 28 degree vertical FOV the
     * visible height is 2 * z * tan(14 deg) = 0.4986 * z. The plant is 54 units
     * tall including the tassel, so seeing it whole needs z about 108 — an 8.6x
     * step out from the cob's 12.5. It used to be 1.7x, which is why the
     * promised move from cob to plant never happened.
     */
    this.cameraZ = 12.5 + plantPullback * 96 + fieldPullback * 18 + registerPullback * 40;
    // And the camera climbs to the plant's centre: the subject was 11 units
    // tall and is now 54.
    /*
     * The camera climbs to the plant's centre, then comes back DOWN for the
     * field. The subject changes from a 54-unit stalk to a crop standing on
     * the ground: holding the gaze at y = 24 left the field in the bottom
     * eighth of the frame, which is most of why it read as empty.
     */
    const targetY = 0.32 + plantPullback * 19 - fieldPullback * 13;
    const cameraY = fieldPullback * 3.2 * this.depthScale;
    const aspect = this.width / this.height;
    /*
     * Far plane 320, not 120. The camera retreats to z≈166 by the register
     * stage and the deepest field row sits at z≈-87, so the crop stands 250
     * units from the eye. At 120 the whole field was clipped away and only
     * the tassel of the hero plant — the one part inside the old plane —
     * survived, which is why the campo stage rendered as an empty page.
     */
    perspective(this.projection, (28 * Math.PI) / 180, aspect, 0.5, 320);
    const targetX = -0.78 * (1 - plantPullback);
    const cameraTarget: [number, number, number] = [
      targetX,
      targetY,
      -fieldPullback * 2.2 * this.depthScale,
    ];
    const cameraEye: [number, number, number] = [targetX * 0.18, cameraY, this.cameraZ];
    const yaw = (this.pointer[0] * 0.35 * Math.PI) / 180;
    const pitch = (this.pointer[1] * 0.2 * Math.PI) / 180;
    const deltaX = cameraEye[0] - cameraTarget[0];
    const deltaY = cameraEye[1] - cameraTarget[1];
    const deltaZ = cameraEye[2] - cameraTarget[2];
    const yawX = deltaX * Math.cos(yaw) + deltaZ * Math.sin(yaw);
    const yawZ = -deltaX * Math.sin(yaw) + deltaZ * Math.cos(yaw);
    const pitchY = deltaY * Math.cos(pitch) - yawZ * Math.sin(pitch);
    const pitchZ = deltaY * Math.sin(pitch) + yawZ * Math.cos(pitch);
    lookAt(
      this.view,
      [cameraTarget[0] + yawX, cameraTarget[1] + pitchY, cameraTarget[2] + pitchZ],
      cameraTarget,
    );
    multiply(this.viewProjection, this.projection, this.view);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Cultivated lanes sit behind the plant and cob until the objects leave
    // the page during flattening. Drawing them first prevents intersections.
    gl.disable(gl.DEPTH_TEST);
    gl.useProgram(this.incision.program);
    gl.bindVertexArray(this.incision.vao);
    gl.uniform1f(gl.getUniformLocation(this.incision.program, "uProgress"), this.progress);
    gl.uniform1f(gl.getUniformLocation(this.incision.program, "uAspect"), aspect);
    gl.drawArrays(gl.TRIANGLES, 0, this.incisionVertexCount);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(this.field.program);
    gl.bindVertexArray(this.field.vao);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.field.program, "uViewProjection"),
      false,
      this.viewProjection,
    );
    gl.uniform1f(gl.getUniformLocation(this.field.program, "uProgress"), this.progress);
    // Wind is progress-driven, not time-driven: scroll reversal is exact.
    gl.uniform1f(gl.getUniformLocation(this.field.program, "uWind"), this.progress * Math.PI * 4);
    gl.drawArrays(gl.TRIANGLES, 0, this.fieldVertexCounts[this.plantCount]);

    gl.useProgram(this.kernel.program);
    gl.bindVertexArray(this.kernel.vao);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.kernel.program, "uViewProjection"),
      false,
      this.viewProjection,
    );
    gl.uniform1f(gl.getUniformLocation(this.kernel.program, "uProgress"), this.progress);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.kernelIndexCount,
      gl.UNSIGNED_SHORT,
      0,
      KERNEL_COUNT,
    );

    gl.bindVertexArray(null);
  }

  snapshot(): PrologueSnapshot {
    const attraction = range(this.progress, 0.12, 0.34);
    const plantReveal = range(this.progress, 0.44, 0.56);
    const fieldReveal = range(this.progress, 0.6, 0.76);
    const flattened = range(this.progress, 0.76, 0.92);
    const lockedCount = Math.round(KERNEL_COUNT * attraction);
    const hash = hashState([
      this.progress,
      attraction,
      plantReveal,
      fieldReveal,
      flattened,
      this.cameraZ,
      this.width,
      this.height,
    ]);

    return {
      progress: this.progress,
      stage: stageFor(this.progress),
      kernelCount: KERNEL_COUNT,
      lockedCount,
      rows: KERNEL_ROWS,
      cameraZ: this.cameraZ,
      plantReveal,
      fieldReveal,
      flattened,
      pointerYaw: this.pointer[0] * 0.35,
      pointerPitch: this.pointer[1] * 0.2,
      dpr: this.dpr,
      plantCount: this.plantCount,
      // fieldLaneCount removed: the field is no longer sown in lanes, and
      // publishing a lane count re-asserted the agronomic claim that was the
      // reason for removing them (topology.ts, createPlantFieldMesh).
      fieldDepthCount: this.plantCount / 36,
      depthScale: this.depthScale,
      drawCalls: 3,
      renderCount: this.renderCount,
      seed: PROLOGUE_SEED,
      renderHash: hash,
    };
  }

  destroy() {
    this.gl.deleteProgram(this.kernel.program);
    this.gl.deleteProgram(this.field.program);
    this.gl.deleteProgram(this.incision.program);
    this.gl.deleteVertexArray(this.kernel.vao);
    this.gl.deleteVertexArray(this.field.vao);
    this.gl.deleteVertexArray(this.incision.vao);
    this.buffers.forEach((buffer) => this.gl.deleteBuffer(buffer));
  }
}

export { KERNEL_COUNT, KERNEL_ROWS, KERNELS_PER_ROW, PROLOGUE_SEED };
