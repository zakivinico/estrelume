// Converte os cabelos FBX da Quaternius (CC0) para GLB, centralizando e normalizando a escala
import * as THREE from '/home/claude/v3d/node_modules/three/build/three.module.js';
import { FBXLoader } from '/home/claude/v3d/node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { GLTFExporter } from '/home/claude/v3d/node_modules/three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs'; import path from 'path';
globalThis.FileReader = class { readAsArrayBuffer(b) { b.arrayBuffer().then((a) => { this.result = a; this.onloadend && this.onloadend(); }); } readAsDataURL(b) { b.arrayBuffer().then((a) => { this.result = 'data:application/octet-stream;base64,' + Buffer.from(a).toString('base64'); this.onloadend && this.onloadend(); }); } };
globalThis.self = globalThis; globalThis.window = globalThis; globalThis.document = { createElementNS: () => ({ style: {} }) };
const [outDir, ...files] = process.argv.slice(2);
for (const f of files) {
  const buf = fs.readFileSync(f); const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const obj = new FBXLoader().parse(ab, '');
  const g = new THREE.Group(); obj.updateMatrixWorld(true);
  obj.traverse((m) => { if (!m.isMesh) return; const geo = m.geometry.clone(); geo.applyMatrix4(m.matrixWorld); for (const k of Object.keys(geo.attributes)) if (!['position', 'normal'].includes(k)) geo.deleteAttribute(k); geo.clearGroups(); const mm = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#7a4a30', roughness: 1 })); mm.name = 'Hair'; g.add(mm); });
  const bb = new THREE.Box3().setFromObject(g), c = bb.getCenter(new THREE.Vector3()), sz = bb.getSize(new THREE.Vector3()); const s = 1 / sz.x;
  for (const m of g.children) { m.geometry.translate(-c.x, -bb.max.y, -c.z); m.geometry.scale(s, s, s); m.geometry.computeVertexNormals(); }
  const glb = await new GLTFExporter().parseAsync(g, { binary: true });
  const out = path.join(outDir, 'hr_' + path.basename(f, '.fbx').toLowerCase().replace('_hairstyle_', '') + '.glb'); fs.writeFileSync(out, Buffer.from(glb)); console.log(out, (glb.byteLength / 1024).toFixed(1) + 'KB', sz.toArray().map((v) => v.toFixed(2)).join('x'));
}
