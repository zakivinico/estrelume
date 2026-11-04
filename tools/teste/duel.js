const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: 720, height: 450 } }); await ctx.addInitScript({ content: fs.readFileSync(require('path').join(__dirname, 'roomstub.js'), 'utf8') });
  const errs = []; const mk = async (tag) => { const p = await ctx.newPage(); p.on('pageerror', (e) => errs.push(tag + ' PAGEERROR ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(tag + ' ' + m.text()); }); await p.goto(process.argv[2], { timeout: 180000, waitUntil: 'commit' }); return p; };
  const A = await mk('A'), B = await mk('B'); for (const p of [A, B]) await p.waitForSelector('#loading.off', { state: 'attached', timeout: 400000 });
  await A.evaluate(() => { const g = window.__g; g.startFrom(null); g.S.name = 'Ana'; g.S.tstep = 999; g.S.pw = { espada: 1, machado: 1, arco: 2 }; g.S.pwSel = 'arco'; });
  await B.evaluate(() => { const g = window.__g; g.startFrom(null); g.S.name = 'Bia'; g.S.tstep = 999; });
  await A.waitForTimeout(3000);
  await A.evaluate(() => { window.__g.openMP(); document.getElementById('mpnew').click(); }); await A.waitForTimeout(2000);
  const code = await A.evaluate(() => window.__g.MP.code);
  await B.evaluate((c) => { window.__g.openMP(); document.getElementById('mpin').value = c; document.getElementById('mpgo').click(); }, code); await B.waitForTimeout(3000);
  for (const p of [A, B]) await p.evaluate(() => { try { window.__g.closeModal(); } catch (e) {} });
  await A.evaluate(() => { const g = window.__g; g.P.x = 44; g.P.z = 40; }); await B.evaluate(() => { const g = window.__g; g.P.x = 47; g.P.z = 40; }); await B.waitForTimeout(6000);
  const bPeer = await A.evaluate(() => Object.keys(window.__g.MP.peers)[0]); console.log('A me', await A.evaluate(() => window.__g.MP.me), 'B peer', bPeer);
  await A.evaluate((pid) => { window.__g.duelAsk(pid); document.getElementById('duGo').click(); }, bPeer); await B.waitForTimeout(7000);
  console.log('B invite card?', await B.evaluate(() => !!document.getElementById('duinv')));
  await B.evaluate(() => { const y = document.getElementById('duYes'); if (y) y.click(); }); await A.waitForTimeout(8000);
  const st = (p) => p.evaluate(() => { const g = window.__g, D = g.DUEL; return { on: D.on, host: D.host, cx: D.cx, cz: D.cz, loss: D.loss, oppLoss: D.oppLoss, hp: Math.round(g.P.hp), x: +g.P.x.toFixed(1), z: +g.P.z.toFixed(1) }; });
  console.log('A', JSON.stringify(await st(A))); console.log('B', JSON.stringify(await st(B)));
  await A.waitForTimeout(3000); // fim da contagem 3-2-1
  // Ana mira em Bia e atira
  await A.evaluate(() => { const g = window.__g; const D = g.DUEL; g.P.fx = 1; g.P.fz = 0; g.P.ang = Math.PI / 2; g.setSlot(g.TOOLS.findIndex((t) => t.id === 'espada')); g.weaponAttack(); });
  await B.waitForTimeout(6000); console.log('B after arrow', JSON.stringify(await st(B)));
  await B.screenshot({ path: 'duel_b.png', timeout: 300000 });
  // derruba Bia duas vezes
  for (let r = 0; r < 2; r++) { await B.evaluate(() => { const g = window.__g; g.P.hp = 1; g.DUEL.freeze = 0; }); await A.evaluate(() => { const g = window.__g; g.DUEL.freeze = 0; g.DUEL.cd = 0; g.P.fx = 1; g.P.fz = 0; g.weaponAttack(); }); await B.waitForTimeout(9000); console.log('round', r, 'A', JSON.stringify(await st(A)), 'B', JSON.stringify(await st(B))); }
  await A.waitForTimeout(6000); console.log('END A', JSON.stringify(await st(A)), 'B', JSON.stringify(await st(B)), 'A stars', await A.evaluate(() => window.__g.S.stars));
  console.log('ERRORS\n' + errs.slice(0, 20).join('\n')); await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
