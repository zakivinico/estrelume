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
- Desde a v25 só existe a base Fofinha (`km`): `OLD_BASES` (rogue, knight, barbarian, mage, rogue_hooded) viram `km` no `Char` e no `cloneM`; as roupas antigas viram conjuntos em `OUT_KM` (`lookKM()` junta o visual). O `ch_rogue` continua carregado só como fonte de animações (`CLIPS`).
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
- Desde a v28 os efeitos de interface, magia, golpes e vinhetas são **sintetizados** por `tools/sons_cozy.py` (kalimba, marimba, sininhos, caixinha de música, bolhas, madeira, sopros, com reverb de quarto). O estilo é cozy/ASMR: nada de onda quadrada ou de 8 bits. Para mudar um som, edite a receita em `S['nome']` e rode `python3 tools/sons_cozy.py`. Toda nota passa por `soft_end` (sem isso, o corte vira estalo). O `tone()` do jogo é um seno com ataque suave.

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

## Base Fofinha redonda, lojas com horário e portas (v24)

- A base `km` não recolore mais as malhas do Kenney: `kmLook` esconde `km_Body`/`km_Head` e prende peças redondas nos ossos (`fofaParts` descreve cada peça em coordenadas do mundo em repouso; `fofaBuild` junta tudo numa malha por osso com `VCMAT`, com cache por visual; `fofaRef` lê a posição de repouso dos ossos). Penteado novo: um `case` em `fofaParts` pelo `kh`; roupa nova: entrada na tabela `B` (`sl` manga, `bt` parte de baixo, `ex` detalhe). O rosto é `kmFaceTex` numa casquinha esférica (`fofaFace`).
- `kmPart`/`kmGeo`/`kmFace` (análise de cor da v21) ficaram sem uso pela base nova.
- Lojas: `shopOpen()` (`SHOP_H`, 6h–20h); `enterShop` recusa quando está fechada. `npcAway(n)` diz se o morador está na loja (`KEEPER_SHOP`) ou em casa (`residentHome`); quem está fora some do mundo, dos nomes e do mapa.
- Portas: `DOORGLOW` (plano e poça de luz aditivos por porta, criados no carregamento) acende conforme `shopOpen`/`residentHome`.
- Adereços grandes (barraca, carrinho, chafariz, banco) via `dressProps` ficam a 2 tiles de caminho e água (`DRESS_NOPATH`) e reservam 3×3.

## Interface, título, abertura e amigos (v25)

- Menu principal = **Estrelofone** (`openPhone`, lista `APPS`; `phoneAct(k)` abre cada app). `openMenu('main')` fora do título cai nele; as outras abas (`save`, `load`, `settings`, `credits`) continuam do `openMenu_v12`.
- Ajustes de interface em `SET.uis` (`UIS`: multiplica o `--hs`), `SET.bigtxt` (`--mscale`), `SET.calm` e `SET.glyph` (`body[data-input]`: kb, touch, pad). `uiApply()` aplica.
- Controle: `padUpdate()` traduz o gamepad em `keys` (analógico) e em `keydown`/`keyup` sintéticos (`PADMAP`).
- Roda de ferramentas: `RING` (segure X); usa `THUMB['t_' + id]`.
- Tela inicial: `TSH` (triângulo de tela cheia com `ShaderMaterial` aditivo, `renderOrder` alto, sem teste de profundidade; aparece só com `titleOn`). Música do título: `cuteTitleSong()` renderiza com `OfflineAudioContext`, vira WAV e entra em `MUS.title.src`.
- Abertura: `CSC()` lista as cenas (`d` duração, `h` hora, `n` nome, `txt`, `cam(k)`, `fx(dt)`, `me`); `cutCamera` conta o tempo com `dt` (`CUT.tt`).
- Multiplayer: `PARTY.max = 4`; a presença leva `j` (hora de entrada), `lv` e `rg` (área). `partyOrder()` ordena por `j`; quem entrou depois dos 4 primeiros sai (`partyCheckFull`). Painel `#party` em `partyUpdate`.

## Cabelos, casas, HUD, arena, pulo e parkour (v26)

- Penteados novos da Fofinha: `case 'h1'..'h10'` em `fofaParts`, rótulos em `KM_HEADS` (que agora é a lista de penteados válidos). Ajudantes: `bang` (franja em mechas), `chain` (rabo/trança), `bow` (laço) e `star`. Cor de brilho: `hl`.
- Casas: modelos `hx_*` (KayKit Medieval Hexagon, licença em `game/assets/LICENSE-KayKit-Medieval-Hexagon-CC0.txt`). `houseModel(o, x, y)` escolhe o modelo de cada casa das vilas (a da jogadora e a da Vovó ficam como eram).
- HUD: `hudHearts()` redesenha `#hearts` (corações em SVG, `#stbar`/`#sttxt` mantidos para a atualização por quadro). Relógio do retrato: `DIAL`/`dialUpdate` com `dialIcon` (sol e lua desenhados em canvas).
- Arena: `ARENA26` (achada por `arenaFind` num campo aberto da vila ou da praia, montada em `PRE_GH` para ficar plana). `RB` e `PVP` usam o centro e o raio dela; `RB.wall` é o anel de pétalas no chão.
- Pulo: `P.jy`/`P.jv` (`JUMP.v0`, `JUMP.g`), `doJump()` (Espaço desde a v1.31, LT no controle, botão `#tJ`), `jumpUpdate`. No ar o `moveC` deixa passar por cima de `LOW26`. A altura é aplicada só no desenho (embrulho do `renderer.render`).
- Parkour (removido na v1.32): `PK26.plats` fica vazio; `platTop`/`platBlock` continuam, sem plataformas.

## Desempenho automático, título e introdução (v27)

- `PERF27`: `perfTick` mede o quadro (no embrulho do `renderer.render`) e `perfGovern` (1×/s) muda `PERF27.scale` (resolução interna, mínimo 0,6, via `perfApplyScale`) e, com `SET.autoq`, desce a qualidade. `SET.fps` mostra `#fps27`. Nos testes headless use `?noauto=1` (ou `?admin=1`) para o governador não mexer na qualidade.
- MSAA do composer (`samples`) só na Alta. `FOG27` esconde as camadas de `FOGR` quando não há região fechada perto da câmera. `shadowDiet()` tira a sombra de malhas pequenas depois do `buildWorld`. O `hud()` roda no máximo a cada 120 ms.
- `DECKY` é a altura das tábuas do píer (`q_dock`, cerca de 0,39). A tela inicial usa `titlePose(t)` (Idle e Waving), porque o `sit` do Kenney é de cadeira.
- Cabelos: as toucas variam por `capSide`, `capShort`, `capLong` e `capPuff`, e as franjas por `bangSwoop`, `bangCurtain`, `bangBlunt` e `bangSpiky` (em `fofaParts`). Penteado novo deve combinar touca, franja e enfeite de um jeito que ainda não exista.
- Introdução: `INTRO_SC()` lista as cenas (`h` hora, `who`, `lines` com texto ou função, `cam(k)`, `me: 'read'|'walk'`); `introAdvance()` completa a fala e depois passa; `CUT.v27` marca a abertura nova (o `cutCamera` da v27 cuida da câmera e da máquina de escrever).
- Janelas: o `#mx` (✕) é `position: sticky` com `z-index` alto (a animação de entrada dos filhos do `.mp` usa `both` e cria camadas por cima). Painel com fundo recortado usa `overflow: clip`, não `hidden`, senão o ✕ não gruda. Teste com clique de verdade (`elementFromPoint`), porque `element.click()` passa mesmo com o botão coberto.
- Estados passageiros: `resetTransient()` (conversa, luta da Vovó, duelo, abertura, Kraken, roda, pulo, pesca, decorar/fazenda) roda no `toTitle` e no `applyState`. Estado novo desse tipo deve ser limpo ali.
- Controle: `padUpdate` roda num `setInterval` próprio (o laço do jogo pausa com menu aberto). O analógico só escreve em `keys` quando está em uso (`INPUT.stick`/`INPUT.run`). B com janela aberta vira Escape (`padBack`).
- Tamanho da interface: o `layoutUI` final calcula `--hs` = escala crua × 0,88 × `UIS[SET.uis]`. O `layoutUI.s` é um getter que devolve a medida atual, para o `layoutUI` original (preso no resize e no setInterval) não escrever por cima.
- Colisão no pulo (`moveC` da v26/v27): no ar testa os 4 cantos e só deixa passar por `LOW26`; se a personagem já está encostada num sólido, aceita o passo que mantém o centro livre e não afunda mais.
- Passeio por todos os sistemas: `node tools/teste/sistemas.js "http://localhost:8765/?noauto=1"` (inclui um controle simulado via `navigator.getGamepads`).

## Metade do custo por quadro (v29)

- Meça com `node tools/teste/bench.js "http://localhost:8765/?noauto=1" alta rótulo`: desenha o mesmo quadro várias vezes esperando a GPU (`readPixels`) em 9 áreas e imprime `gpu` (ms), draw calls e triângulos. O `gl.finish` e o intervalo do rAF **não** servem para medir no SwiftShader (o primeiro não espera, o segundo varia demais). Referência: v28 = 1.165 ms em média, v29 = cerca de 560 ms.
- Sem MSAA em nenhuma qualidade (`samples = 0`, canvas sem `antialias`): o FXAA fica dentro do `grade`, que também faz o mapeamento de tom e o sRGB (`#include <tonemapping_fragment>` e `<colorspace_fragment>`). O `OutputPass` e o `SANE` estão desligados; a proteção contra NaN e valores absurdos fica no `tx()` do grade e no filtro de brilho do bloom. Pass novo de pós-processamento: pense duas vezes, porque cada tela cheia custa caro.
- Toda `InstancedMesh` do mundo deve estar no `CULL.list` (o `precompileAll` da v29 inclui as que sobraram). Malha instanciada com instâncias espalhadas pelo mapa inteiro deve ser dividida em blocos (`rechunkIM`), senão nunca é recortada. Enfeites miúdos (`SMALL29`) somem em `FAR29` (34); o resto em `CULL.far` (46).
- Materiais dos modelos: o `prepare` troca `MeshStandardMaterial` por `MeshLambertMaterial` (`toLambert29`). Material novo de cenário: use Lambert.
- Chão: o `gv()` do shader lê `NOISE29` (textura de ruído) em vez de calcular hashes.

## Cabelos em mechas, expressões e criador (v30)

- Mechas: `fofaG` ganhou `lock` (curva), `tip` (ponta de anime) e `wave` (onda), feitas por `lockGeo`. Em `fofaParts`, `L(geo, cor, raiz, direção, comprimento, largura, giro, espessura)` alinha a mecha (que cresce para −y) na direção pedida; `SH(el, az)` dá um ponto na casca da cabeça (el = 0 no topo, az = 0 na frente) e `NR` a normal. Ajudantes `bangLocks` (franja em mechas) e `ringLocks` (mechas em volta). Penteados `h11`..`h22`.
- Penteado alto (espetado, coque) atravessa chapéu e boina: para moradores com `acc` de chapéu, escolha um penteado baixo.
- Expressões dos moradores: `EXPR30` (olhos, boca, sobrancelha, balão, gesto e som), `npcExpress(n, k)` troca o rosto com `fofaFace` (mesmo material, sem shader novo) e mostra o balão `n.e30b`; `emoUpdate30` decide quando acontece (cumprimento a menos de 3,2, surpresa com você correndo, sono à noite, pensando na chuva, aleatório). Expressão nova: entrada em `EXPR30` e som `emo_*` em `tools/sons_cozy.py`.
- Criador: `crSel30(k, v)` toca o som da escolha (`sel_color` com a altura pela cor, `sel_hair`, `sel_cloth`, `sel_face`, `sel_pop`). Ao reabrir o criador, `CR30.quiet` cala os sons de abrir janela e `CR30.mute` cala o brilho do `scPower`. Girar: `CR30.yaw`/`vel` (arrastar no `SC.cv`, botões `data-rot30`, Q/E); o balanço automático (`CR30.sway`) some enquanto você gira.
- Peles da Fofinha no criador: `SKINS_KM` (sem a "Original", que era igual à Pêssego).

## Roupas, estampas e sapatos (v31)

- Roupas da Fofinha: entrada na tabela `B` de `fofaParts` (`sl`: `s`, `l`, `puff`, `wide`; `bt`: `p`, `h`, `k`, `d`, `bal`, `midi`, `robe`, `coatL`; `ex`: o detalhe) e o código em `KM_VAR` (lista de roupas válidas: sem isso o `kmLook` troca pela padrão). Nome em `KM_BODIES`, preço em `WARD_PRICE.kb` ou grátis em `WARD_FREE.kb`.
- Estampas: chave `kp` (de `KM_PAT`) com cor `kpc`. A peça recebe a estampa pelo 13º item de `A(...)`; o `fofaBuild` da v31 troca a geometria por uma mais fina (`ballP`, `skirtP`) e pinta cada triângulo com `patColor` (u = volta em torno da peça, v = altura). Estampa nova: um `case` em `patColor` e o nome em `KM_PAT`.
- Sapatos: chave `ksh` (`KM_SHOE`: `redondo`, `bota`, `sapatilha`; `pata` só no kigurumi). Chaves novas do visual entram no `KM_DEF` e no cache do `fofaBuild`.

## Combate, escadas, cômodos, cozinha e desejo épico (v1.31)

- A numeração agora é 1.31 (seção `v1.31` no código; rótulo `Estrelume · v1.31` no `template.html`).
- Teclas: **Espaço pula** quando `jumpCtx131()` é verdadeiro (ao ar livre, andando, sem janela, barco, pesca nem decorar). **C usa a ferramenta**: o handler de captura troca o C por um Espaço sintético marcado com `__tool131`, que não pula. No controle, `padMap131` faz o A virar C e o LT virar Espaço. O Álbum é só o L. Nos testes, use `key('Space')` para pular.
- Combate (`CB131`): `softAim131` vira para o inimigo mais perto num cone de ~75°. Durante o dash, o golpe fica guardado em `P.buf`. Com inimigo a menos de 3,2, a espada tem prioridade sobre colher. O movimento procedural (giro, inclinação, squash, pulinho, giro carregado, susto) e a altura da escada (`STEPH131.h`) entram só no desenho, no embrulho do `renderer.render`. Dash: `DASH131` (`dur`, `v`) e `dashTrail131`.
- Escadas: `stepBuild131` lança raios nos modelos das casas em volta de cada porta no carregamento e guarda a altura dos degraus em `STEP131` (grade de 0,25). `stepAt131(x, z)` lê essa altura, e `D.step131` guarda o topo da escada, usado por `doorGlowAlign131` para pôr o brilho da porta lá em cima.
- Cômodos: o embrulho de `buildRoomFor` põe parede do quarto e cozinha nas casas `casa`/`rosa` (`R.cozinha131`). Na casa da jogadora: os móveis `div131`, `divh131` e `arch131` (modelos `p31_*`, feitos por `mkDiv131`) e mais dois níveis em `HOME_LV`.
- Cozinha:
  - Pratos em `DISH131` (`need`, `food`, `hp` número ou `'max'`, `st`, `boost`, `steps`). Cada prato também vira `ITEMS`/`FOOD`, e o embrulho de `eatItem` aplica os efeitos.
  - Ingredientes da despensa: `ITEMS[k].pantry` (preço de compra).
  - Minigames: `mkStep131` (`cortar`, `mexer`, `fogo`, `tempero`), com `upd`, `press`/`side` e `score` entre 0 e 1. O desenho fica em `drawCook131`.
  - Onde cozinhar: `cookSpot131` (o móvel `fogao131` em casa ou `R.cozinha131` nas casas dos moradores), ligado ao `nearestSpecial`.
  - Os ingredientes só saem no `finishCook131`. Fechar a janela no meio não gasta nada.
  - Prato novo: entrada em `DISH131` com `kind` desenhado em `dishIcon131`.
- Desejo: `playWishG` foi substituído por uma coreografia em canvas 2D (`#wcv131`, `WISH131`: moedinhas, carga em espiral, promoção da cor por raridade, voo das estrelas, explosão). Não usa WebGL nem shader novo. `WISH131.pause` congela o tempo nos testes. O modo calmo (`body.calm`) reduz partículas e tremida.
- Poço: `wellKM131()` substitui o `k_well` da praça (a água `WELL131.water` pisca no `shrineUpdate`), e o ícone `THUMB.well` vem de `p31_well`. A praça do Poço agora é `rect(35, 28, 50, 35)` mais a faixa `41–50 × 36`.
- Cores: `vibMat131`/`vibTex131` passam cores e texturas dos modelos de cenário pela curva `vib131` no `prepare` (não mexe em `ch_`, `km_`, `hr_` nem em personagens). Texturas iguais são processadas uma vez e dividem a mesma `source` (`VIB131.src`). Use `?novib=1` para comparar.

## Protagonista, arma, ilha da Vovó, aulas e mapa maior (v1.32)

- Proporções da Fofinha (`PROP132`): o embrulho de `fofaParts` estica as pernas, e `prop132` (chamado no `kmLook`) sobe o nó do modelo `lift` e encolhe tudo que está preso no osso da cabeça (cabelo, rosto, chapéu e óculos), além de alongar os braços. O que for preso na cabeça depois do `kmLook` passa por `prop132Head` (embrulhos de `attachHead` e `equipSlots`).
- Contorno só da protagonista: `outline132` (casca invertida com `OUTM132`, compilado no carregamento por uma malha invisível). Brilho de anime no cabelo: peça `arc` (de `fofaG`) sobre a touca.
- Empunhadura: `gripQ132` calcula, uma vez, a rotação da mão na pose Idle; armas `w:` na mão ficam com a lâmina para a frente e para cima (`GRIP132.tilt`), com o cabo no punho e escala `GRIP132.sw` (espada) ou `GRIP132.pick`.
- Animação procedural (`ANIM132`): quique, inclinações, cabeça, respiração e aterrissagem nos ossos da protagonista, só no desenho (embrulho do `renderer.render`, que desfaz tudo depois).
- Arma: `pwSel()` vale também fora dos duelos. O Machado usa o `swordAttack` com `WPN132.axeT` (dano e empurrão maiores em `hitSlime`/`bossHit`); o Arco usa `bowShot132` e as flechas de `WPN132.arrows`. No jogo novo, `wpnPicker132` aparece no criador e o `#crOk` não deixa começar sem arma (`wpnSet132`).
- Desafio da Vovó (`A132`): ilha montada por `arenaBuild132` em (820, 320) e apagada no embrulho de `rosaCleanup`, que leva você de volta à praça. Lá dentro o `moveC` anda livre e o `snapshot` salva na praça. Aulas em `TUT132` (golpe, combo, esquiva, giro): `tutStep132` avança, e durante as aulas a Vovó não ataca (`RB.cd = 99`) e o dano é cortado. `S.tut132` marca que já foram feitas.
- Professores: `TEACH132[ev]` faz um morador falar quando você chega perto durante aquele passo do tutorial (`S.taught132`). Aulas dos moradores em `LES132` (`who`, `goal`, `ev`, `need`); `S.les132 = { done, cur, n }`. Os eventos novos (`cook`, `move`, `mine`, `pet`, `deliver`, `view`, `atelie`, `boat`) passam pelo `ev()`. O 📘 sobre a cabeça vem de `lesMarks132`.
- Mapa: `H = 150` (era 120). Crescer só para o sul mantém os índices dos tiles salvos (`S.cut`, `S.rocks`); mudar o `W` exigiria converter esses saves. O parkour foi desligado (`parkourBuild` vazio). Corredor da praia: o embrulho de `regionAt` devolve a Praia do Sol em `ROAD132` (x 39,5–46,5) entre os Campos do Sul.
- Peças novas por cima de antigas: `NEWKH132` (penteados `h23`–`h27`) e `NEWKB132` (roupas `n1`–`n5`) chamam o `fofaParts` com a peça base e acrescentam detalhes. Estampas novas no embrulho de `patColor` (`coracoes`, `estrelas`, `flores`, `vichy`, `ondas`, `arcoiris`).
