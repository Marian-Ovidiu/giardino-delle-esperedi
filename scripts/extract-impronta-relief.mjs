#!/usr/bin/env node

/**
 * Extract the approved Impronta Otto relief from its photographed paper field.
 *
 * This is a deterministic high-pass operation, not a generative edit: a broad
 * Gaussian blur estimates the uneven paper illumination, then only local
 * engraved shadows/highlights survive as transparent pixels. The approved
 * geometry and line contrast are preserved; the rectangular substrate is not.
 */
import sharp from "sharp";

const input = "public/images/generated/impronta-otto.avif";
const output = "public/images/generated/impronta-otto-relief.avif";

const source = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const background = await sharp(input).removeAlpha().blur(24).raw().toBuffer();
const { width, height, channels } = source.info;
const pixels = Buffer.alloc(width * height * 4);

for (let index = 0; index < width * height; index += 1) {
  const sourceOffset = index * channels;
  const outputOffset = index * 4;

  const sourceLuma =
    source.data[sourceOffset] * 0.2126 +
    source.data[sourceOffset + 1] * 0.7152 +
    source.data[sourceOffset + 2] * 0.0722;
  const backgroundLuma =
    background[sourceOffset] * 0.2126 +
    background[sourceOffset + 1] * 0.7152 +
    background[sourceOffset + 2] * 0.0722;
  const delta = sourceLuma - backgroundLuma;

  if (delta < -2.5) {
    pixels[outputOffset] = 98;
    pixels[outputOffset + 1] = 93;
    pixels[outputOffset + 2] = 77;
    pixels[outputOffset + 3] = Math.min(104, Math.round((-delta - 2.5) * 4));
  } else if (delta > 3) {
    pixels[outputOffset] = 255;
    pixels[outputOffset + 1] = 255;
    pixels[outputOffset + 2] = 255;
    pixels[outputOffset + 3] = Math.min(64, Math.round((delta - 3) * 2.5));
  }
}

await sharp(pixels, { raw: { width, height, channels: 4 } })
  .avif({ quality: 42, effort: 8, chromaSubsampling: "4:4:4" })
  .toFile(output);

console.log(`✓ ${output} · ${width}×${height} · transparent relief extracted`);
