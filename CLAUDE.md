# Estrelume: guia para trabalhar no projeto

Jogo cozy 3D em three.js, todo em português do Brasil (textos, comentários, nomes de seções). Interface em pixel art com a fonte Pixelify Sans.

## Fluxo

1. Edite `src/main.js` (lógica) e/ou `template.html` (HTML/CSS).
2. `npm run build` gera `game/bundle.js` e `game/index.html`. **Sempre rode o build e faça commit do `game/` junto**, porque o GitHub Pages publica essa pasta sem build.
3. Teste com `npm run serve` (http://localhost:8000). Para inspecionar no console, `window.__g` expõe estado interno (SC, KR, SEA, PVP, ANCH, equipSlots...).
4. Num ambiente sem GPU, o Chromium headless funciona com `--use-angle=swiftshader --enable-unsafe-swiftshader`. É lento: clique por `element.click()` via `page.evaluate` e use timeouts longos em screenshots.

## Organização do código (`src/main.js`)

- Arquivo único, dividido em seções `/* =================== nome =================== */`. As primeiras são a base (utilidades, conteúdo, estado/saves, mapa, cena, modelos, mundo, personagens, VFX, áudio, ações, gacha, modais, HUD, entrada, atualização...). Depois vêm as camadas de cada versão (`v8:` ... `v16:`).
- **Uma versão nova entra como uma seção nova no fim**, logo antes de `/* início, título e carregamento */`.
- Para mudar o comportamento de uma função antiga sem reescrevê-la, o padrão do projeto é embrulhar:
  ```js
  { const base = makeAcc; makeAcc = function (k) { /* ... */ return base(k); }; }
  ```
  Funções antigas substituídas costumam ficar com sufixo (`openCreator_v13`, `faceTab_v13`, `applyLook_v10`) e a nova chama a anterior.
- Estado salvo: `S` (save do jogador), `SET` (configurações), `P` (posição e estado da personagem), `mode` (`'out'`, casa, caverna...).
- Visual da personagem: `S.look` / `crLook` com chaves como `sk` (pele), `hs`/`hc` (cabelo), `tint` (roupa), `acc` (cabeça), `gl`/`bk`/`wa` (rosto, costas, cintura), `acc_c`/`glc`/`bkc`/`wac` (cores) e `acc_p`/`glp`/`bkp`/`wap` (estampas).
- Itens de graça ficam em `WARD_FREE[categoria]`; o resto se compra no Ateliê da Fifi (`owns(cat, k)`).

## Modelos

- Modelos ficam em `game/assets/m/<nome>.js` como GLB em base64. Prefixos: `ch_` bases de corpo KayKit, `p_` moradores e bichinhos, `hr_` cabelos, `k_`/`q_`/`pk_`/`f_`... cenários e móveis.
- Para adicionar um: otimize com `tools/opt.mjs`, empacote com `npm run glb2js -- arquivo.glb` e coloque o nome em `MODEL_LIST`.

## Publicação

- `main` → GitHub Pages (workflow `pages.yml`).
- Existe também uma versão publicada como Artifact no claude.ai ("Estrelume"), onde o jogo foi desenvolvido antes de vir para este repositório.
