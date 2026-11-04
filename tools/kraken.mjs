// Modela o Kraken fofo do Estrelume com three.js e exporta como GLB (GLTFExporter)
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
globalThis.FileReader = class { readAsArrayBuffer(b) { b.arrayBuffer().then((a) => { this.result = a; this.onloadend && this.onloadend(); }); } readAsDataURL(b) { b.arrayBuffer().then((a) => { this.result = 'data:application/octet-stream;base64,' + Buffer.from(a).toString('base64'); this.onloadend && this.onloadend(); }); } };
const M = (c, e = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, metalness: 0, emissive: e ? c : '#000000', emissiveIntensity: e });
const root = new THREE.Group(); root.name = 'Kraken';
const body = M('#a46be0'), belly = M('#f2c4ff'), spot = M('#7d4fc4'), white = M('#ffffff'), pupil = M('#2a1d40'), blush = M('#ff8fc8'), shine = M('#ffffff', 0.6), crown = M('#ffd45a', 0.25), pearl = M('#fff6fb', 0.5);
// cabeça em forma de gota (torno)
const prof = []; for (let i = 0; i <= 24; i++) { const t = i / 24, y = t * 4.4; const r = Math.sin(Math.min(1, t * 1.05) * Math.PI * 0.92 + 0.12) * 2.1 * (1 - t * 0.18) + 0.02; prof.push(new THREE.Vector2(Math.max(0.02, r), y)); }
const head = new THREE.Mesh(new THREE.LatheGeometry(prof, 40), body); head.name = 'Head'; root.add(head);
// manto com pintinhas
for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2 + (i % 2) * 0.2, y = 2.2 + (i % 3) * 0.7; const r = Math.sin(Math.min(1, (y / 4.4) * 1.05) * Math.PI * 0.92 + 0.12) * 2.1 * (1 - (y / 4.4) * 0.18); if (Math.cos(a) > 0.55 && y < 3.2) continue; const s = new THREE.Mesh(new THREE.SphereGeometry(0.22 + (i % 3) * 0.06, 12, 8), spot); s.position.set(Math.sin(a) * r * 0.98, y, Math.cos(a) * r * 0.98); s.scale.z = 0.4; s.lookAt(0, y, 0); root.add(s); }
// barriga clara
const bel = new THREE.Mesh(new THREE.SphereGeometry(1.5, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.6), belly); bel.rotation.x = Math.PI / 2; bel.position.set(0, 1.35, 1.18); bel.scale.set(1, 1, 0.5); root.add(bel);
// olhos grandes e brilhantes
for (const sx of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 18), white); e.name = 'Eye' + (sx < 0 ? 'L' : 'R'); e.position.set(sx * 0.85, 2.15, 1.72); e.scale.set(1, 1.12, 0.6); root.add(e);
  const p = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 14), pupil); p.position.set(sx * 0.85, 2.05, 2.02); p.scale.set(1, 1.15, 0.45); root.add(p);
  const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), shine); h1.position.set(sx * 0.85 + 0.14, 2.3, 2.18); root.add(h1); const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), shine); h2.position.set(sx * 0.85 - 0.12, 1.92, 2.18); root.add(h2);
  const c = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10), blush); c.position.set(sx * 1.45, 1.55, 1.5); c.scale.set(1, 0.6, 0.25); c.lookAt(sx * 4, 1.55, 6); root.add(c); }
// sorrisinho
const sm = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 8, 20, Math.PI), pupil); sm.rotation.z = Math.PI; sm.position.set(0, 1.45, 1.9); root.add(sm);
// coroinha com pérola
const cr = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.35, 10, 1, true), crown); cr.material.side = THREE.DoubleSide; cr.position.set(0.25, 4.45, -0.1); cr.rotation.z = -0.25; root.add(cr);
for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2, t = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 6), crown); t.position.set(0.25 + Math.cos(a) * 0.55 - 0.05, 4.72, -0.1 + Math.sin(a) * 0.55); t.rotation.z = -0.25; root.add(t); }
const pr = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 12), pearl); pr.name = 'Pearl'; pr.position.set(0.32, 4.9, -0.1); root.add(pr);
// saia (base dos tentáculos)
for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const f = new THREE.Mesh(new THREE.SphereGeometry(0.62, 16, 12), body); f.position.set(Math.sin(a) * 1.55, 0.25, Math.cos(a) * 1.55); f.scale.set(1, 0.55, 1); root.add(f); }
root.traverse((o) => { if (o.isMesh) o.castShadow = true; });
const ex = new GLTFExporter();
const glb = await ex.parseAsync(root, { binary: true });
fs.writeFileSync(process.argv[2], Buffer.from(glb)); console.log('ok', glb.byteLength);
