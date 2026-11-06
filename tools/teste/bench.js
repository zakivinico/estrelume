// Medidor de desempenho reproduzível: mesmas posições, mesma resolução e qualidade fixa.
// Mede o custo de desenho de cada quadro (o mesmo quadro várias vezes, esperando a GPU terminar com readPixels) e o tempo de JS do quadro,
// mais draw calls e triângulos (cena + sombra) por área. Use para comparar antes/depois de uma otimização.
// Uso: node tools/teste/bench.js "http://localhost:8765/?noauto=1" [alta|media|baixa] [rótulo]
const { chromium } = require('playwright');
(async () => {
  const q = process.argv[3] || 'alta', tag = process.argv[4] || 'bench';
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
  // cronometra cada callback do rAF e força a GPU a terminar (gl.finish) para o tempo incluir o desenho
  await p.addInitScript(() => {
    const raf = window.requestAnimationFrame.bind(window); window.__ft = []; window.__fton = false;
    window.requestAnimationFrame = (cb) => raf((t) => { if (!window.__fton) return cb(t); const t0 = performance.now(); cb(t); try { const g = window.__g; if (g && g.renderer) g.renderer.getContext().finish(); } catch (e) {} window.__ft.push(performance.now() - t0); });
  });
  await p.goto(process.argv[2], { timeout: 180000 }); await p.waitForSelector('#loading.off', { state: 'attached', timeout: 400000 });
  await p.evaluate((q) => { const g = window.__g; g.SET.pixel = 'off'; g.SET.quality = q; g.SET.autoq = false; g.S.tstep = 999; g.S.lv = 8; g.startFrom(null); g.applyQuality(); }, q);
  await p.waitForTimeout(3000);
  const clean = () => p.evaluate(() => { const g = window.__g; try { g.closeModal(); } catch (e) {} for (let i = 0; i < 12 && g.dlg; i++) try { g.advDlg(); } catch (e) { break; } if (g.CUT) try { document.getElementById('cutskip').click(); } catch (e) {} });
  const measure = () => p.evaluate(async () => { const g = window.__g, r = g.renderer, raf = () => new Promise((res) => requestAnimationFrame(res));
    for (let i = 0; i < 4; i++) await raf();
    r.info.autoReset = false; r.info.reset(); await raf(); const calls = r.info.render.calls, tris = r.info.render.triangles; r.info.autoReset = true;
    window.__ft = []; window.__fton = true; for (let i = 0; i < 16; i++) await raf(); window.__fton = false;
    const ts = window.__ft.slice(2).sort((a, b) => a - b);
    // custo de desenho isolado: o mesmo quadro 7 vezes seguidas, cada uma esperando a GPU terminar (readPixels bloqueia)
    const gl = r.getContext(), px = new Uint8Array(4), gp = [];
    for (let i = 0; i < 7; i++) { const t0 = performance.now(); if (g.SET.quality === 'baixa') r.render(g.scene, g.camera); else g.composerX.render(0.016); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); gp.push(performance.now() - t0); }
    const gs = gp.slice(1).sort((a, b) => a - b);
    return { calls, tris, js: +ts[Math.floor(ts.length / 2)].toFixed(1), gpu: Math.round(gs[2]), pr: +r.getPixelRatio().toFixed(2) }; });
  const areas = [
    ['praca', 'g.P.x=41; g.P.z=37;', 10], ['vila', 'g.P.x=92; g.P.z=32;', 11], ['fazenda', 'g.P.x=30; g.P.z=44;', 9], ['praia', 'g.P.x=55; g.P.z=g.BEACHY+2;', 12],
    ['campos', 'g.P.x=60; g.P.z=75;', 15], ['bosque', 'g.P.x=141; g.P.z=32;', 17], ['noite', 'g.P.x=41; g.P.z=37;', 22], ['casa', 'g.enterHouse();', 20], ['caverna', 'g.exitHouse(); setTimeout(() => g.enterCave(), 900);', 12],
  ];
  const out = {}; let sum = 0;
  for (const [n, js, h] of areas) {
    await p.evaluate(({ js, h }) => { const g = window.__g; g.S.time = ((h - 6) / 18) * g.DAYLEN; new Function('g', js)(g); }, { js, h }); await p.waitForTimeout(n === 'caverna' ? 4200 : 2600); await clean(); await p.waitForTimeout(500);
    const m = await measure(); out[n] = m; sum += m.gpu; console.log(tag, q, n.padEnd(8), JSON.stringify(m));
  }
  console.log(`TOTAL ${tag} ${q} desenho_soma_ms=${Math.round(sum)} media_ms=${Math.round(sum / areas.length)}`);
  if (errs.length) console.log('ERRORS\n' + errs.slice(0, 10).join('\n'));
  await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
