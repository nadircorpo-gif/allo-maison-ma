// Generates /public/logo.png (512x512 transparent) and /public/favicon.ico (16/32/48)
// Usage: node scripts/generate-brand-assets.mjs

import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LOCKUP = path.join(ROOT, 'public/brand/logo-lockup.svg');
const MARK = path.join(ROOT, 'public/brand/logo-mark.svg');
const OUT_PNG = path.join(ROOT, 'public/logo.png');
const OUT_ICO = path.join(ROOT, 'public/favicon.ico');

async function renderLogoPng() {
  const svg = await fs.readFile(LOCKUP);
  // Lockup viewBox is 440x100 (aspect 4.4:1). Fit into 512x512 canvas, transparent bg.
  // Width 512, height scaled proportionally -> 512 * (100/440) ≈ 116.36
  const targetWidth = 512;
  const scaledHeight = Math.round(targetWidth * (100 / 440)); // 116

  // Render SVG to PNG at scaled width
  const rendered = await sharp(svg, { density: 384 })
    .resize({ width: targetWidth, height: scaledHeight, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  // Place onto 512x512 transparent canvas, vertically centered
  const canvas = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: rendered, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await fs.writeFile(OUT_PNG, canvas);
  const stat = await fs.stat(OUT_PNG);
  console.log(`Wrote ${OUT_PNG} (${stat.size} bytes)`);
}

async function renderIcoPng(size) {
  const svg = await fs.readFile(MARK);
  // Mark viewBox is 320x400. Shield is taller than square. To produce square ICO,
  // render shield contained into size x size canvas, centered, transparent padding.
  const buf = await sharp(svg, { density: 384 })
    .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  return buf;
}

// Build ICO container. Format:
// ICONDIR (6 bytes): reserved(2)=0, type(2)=1, count(2)=N
// ICONDIRENTRY (16 bytes each): width(1), height(1), colors(1)=0, reserved(1)=0,
//   planes(2)=1, bitCount(2)=32, bytesInRes(4), imageOffset(4)
// Then PNG payloads concatenated.
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = 1 (ICO)
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = dirSize;
  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit depth
    entry.writeUInt32LE(buffer.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buffer)]);
}

async function renderFaviconIco() {
  const sizes = [16, 32, 48];
  const pngs = [];
  for (const size of sizes) {
    const buffer = await renderIcoPng(size);
    pngs.push({ size, buffer });
  }
  const ico = buildIco(pngs);
  await fs.writeFile(OUT_ICO, ico);
  const stat = await fs.stat(OUT_ICO);
  console.log(`Wrote ${OUT_ICO} (${stat.size} bytes)`);
}

await renderLogoPng();
await renderFaviconIco();
