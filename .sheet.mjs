import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";
const SRC="assets/masters/piastre";
const files=(await readdir(SRC)).filter(f=>f.endsWith(".png")).sort();
const W=640,H=400;
const tiles=await Promise.all(files.map(f=>sharp(path.join(SRC,f)).resize(W,H,{fit:"cover"}).toBuffer()));
const cols=2,rows=Math.ceil(tiles.length/cols);
await sharp({create:{width:W*cols,height:H*rows,channels:3,background:"#E9E3D6"}})
 .composite(tiles.map((input,i)=>({input,left:(i%cols)*W,top:Math.floor(i/cols)*H})))
 .png().toFile("/tmp/sheet.png");
console.log(files.join("  |  "));
