const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 800, height: 500 } });
  const errs = []; p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push('error ' + m.text()); });
  await p.goto(process.argv[2]); await p.waitForSelector('#loading.off', { state: 'attached', timeout: 240000 }); await p.waitForTimeout(1000);
  await p.evaluate(() => window.__g.startFrom(null)); await p.waitForTimeout(3000);
  const r = await p.evaluate(() => {
    const g = window.__g, { W, H, solidAt, P } = g;
    const seen = new Int32Array(W * H).fill(-1); const comps = [];
    for (let s = 0; s < W * H; s++) { if (seen[s] >= 0) continue; const x0 = s % W, y0 = (s / W) | 0; if (solidAt(x0, y0)) continue; const id = comps.length, q = [s]; seen[s] = id; let n = 0, sx = 0, sy = 0;
      while (q.length) { const c = q.pop(); n++; const cx = c % W, cy = (c / W) | 0; sx += cx; sy += cy; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue; const k = ny * W + nx; if (seen[k] >= 0 || solidAt(nx, ny)) continue; seen[k] = id; q.push(k); } }
      comps.push({ id, n, cx: Math.round(sx / n), cy: Math.round(sy / n) }); }
    const main = seen[Math.floor(P.z) * W + Math.floor(P.x)];
    const near = (x, y) => { x = Math.floor(x); y = Math.floor(y); for (let r = 0; r <= 2; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const k = (y + dy) * W + (x + dx); if (seen[k] === main) return true; } return false; };
    const tg = [];
    for (const [k, v] of Object.entries(g.LM)) tg.push(['LM.' + k, v.x + (v.w ? v.w / 2 : 0), v.y + (v.h ? v.h : 0)]);
    for (const t of g.TOTEMS) tg.push(['TOTEM.' + t.id, t.x + 0.5, t.y + 1.5]);
    try { for (const d of g.doorList()) tg.push(['DOOR.' + (d.n || d.id), d.ex, d.ez]); } catch (e) { tg.push(['doorList ERR ' + e.message, 0, 0]); }
    for (const n of g.npcs) { try { const h = n.d.home(); tg.push(['NPC.' + n.d.id, h.x, h.z]); } catch (e) {} }
    try { const d = g.seaDockSpot(); tg.push(['DOCK', d.lx, d.lz - 1]); } catch (e) {}
    const odd = tg.filter(([, x, y]) => !Number.isFinite(x) || !Number.isFinite(y)).map((t) => t[0]); const bad = tg.filter(([, x, y]) => Number.isFinite(x) && Number.isFinite(y) && !near(x, y)).map(([n, x, y]) => `${n} @${x.toFixed(1)},${y.toFixed(1)} comp=${seen[Math.floor(y) * W + Math.floor(x)]}`);
    const pockets = comps.filter((c) => c.id !== main && c.n >= 6).sort((a, b) => b.n - a.n).slice(0, 25);
    return { odd, lmKeys: Object.fromEntries(Object.entries(g.LM).map(([k, v]) => [k, Object.keys(v).join('/')])), door0: (() => { try { return Object.keys(g.doorList()[0] || {}); } catch (e) { return e.message; } })(), main, mainSize: comps[main].n, targets: tg.length, bad, pockets, nComps: comps.length, spawn: [P.x, P.z] };
  });
  console.log(JSON.stringify({ ...r, pockets: r.pockets.map((c) => `${c.n}@${c.cx},${c.cy}`).join(" ") }));
  console.log('ERRORS\n' + errs.join('\n'));
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
