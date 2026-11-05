// Prepara a base de personagem "Kenney Mini Characters" (CC0) para o jogo:
// km_fa..km_ff (meninas) e km_ma..km_mf (meninos). Só o km_fa guarda as animações (o esqueleto é igual em todos).
// Uso: node tools/kenney_chars.mjs <pasta mini-characters> <saida>   e depois: node tools/glb2js.mjs <saida>
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, resample, weld, meshopt, textureCompress, reorder, quantize } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const [src, dst] = process.argv.slice(2); fs.mkdirSync(dst, { recursive: true });
await MeshoptEncoder.ready; await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const KEEP = new Set(['static', 'idle', 'walk', 'sprint', 'jump', 'fall', 'crouch', 'sit', 'die', 'pick-up', 'emote-yes', 'emote-no', 'holding-right', 'holding-both', 'holding-right-shoot', 'attack-melee-right', 'attack-kick-right', 'interact-right']);
for (const g of ['female', 'male']) for (const v of 'abcdef') {
  const inP = path.join(src, `character-${g}-${v}.glb`), k = `km_${g[0]}${v}`, outP = path.join(dst, k + '.glb');
  const doc = await io.read(inP);
  for (const a of doc.getRoot().listAnimations()) if (k !== 'km_fa' || !KEEP.has(a.getName())) a.dispose();
  await doc.transform(dedup(), prune(), resample(), weld(), textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [128, 128], quality: 95 }), reorder({ encoder: MeshoptEncoder }), quantize(), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
  await io.write(outP, doc); console.log(k, (fs.statSync(inP).size / 1024).toFixed(0), '->', (fs.statSync(outP).size / 1024).toFixed(0), 'KB');
}
