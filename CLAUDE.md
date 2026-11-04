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

## Desempenho: regras que evitam travamentos

- **Nunca mude o número de luzes visíveis.** As `PointLight` do jogo são "fontes": o pool (`LP`, seção v17) copia as mais próximas para 4 luzes reais fixas; toda troca de área (via `fade`) adota as luzes novas na hora. Pode criar luzes à vontade (o `lpScan` acha sozinho), mas não adicione luzes reais fora do pool.
- **Não troque o tipo da névoa nem use `scene.fog = null`.** Interiores usam `NOFOG` (mesmo tipo `Fog`, só que longe). Trocar o tipo recompila todos os shaders.
- Todos os shaders são pré-compilados no carregamento (`precompileAll`). Material novo que só aparece num evento raro também fica coberto, desde que esteja na cena (mesmo invisível) ao carregar.
- Vegetação e objetos repetidos vão por `Instancer` (blocos de 16×16 tiles, recortados por distância além da névoa). Itens miúdos não projetam sombra (`NO_SHADOW`).
- Meça com `node tools/teste/tour.js` (draw calls, triângulos, luzes e shaders por área). Referência da v17 na praça: cerca de 1.200 draw calls e 2,4 milhões de triângulos.

## Mundo e conteúdo

- `openPockets()` abre bolsões de chão fechados por árvores ou pedras antes de montar o mundo. Ao colocar objetos sólidos novos, use `dressProps` (só põe em "ilhas" de chão livre e nunca fecha passagem).
- O chão é uma textura pintada (`paintGround`, 8 px por tile). Para mudar um tile em jogo, chame `setTileColor(x, y)`: ele repinta a vizinhança.
- O rosto é pintado numa cópia da malha da cabeça (`faceOverlay`). Opções novas de rosto: adicione em `FACES` e desenhe em `faceTex`.

## Modelos

- Modelos ficam em `game/assets/m/<nome>.js` como GLB em base64. Prefixos: `ch_` bases de corpo KayKit, `p_` moradores e bichinhos, `hr_` cabelos, `k_`/`q_`/`pk_`/`f_`... cenários e móveis.
- Para adicionar um: converta para GLB (`npx gltf-transform copy entrada.gltf saida.glb`), otimize com `tools/opt.mjs`, empacote com `npm run glb2js -- arquivo.glb` e registre o nome em `MODEL_LIST` com o tamanho em `FIT` (veja `V17M`).
- Novos prefixos da v17: `kn_` (Kenney), `qv_`/`qn_`/`qi_` (Quaternius: vila, natureza, interior), `kk_` (KayKit Mixed Bag); móveis KayKit continuam com `f_`. Todos são CC0; as licenças estão em `game/assets/LICENSE-*`.

## Multiplayer

- Usa a capacidade `room` do claude.ai: só funciona com o jogo aberto como artifact. `onPeers` entrega `{peers, joined, left, updated}`; cada peer tem `peer`, `isMe`, `kind` e `presence`. Nomes de sala só aceitam minúsculas, números, `.`, `_` e `-`.
- A presença (10×/s) leva posição, modo, visual completo (`lk`) e o estado da arena. Teste com `node tools/teste/mp.js`, que usa uma sala simulada.
- As amigas precisam ter acesso ao artifact (Compartilhar). Convidadas de fora da organização entram como `guest`.

## Publicação

- `main` → GitHub Pages (workflow `pages.yml`).
- Existe também uma versão publicada como Artifact no claude.ai ("Estrelume"), onde o jogo foi desenvolvido antes de vir para este repositório.

## Som

- Efeitos: `sfx(nome, x?, z?)` (com posição = pan e distância). Sons novos: arquivo em `game/assets/sfx/<nome>.ogg` e o nome em `EXTRA_SFX`. Variações aleatórias de um mesmo evento ficam em `ALT2`; volumes em `SFXV`.
- Ambiência: camadas `amb_*` com volume-alvo em `ambTargets()`. Passos por terreno: `STEP_SETS` + `stepSet()`.
- Converta com ffmpeg para OGG mono normalizado (veja o commit da v17). Só use sons CC0 e registre o crédito em `game/assets/CREDITS-v17-sons.md`.
