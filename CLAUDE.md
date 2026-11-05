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
- **Não ligue/desligue `renderer.shadowMap.enabled` durante o jogo** (recompila tudo). A v19 mantém as sombras ligadas em Baixa (`QSH.cheap`: mapa 512, atualização espaçada); só o carregamento decide se começam desligadas.
- Coisas criadas só em eventos (chuva, malhas instanciadas ainda vazias) entram no `precompileAll` da v19. Ao criar algo novo assim, aqueça ali. `tools/teste/eventos.js` mede shaders novos por evento.
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

## Economia, craft, casa e PvP (v18)

- Duas moedas: `S.coins` (🪙 Moedas, comércio) e `S.stars` (⭐ Desejos, só o Poço). Preço de loja, Ateliê, Forja, sementes, reforma e armas: sempre `S.coins`. Ganhos de "sorte" (estrelas caídas, tarefas do dia, presentes, chefes): `S.stars`. Na interface, use 🪙 para Moedas e ⭐ para Desejos (o `EMO` troca pelos ícones).
- Receitas da bancada em `RECIPES` (`give: { fd | f | snack | item, q }`, `need`, `lv`). Itens só de craft levam `hidden: 1` no `FD`/`FURN`.
- Reforma da casa em `HOME_LV` (`size`, `coins`, `need`, `perk`). `IW`/`IH` são variáveis: `applyHomeLv()` reconstrói o cômodo.
- Árvores e pedras: `S.cut[tile] = dia do corte` (estágios em `TREE_GROW`) e `S.rocks[tile] = dia`.
- PvP: armas em `PVPW` (níveis em `S.pw`, escolhida em `S.pwSel`). Duelos pela presença: `dq` (pedido), `da` (resposta), `du` (estado: id, derrotas, centro). Teste com `tools/teste/` e uma sala simulada.
- Sobreposição: `fixOverlaps()` roda ao montar o mundo e de novo depois de carregar o save. Enfeites colocados por código devem levar `userData.dress = 1` (removíveis); os que não podem sair levam `userData.keep = 1`.

## Visual do mundo e moradores (v20)

- Moradores: visual em `NPCLOOK[id]` (mesmas chaves do `S.look`), aplicado por `dressNpc(obj, id, base)` aos moradores, à Rosa, ao Tico, aos lojistas (`SHOP_WHO`) e a quem está em casa. Os retratos saem de `npcThumb`. Morador novo: adicione o visual em `NPCLOOK`.
- Cabelo: penteados completos (`HAIR_FULL`) afundam os vértices do cabelo original da cabeça (`baseHair`). Os cabelos `hr_*` se encaixam pela touca, e `HAIR_FIT` só faz o ajuste fino.
- Placas: `makeSign` cria a placa com poste e tábua que balança (`FUNSIGNS`, `funSignsUpdate`). Dentro de casas e lojas, `wallSign` tira o poste. `fixSigns()` tira as placas de dentro das construções e da frente das portas. Placa que não pode sair do lugar leva `userData.keep = 1`. As peças fixas de placas e caixas de correio são juntadas por `bakeVC(grupo)` (uma malha com cor nos vértices); use o mesmo para adereços feitos de várias caixinhas.
- Chão: `paintGroundRect`/`paintGround` (`GPX2`, 12 px por tile; 8 no celular). Desde a v21 a pintura é suave: bordas misturadas e detalhes de ruído interpolado numa grade de 4 texels. Não use carimbos de 1 texel, porque viram quadradinhos ampliados. Nada de natureza (`NATURE`) em tile de caminho, e o `decor14` não põe adereços em caminho.

## Base fofinha, Poço e barco (v21)

- Base nova `km`: modelos `km_fa..km_ff` / `km_ma..km_mf` (Kenney Mini Characters, preparados por `tools/kenney_chars.mjs`; só o `km_fa` guarda as animações). `MODELS.ch_km` aponta para o `km_fa`, então `new Char('km')` e `cloneM('ch_km')` funcionam. Animações do KayKit viram as do Kenney por `KM_ALIAS` (`kmClips()`); ao montar algo da base nova num mixer próprio, troque `CLIPS` por `kmClips()`, como fazem `scMount` e `thumb`.
- Visual da base nova no `S.look`: `kb` (roupa) e `kh` (cabeça/penteado), variantes de `KM_VAR`; `sk`, `hc`, `ct`/`cb`/`cs` (blusa, calça, sapato, de `KCOL`), `ey`/`ec`/`br`/`mo`/`fc` (rosto). `kmLook` recolore por vértice (`kmPart` classifica pele, cabelo, blusa, calça e sapato; `kmGeo` guarda em cache) e pinta o rosto numa placa no osso da cabeça (`kmFace`/`kmFaceTex`). Opções novas de rosto: em `KM_EYES`/`KM_MOUTH`... e desenhe em `kmFaceTex`.
- O osso `torso` do Kenney foi renomeado para `spine` e as malhas para `km_Body`/`km_Head`, para os acessórios (`accAnchors`, `attachHead`) acharem tudo. A mão é o `handslot.r` no fim do `arm-right`, e as ferramentas ficam 60% maiores na base nova.
- Moradores na base nova: `NPCKM[id]` (vira `NPCLOOK[id]`). Peças pagas: `WARD_PRICE.kb/kh/kc` (Ateliê).
- Poço (Genshin): `WR` (chances e pity), `S.wp[pet|hum|std]` (`p5`, `p4`, `g5`, `g4`), `rollG`/`grantG`/`doWishG`, banner permanente `STDB`, ★3 = `ward3()` (peças do Ateliê), `S.dust` (Pó Estelar) e `DUST_SHOP`. O `wishLog` guarda `b`, `r`, `pc` (em que desejo saiu o ★5) e `w` (ganhou o 50/50).
- Barco: `snapshot` nunca salva no mar (usa o píer), `applyState` desembarca, `S.krDay` limita o Kraken a um por dia.

## Mais leve, golpes, pesca, casa e fazenda (v22)

- Chão no shader: `GSPLAT` é um `DataTexture` W×H (R caminho, G terra, B areia, A natureza) lido no `onBeforeCompile` do material do chão. Para mudar um tile em jogo continue usando `setTileColor(x, y)` (atualiza o texel e a vizinhança). Não volte a pintar textura na CPU.
- `renderer.debug.checkShaderErrors` só fica ligado com `?admin=1` ou `?debug=1`. Na qualidade Alta a sombra atualiza a 30 Hz quando você está parada (`shadowThrottle`).
- Efeitos: `fxSlash` (shader `SLASH_*`, malhas reaproveitadas de `SLASH.pool`) e `fxImpact` (faíscas). `stepFx`/`vfxUpdate_v13` liberam material e geometria ao remover; o que é de pool leva `userData.keep`. O arco em folha de sprites (`slash_arc_*`) não é mais desenhado.
- Áreas (`AREAS22`): filhos diretos de `world` além de `AREAS22.far` saem do desenho trocando `layers.mask` para 0 (as luzes ficam de fora, porque o pool `LP` mexe nelas). Não use `layers` para outra coisa em objetos do mundo. Objeto que nunca deve sumir leva `userData.noArea = 1`.
- Pesca: fase `'reel'` em `P.fishing` (barra `by`/`zb`, peixe `fy`, medidor `pr`, brilho `tr`); segurar = `keys.Space` ou `FISH22.hold`. A câmera usa `FISH22.w` para aproximar.
- Casa: a bancada é construída no canto de obra (`BENCH22`, `S.bench22`) e vira o móvel `workbench`. Piso/parede: `homeCycle('wall'|'floor')`, chamado ao clicar na parede (`HOME22.walls`) ou no chão vazio no modo decorar.
- Fazenda: terrenos em `LOTS22` (retângulos `r`, `price`); `S.farm22 = { lots, deb }` guarda os terrenos comprados e o mato/galho/pedrinha/toco (`obj.t === 'debris'`). `FARM.U` é o conjunto de tiles da fazenda e `inFarm` usa ele; `FARM.x0..y1` vira só a caixa em volta. A cerca contorna a união dos terrenos, com porteira em x 33–34 e a placa `lotsign` de cada terreno vizinho à venda.

## Relevo, inimigos e áreas (v23)

- Relevo: `GH(x, z)` dá a altura do chão (grade de cantos `GH23.c`, feita por `ghBuild` com a máscara `ghMask`: 0 em caminho, construção, água, fazenda, zonas, arenas e perto dos marcos). O chão tem a altura nos vértices (`ghGround`). **A lógica continua plana**: o embrulho de `renderer.render` soma `GH` no `position.y` de cada objeto do mundo só durante o desenho e tira depois (`ghCollect`); grupos na origem são percorridos por dentro, objetos com raio > 7 ficam parados e instâncias (`InstancedMesh`) sobem uma vez (`ghIM`), com `Instancer.set` já somando a altura. `toScr` e `emit` também somam `GH`. Objeto que não deve subir leva `userData.noGH = 1`.
- Para algo precisar de chão plano, coloque um `obj` sólido no tile **antes** do relevo: funções em `PRE_GH` rodam antes de `ghBuild` (os acampamentos usam isso).
- Inimigos novos em `EN` (`caranguejo`, `pedrolho`), com IA em `newFoeUpdate`. Elites: `makeElite(s)` (aura `ELITE`, `s.elite`, prêmio no `damageSlime`).
- Acampamentos: `CAMPS.list` (fogueira, barracas, baú `d_chest`), monstros em `campSpawn` (`s.camp`), baú uma vez por dia (`S.campDay`). Mirantes: `VIEWS` no ponto mais alto de cada área (`S.views`).
