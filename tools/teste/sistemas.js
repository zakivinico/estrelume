// Passeio automático pelos sistemas: casa, lojas, caverna, pesca, barco, fazenda, arena, parkour, poço, salvar/carregar,
// novo dia, morte, qualidade, título e controle. Mostra o estado depois de cada passo e os erros que apareceram.
// Uso: node tools/teste/sistemas.js "http://localhost:8765/?noauto=1"   (SHOT=1 salva uma foto por passo; OUT=pasta)
const { chromium } = require('playwright');
const SHOT = process.env.SHOT === '1';
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1000, height: 600 } }); const errs = [];
  // controle simulado: window.__padOn liga, window.__pad.buttons[i].pressed / axes mexem
  await p.addInitScript(() => { window.__pad = { id: 'teste', connected: true, index: 0, axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })) }; navigator.getGamepads = () => (window.__padOn ? [window.__pad] : []); });
  p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message + ' @ ' + (e.stack || '').split('\n').slice(1, 3).join(' | ')));
  p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type().toUpperCase() + ' ' + m.text().slice(0, 300)); });
  await p.goto(process.argv[2], { timeout: 180000, waitUntil: 'commit' }); await p.waitForSelector('#loading.off', { state: 'attached', timeout: 400000 }); await p.waitForTimeout(1500);
  const chk = () => p.evaluate(() => { const g = window.__g, P = g.P; const stuck = Object.entries(g.keys).filter(([k, v]) => v).map(([k]) => k);
    return { mode: g.mode, x: +P.x.toFixed(2), z: +P.z.toFixed(2), fin: Number.isFinite(P.x) && Number.isFinite(P.z) && Number.isFinite(g.camera.position.x), vis: g.player.obj.visible, wv: g.world.visible, modal: document.getElementById('modal').classList.contains('on'), cut: !!g.CUT, dlg: !!g.dlg, fish: !!P.fishing, boat: !!P.boat, bike: !!P.bike, dead: !!P.dead, decor: !!g.decor, farm: !!g.farmEd, jy: P.jy || 0, hp: Math.round(P.hp), keys: stuck, calls: g.renderer.info.render.calls, title: g.titleOn }; });
  let n = 0;
  const step = async (name, js, wait = 2000) => { const e0 = errs.length; let r; try { r = await p.evaluate('(async () => { const g = window.__g, P = g.P, S = g.S; ' + js + ' })()'); } catch (e) { r = 'EVALERR ' + e.message.split('\n')[0]; }
    await p.waitForTimeout(wait); const s = await chk(); const ne = errs.slice(e0); console.log(`## ${String(++n).padStart(2)} ${name.padEnd(22)} ${r !== undefined ? 'ret=' + JSON.stringify(r).slice(0, 160) + ' ' : ''}${JSON.stringify(s)}${ne.length ? '\n   ERR ' + ne.join('\n   ERR ') : ''}`);
    if (SHOT) await p.screenshot({ path: `${process.env.OUT || '.'}/sis_${String(n).padStart(2, '0')}_${name.replace(/\W+/g, '_')}.png`, timeout: 300000 }).catch(() => {}); return s; };
  const key = async (k, ms = 80) => { await p.keyboard.down(k); await p.waitForTimeout(ms); await p.keyboard.up(k); };
  await step('novo jogo', "g.startFrom(null); g.closeModal(); return 1;", 2500);
  await step('pular intro', "if (g.CUT) document.getElementById('cutskip').click(); return !!g.CUT;", 2500);
  await step('dialogo rosa', "let i = 0; for (; i < 40 && g.dlg; i++) g.advDlg(); g.closeModal(); return i;", 1200);
  await step('dinheiro e nivel', "S.coins = 50000; S.stars = 5000; S.lv = 12; S.tstep = 99; g.grantTools(99, true); return Object.keys(S.tools||{}).length;", 500);
  // andar
  await p.keyboard.down('KeyW'); await p.waitForTimeout(1500); await p.keyboard.up('KeyW');
  await step('andou W 1.5s', 'return 1;', 300);
  await p.keyboard.down('KeyD'); await p.keyboard.down('ShiftLeft'); await p.waitForTimeout(1200); await p.keyboard.up('KeyD'); await p.keyboard.up('ShiftLeft');
  await step('correu D', 'return 1;', 300);
  await key('Space'); await step('pulo', 'return P.jy;', 1500);
  await key('KeyQ'); await step('esquiva', 'return 1;', 1200);
  await key('KeyZ'); await step('bike on', 'return P.bike;', 1200);
  await key('Space'); await step('pulo de bike', 'return P.jy;', 1200);
  await key('KeyZ'); await step('bike off', 'return P.bike;', 1200);
  // casa
  await step('entrar casa', 'g.enterHouse(); return 1;', 2500);
  await key('Space'); await step('pulo em casa', 'return P.jy;', 1200);
  await step('decorar', 'g.openDecor(); return !!g.decor;', 1500);
  await key('Escape'); await step('esc decorar', 'return !!g.decor;', 1200);
  await step('casa: piso', "g.homeCycle && g.homeCycle('floor'); return 1;", 800);
  await step('sair casa', 'g.exitHouse(); return 1;', 2500);
  // lojas
  const doors = await p.evaluate(() => window.__g.doorList().map((d, i) => [i, d.id, d.n || '']));
  console.log('portas', JSON.stringify(doors).slice(0, 600));
  await step('hora 10h', "S.time = (g.DAYLEN * (10 - 6)) / 18; return g.hourNow();", 300);
  for (const [i, id] of doors.slice(0, 4)) { await step('entrar ' + id, `g.enterRoom(g.doorList()[${i}]); return g.mode;`, 2500); await step('sair ' + id, 'g.exitShop(); return 1;', 2500); }
  await step('hora 22h', "S.time = (g.DAYLEN * (22 - 6)) / 18; return g.shopOpen();", 300);
  await step('loja fechada', "g.enterShop('tico'); return g.mode;", 2500);
  await step('sai se entrou', "if (g.mode === 'shop') g.exitShop(); return g.mode;", 2500);
  await step('hora 10h', "S.time = (g.DAYLEN * (10 - 6)) / 18; return 1;", 300);
  // caverna
  await step('caverna', 'g.enterCave(); return 1;', 3000);
  await step('minerar', 'let k = 0; for (let y = 0; y < 60 && k < 3; y++) for (let x = 0; x < 60 && k < 3; x++) { try { if (g.mineAt(x, y)) k++; } catch (e) { return "ERR " + e.message; } } return k;', 800);
  await key('Space'); await step('pulo caverna', 'return P.jy;', 1200);
  await step('sair caverna', 'g.exitCave(); return 1;', 3000);
  // pesca
  await step('pescar', "const d = g.seaDockSpot(); P.x = d.lx; P.z = d.lz; let wx = -1, wy = -1; for (let r = 1; r < 6 && wx < 0; r++) for (let dy = -r; dy <= r && wx < 0; dy++) for (let dx = -r; dx <= r; dx++) { const x = Math.floor(P.x) + dx, y = Math.floor(P.z) + dy; if (g.tAt(x, y) === 4) { wx = x; wy = y; break; } } if (wx < 0) return 'semagua'; g.startFishing(wx, wy); return [wx, wy];", 4000);
  await step('fisgar', "for (let i = 0; i < 3; i++) g.fishPress(); return P.fishing && P.fishing.phase;", 2500);
  await key('Escape'); await step('esc pesca', 'return !!P.fishing;', 1500);
  // barco
  await step('barco', "const d = g.seaDockSpot(); P.x = d.lx; P.z = d.lz; g.boardBoat(); return 1;", 3500);
  await key('Space'); await step('pulo no barco', 'return P.jy;', 1000);
  await step('kraken', "g.krakenStart(); return g.KR.on;", 2500);
  await step('tiro', "g.boatFire && g.boatFire(); return 1;", 1000);
  await step('desembarca', 'g.leaveBoat(); return 1;', 3500);
  // fazenda
  await step('fazenda', "g.openFarm(); return !!g.farmEd;", 1500);
  await key('Escape'); await step('esc fazenda', 'return !!g.farmEd;', 1000);
  // arena e parkour
  await step('rosa luta', "g.rosaStart(); return g.RB && g.RB.on;", 3000);
  await step('rosa ataque', "for (let i = 0; i < 3; i++) g.swordAttack && g.swordAttack(); return g.RB.on;", 2000);
  await step('pvp', "g.pvpEnter(); return g.PVP.on;", 2000);
  await step('pvp sai', "g.pvpLeave(); return g.PVP.on;", 1500);
  await step('parkour', "const pl = g.PK26.plats[0]; if (!pl) return 'sem'; P.x = pl.x; P.z = pl.z + 2; return [pl.x, pl.z];", 1500);
  await key('Space'); await step('pulo parkour', 'return P.jy;', 1500);
  // poço
  await step('desejo x10', "g.closeModal(); try { g.doWish(10); } catch (e) { return 'ERR ' + e.message; } return 1;", 4000);
  await step('passa desejo', "for (let i = 0; i < 40; i++) { if (!document.getElementById('wish').classList.contains('on')) break; g.wishAdvance(); } return document.getElementById('wish').classList.contains('on');", 2500);
  await step('fecha', "g.closeModal(); return 1;", 600);
  // salvar/carregar
  await step('salvar', "S.coins = 12345; return g.writeSlot('ve3d-1');", 500);
  await step('carregar', "S.coins = 1; const d = g.readSlot('ve3d-1'); g.startFrom(d); return S.coins;", 3000);
  // dia, morte
  await step('novo dia x2', "g.newDay(true); g.newDay(false); return S.day;", 2500);
  await step('morrer', "P.hp = 0; g.die(); return P.dead;", 3000);
  await step('renascer', "g.respawn(); return P.dead;", 3000);
  // ajustes
  for (const q of ['baixa', 'media', 'alta']) await step('qualidade ' + q, `g.SET.quality = '${q}'; g.applyQuality(); return g.renderer.getPixelRatio();`, 1500);
  await step('filtro pixel', "g.SET.pixel = 'forte'; g.applyQuality(); return g.renderer.getPixelRatio();", 1500);
  await step('filtro off', "g.SET.pixel = ''; g.applyQuality(); return g.renderer.getPixelRatio();", 1500);
  // título e continuar
  await step('ao titulo', "g.openPhone(); const el = document.querySelector('[data-app=\"title\"]'); if (!el) return 'sem'; el.click(); return g.titleOn;", 3000);
  await step('continuar', "const d = g.readSlot('ve3d-auto'); g.startFrom(d); return [g.titleOn, S.coins];", 3500);
  // controle: B fecha o menu e um controle parado não trava o teclado
  await step('controle liga', "window.__padOn = true; g.openPhone(); return 1;", 600);
  await step('B fecha menu', "window.__pad.buttons[1].pressed = true; await new Promise((r) => setTimeout(r, 300)); window.__pad.buttons[1].pressed = false; return !document.getElementById('modal').classList.contains('on');", 400);
  { const z0 = await p.evaluate(() => window.__g.P.z); await p.keyboard.down('KeyS'); await p.waitForTimeout(2000); await p.keyboard.up('KeyS'); await step('teclado c/ controle', `window.__padOn = false; return +(P.z - ${z0}).toFixed(2);`, 300); }
  await step('fim', 'return 1;', 1000);
  console.log('TOTAL ERRORS ' + errs.length); console.log(errs.join('\n')); await b.close();
})().catch((e) => { console.error('FAIL', e); process.exit(1); });
