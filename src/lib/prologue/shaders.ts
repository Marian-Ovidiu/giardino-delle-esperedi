export const kernelVertexShader = `#version 300 es
precision highp float;

layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec3 aStart;
layout(location = 3) in vec3 aControl;
layout(location = 4) in vec3 aTarget;
layout(location = 5) in vec4 aMeta;

uniform mat4 uViewProjection;
uniform float uProgress;

out float vLight;
out float vVariant;

float easeInOut(float value) {
  value = clamp(value, 0.0, 1.0);
  return value * value * (3.0 - 2.0 * value);
}

void main() {
  float order = aMeta.w;
  float reveal = smoothstep(0.08 + order * 0.16, 0.18 + order * 0.16, uProgress);
  float travel = easeInOut((uProgress - (0.12 + order * 0.075)) / (0.22 - order * 0.035));
  float oneMinus = 1.0 - travel;
  vec3 centre = oneMinus * oneMinus * aStart + 2.0 * oneMinus * travel * aControl + travel * travel * aTarget;

  // Six kernels inherit the first hero frame; eight more arrive almost
  // imperceptibly before the magnetic assembly begins.
  float firstBreath = smoothstep(0.0, 0.12, uProgress);
  float initialLimit = mix(5.5, 13.5, firstBreath);
  float initial = 1.0 - step(initialLimit, float(gl_InstanceID));
  float visibility = max(initial, reveal);

  if (gl_InstanceID < 14) {
    float index = float(gl_InstanceID);
    centre.xy += vec2(sin(index * 2.17), cos(index * 1.63)) * firstBreath * 0.12;
  }

  // Field-to-register exit is geometric: red objects contract and leave the
  // field rather than fading or tinting the paper.
  float flatten = easeInOut((uProgress - 0.76) / 0.16);
  centre.y -= flatten * (5.0 + abs(centre.x) * 0.4);

  float variant = aMeta.z;
  float widthVariant = 0.90 + mod(variant, 4.0) * 0.045;
  float heightVariant = 0.91 + floor(variant / 4.0) * 0.11 + mod(variant, 2.0) * 0.025;
  vec3 local = aPosition * vec3(widthVariant, heightVariant, 1.0);

  float angle = aMeta.x * 0.78539816339 + 0.39269908169;
  mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  local.xz = rotation * local.xz;
  float irregularRotation = (variant - 3.5) * 0.016;
  mat2 faceRotation = mat2(
    cos(irregularRotation), -sin(irregularRotation),
    sin(irregularRotation), cos(irregularRotation)
  );
  local.xy = faceRotation * local.xy;

  float axialRotation = 0.78539816339 * smoothstep(0.34, 0.44, uProgress);
  mat2 axial = mat2(
    cos(axialRotation), -sin(axialRotation),
    sin(axialRotation), cos(axialRotation)
  );
  vec3 axialPivot = vec3(-0.78, 0.32, 0.0);
  vec3 axialCentre = centre - axialPivot;
  axialCentre.xz = axial * axialCentre.xz;
  centre = axialPivot + axialCentre;
  local.xz = axial * local.xz;

  // The completed cob briefly inclines towards the camera. Its upper end
  // exposes the eight-row circumference without flattening the topology.
  float tilt = 0.24 * smoothstep(0.32, 0.36, uProgress) * (1.0 - smoothstep(0.44, 0.52, uProgress));
  mat2 cobTilt = mat2(cos(tilt), -sin(tilt), sin(tilt), cos(tilt));
  vec3 pivot = vec3(-0.78, 0.32, 0.0);
  vec3 relativeCentre = centre - pivot;
  relativeCentre.yz = cobTilt * relativeCentre.yz;
  centre = pivot + relativeCentre;
  local.yz = cobTilt * local.yz;

  float scaleOut = 1.0 - smoothstep(0.76, 0.88, uProgress);
  local *= visibility * scaleOut * mix(0.3, 1.0, travel * travel);

  vec3 normal = normalize(aNormal);
  vLight = dot(normal, normalize(vec3(-0.35, 0.68, 0.64)));
  vVariant = variant;
  gl_Position = uViewProjection * vec4(centre + local, 1.0);
}
`;

export const kernelFragmentShader = `#version 300 es
precision highp float;

in float vLight;
in float vVariant;
out vec4 outColor;

void main() {
  float diffuse = 0.66 + clamp(vLight * 0.5 + 0.25, 0.0, 1.0) * 0.34;
  float variation = 0.965 + mod(vVariant, 4.0) * 0.012;
  vec3 chicco = vec3(0.698, 0.227, 0.086);
  outColor = vec4(chicco * diffuse * variation, 1.0);
}
`;

export const fieldVertexShader = `#version 300 es
precision highp float;

layout(location = 0) in vec3 aPosition;
layout(location = 1) in float aRole;

uniform mat4 uViewProjection;
uniform float uProgress;
uniform float uWind;

out float vRole;

float easeInOut(float value) {
  value = clamp(value, 0.0, 1.0);
  return value * value * (3.0 - 2.0 * value);
}

void main() {
  vec3 position = aPosition;
  float field = easeInOut((uProgress - 0.60) / 0.16);
  float plant = easeInOut((uProgress - 0.44) / 0.12);
  float flatten = easeInOut((uProgress - 0.76) / 0.16);

  if (aRole > 2.5 && aRole < 3.5) {
    position.x += sin(position.y * 1.7 + position.z * 0.43 + uWind) * 0.055 * field;
    position.y = -6.9 + (position.y + 6.9) * field;
    if (uProgress < 0.60) position.y = -100.0;
  } else if (aRole < 1.5) {
    vec3 attachment = vec3(-0.2, -0.72, 0.0);
    position = attachment + (position - attachment) * plant;
  }

  if (aRole > 1.5 && aRole < 2.5) {
    float huskReveal = smoothstep(0.44, 0.53, uProgress);
    position.x = mix(-0.78, position.x, huskReveal);
    position.y = mix(-1.92, position.y, huskReveal);
  }

  if (aRole > 3.5) {
    float rachisReveal = smoothstep(0.30, 0.34, uProgress);
    if (uProgress < 0.30) {
      position.y = -100.0;
    } else {
      vec3 cobCentre = vec3(-0.78, 0.32, -0.24);
      position = cobCentre + (position - cobCentre) * rachisReveal;
      float rachisTilt = 0.24 * smoothstep(0.32, 0.36, uProgress) * (1.0 - smoothstep(0.44, 0.52, uProgress));
      mat2 tiltMatrix = mat2(
        cos(rachisTilt), -sin(rachisTilt),
        sin(rachisTilt), cos(rachisTilt)
      );
      vec3 relativeRachis = position - cobCentre;
      relativeRachis.yz = tiltMatrix * relativeRachis.yz;
      position = cobCentre + relativeRachis;
    }
  }

  position.y -= flatten * (30.0 + max(0.0, -position.z) * 0.24);
  vRole = aRole;
  gl_Position = uViewProjection * vec4(position, 1.0);
}
`;

export const fieldFragmentShader = `#version 300 es
precision highp float;

in float vRole;
out vec4 outColor;

void main() {
  vec3 darkStone = vec3(0.384, 0.365, 0.302);
  vec3 stone = vec3(0.549, 0.529, 0.475);
  vec3 colour = (vRole < 0.5 || vRole > 3.5) ? darkStone : stone;
  outColor = vec4(colour, 1.0);
}
`;

export const incisionVertexShader = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aCorner;
layout(location = 1) in float aLine;
layout(location = 2) in float aBand;

uniform float uProgress;
uniform float uAspect;

flat out float vBand;
out float vRelief;

void main() {
  float fieldReveal = smoothstep(0.60, 0.76, uProgress);
  float flatten = smoothstep(0.76, 0.92, uProgress);
  float lineT = aLine / 7.0;
  vec2 vanishingPoint = vec2(-0.05, -0.12);
  vec2 nearPoint = vec2(mix(-0.82, 0.72, lineT), -0.92);
  float along = (aCorner.x + 1.0) * 0.5 * fieldReveal;
  vec2 perspectivePosition = mix(vanishingPoint, nearPoint, along);
  float irregularLength = 0.70 + mod(aLine * 0.037, 0.055);
  float pressure = sin(aCorner.x * 8.0 + aLine * 1.91) * 0.0018;
  vec2 registerPosition = vec2(
    aCorner.x * irregularLength - 0.05 + sin(aLine * 2.3) * 0.008,
    mix(-0.68, 0.68, lineT) + pressure
  );
  float edgeTaper = smoothstep(0.0, 0.16, 1.0 - abs(aCorner.x));
  float pressureWidth = 0.74 + 0.26 * (0.5 + 0.5 * sin(aCorner.x * 11.0 + aLine * 1.37));
  float thickness = 0.00105 * max(1.0, uAspect) * fieldReveal * edgeTaper * pressureWidth;
  vec2 position = mix(perspectivePosition, registerPosition, flatten);
  float reliefOffset = aBand < -1.5 ? -0.0039 : aBand * 0.00245;
  position.y += aCorner.y * thickness + reliefOffset * flatten;
  vBand = aBand;
  vRelief = flatten;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const incisionFragmentShader = `#version 300 es
precision highp float;
flat in float vBand;
in float vRelief;
out vec4 outColor;
void main() {
  vec3 softShadow = vec3(0.73, 0.70, 0.64);
  vec3 shadow = vec3(0.46, 0.44, 0.38);
  vec3 groove = vec3(0.549, 0.529, 0.475);
  vec3 paperLight = vec3(0.94, 0.916, 0.874);
  vec3 colour = vBand < -1.5 ? softShadow : (vBand < -0.5 ? shadow : (vBand > 0.5 ? paperLight : groove));
  outColor = vec4(mix(groove, colour, vRelief), 1.0);
}
`;
