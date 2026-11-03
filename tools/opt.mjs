// Otimiza os modelos do Estrelume: remove animações não usadas, comprime malhas (meshopt) e texturas (webp)
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, resample, weld, meshopt, textureCompress, reorder, quantize } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const [src, dst] = process.argv.slice(2);
await MeshoptEncoder.ready; await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const KEEP_H = new Set(['Idle_A', 'Walking_A', 'Running_A', 'Cheering', 'Interact', 'PickUp', 'Use_Item', 'Hit_A', 'Death_A', 'Dodge_Forward', 'Melee_1H_Attack_Chop', 'Melee_1H_Attack_Slice_Horizontal', 'Melee_Block', 'Ranged_Magic_Raise', 'Ranged_Magic_Shoot', 'Ranged_Magic_Spellcasting', 'Sit_Floor_Idle', 'Lie_Idle', 'Jump_Full_Short', 'Waving', 'Throw']);
const files = fs.readdirSync(src).filter((f) => f.endsWith('.glb'));
let tin = 0, tout = 0;
for (const f of files) {
  const k = f.replace('.glb', ''), inP = path.join(src, f), outP = path.join(dst, f);
  try {
    const doc = await io.read(inP);
    const human = /^p_(estela|morgana|selva|lirio|mariana|tati|clara|leo|tomas)$/.test(k);
    if (human) for (const a of doc.getRoot().listAnimations()) if (!KEEP_H.has(a.getName())) a.dispose();
    const size = /^ch_/.test(k) ? 1024 : 512;
    await doc.transform(dedup(), prune(), resample(), weld(), textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [size, size], quality: 88 }), reorder({ encoder: MeshoptEncoder }), quantize(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
    await io.write(outP, doc);
    const a = fs.statSync(inP).size, b = fs.statSync(outP).size; tin += a; tout += b;
  } catch (e) { console.log('FAIL', k, e.message); fs.copyFileSync(inP, outP); }
}
console.log('total', (tin / 1e6).toFixed(2), 'MB ->', (tout / 1e6).toFixed(2), 'MB');
