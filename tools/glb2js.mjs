// Empacota modelos .glb no formato que o jogo carrega: game/assets/m/<nome>.js
// (window.__GLB=window.__GLB||{})['<nome>']='<base64 do GLB>';
// Uso: node tools/glb2js.mjs pasta_ou_arquivo.glb [mais.glb ...]  (saída em game/assets/m/)
import fs from 'fs';
import path from 'path';
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'game', 'assets', 'm');
const files = process.argv.slice(2).flatMap((p) => (fs.statSync(p).isDirectory() ? fs.readdirSync(p).filter((f) => f.endsWith('.glb')).map((f) => path.join(p, f)) : [p]));
if (!files.length) { console.log('Uso: node tools/glb2js.mjs <arquivo.glb | pasta> ...'); process.exit(1); }
for (const f of files) {
  const k = path.basename(f, '.glb');
  const b64 = fs.readFileSync(f).toString('base64');
  fs.writeFileSync(path.join(OUT, k + '.js'), `(window.__GLB=window.__GLB||{})['${k}']='${b64}';`);
  console.log('ok', k, (b64.length / 1024).toFixed(1) + ' KB');
}
console.log('Lembre de adicionar o nome em MODEL_LIST (src/main.js) se for um modelo novo.');
