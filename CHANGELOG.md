# Histórico de versões

Cada versão corresponde a uma seção `/* ==== vN: ... ==== */` em `src/main.js`.

## v19: pendências da v18
- **Arco com cara de arco:** ícone novo em pixel art no atlas (antes usava o da varinha) e, durante o PvP e os duelos, a personagem segura um arco 3D (ou o machado, conforme a arma escolhida).
- **Sem engasgo ao baixar a qualidade:** ligar ou desligar o mapa de sombras recompilava todos os shaders. Agora, quando o jogo baixa para a qualidade Baixa no meio da partida, as sombras continuam ligadas, só que baratas (mapa 512 atualizado no máximo 10×/s). Ao abrir o jogo já em Baixa, elas começam desligadas. Ligar as sombras pelo menu compila tudo de uma vez, com o menu aberto.
- **Pré-compilação completa:** a chuva e as malhas instanciadas sem nenhum exemplar no carregamento, como os cogumelos e trevos que nascem durante o dia, também entram na pré-compilação. Num passeio por 40 eventos (chuva, bosque, chefes, barco, Kraken, duelo, poço, criador...), nenhum shader novo aparece mais no meio do jogo.
- **Sons novos (CC0, BigSoundBank, Joseph Sardin):** galinhas cacarejam e patos fazem quá-quá no carinho e de vez em quando, quando você está por perto. A praça e a Vila Girassol ganharam um murmúrio baixinho de vila durante o dia.

## v18: duas moedas, craft, reforma da casa, natureza que volta e duelos
**Economia**
- Duas moedas: **🪙 Moedas** para comércio (vender, comprar, sementes, arar, Ateliê, Forja, expansões, reforma da casa e armas) e **⭐ Desejos**, só para o Poço dos Desejos (estrelas caídas, tarefas do dia, presentes, cartas, eventos e chefes).
- Mais difícil ganhar Moedas: itens vendem por 35% menos (e os pedidos dos moradores acompanham) e as tarefas do dia pagam em Desejos. O jogo novo começa com 120🪙 e 100⭐.
- Saves antigos: o saldo vira Moedas e você fica com até 300⭐ Desejos (aparece um aviso).

**Craft**
- Bancada de Trabalho ao lado da sua casa, também construível para a fazenda e como móvel para dentro de casa. Tem 19 receitas: cercas, caixotes, bancos, barril, fogueira, lanterna, canteiros, cadeira, mesa, estante, tapete, lareira, planta, bolinho, suco e a própria bancada. Tudo usa madeira, pedra, minérios, flores, frutas e lã, sem gastar Moedas.

**Casa**
- Reforma em 3 níveis (Varanda, Lanternas, Casa dos Sonhos) com Moedas e materiais. A casa fica maior por dentro (9×7 → 11×8 → 13×9 → 15×10) e ganha banco, flores, lanternas que acendem à noite, chaminé fumegando e jardim por fora. Cada nível também dá Desejos a cada noite dormida.

**Natureza**
- Árvores cortadas viram toco, depois muda, depois árvore jovem, e voltam adultas no 3º dia. Pedras quebradas voltam depois de 2 dias. As duas coisas ficam salvas no save.

**Mundo e interiores**
- Auditoria de sobreposição: árvores, pinheiros, pedras e arbustos que atravessavam casas e adereços somem e liberam o tile. Enfeites que encostavam em outros saem. A decoração que você colocou nunca é mexida.
- Nada de barraca na frente das portas das casas e das lojas.
- Interiores com mais vida: as casas dos moradores ganham plantas, quadros, armários, estantes e lareira por tema, e o morador fica em casa à noite (e em alguns dias), para conversar. As lojas têm barraca de frutas e pães, caixotes, bigorna, bancada, quadros, plantas e tapete. Os lojistas viram para você, comemoram quando você entra e arrumam a loja de vez em quando.

**PvP**
- Duelos: com multiplayer ligado, clique numa amiga para desafiar. Ela recebe um convite para aceitar ou recusar, os duelos são em melhor de 3 com arena temporária, contagem 3-2-1 e placar, e a vitória dá +15⭐ +30🪙 uma vez por dia por adversária.
- Três armas selecionáveis com 3 níveis de melhoria (Moedas + minérios): **Espada** (rápida, com combo), **Machado** (lento, empurra longe) e **Arco** (flechas que dá para desviar; no nível 3 atira 3). Ficam no painel "Armas de duelo", acessível pela Forja, pelo multiplayer e pelo duelo. A Arena Estelar também usa as armas novas.

**HUD**
- 12% menor, com ficha da personagem, minimapa, tarefas e pílulas compactas, e os espaços vazios da hotbar viraram quadradinhos. As Moedas ganharam ícone de moeda, ao lado dos Desejos.

## v17: fluidez, multiplayer de verdade, rosto pintado e um vale mais cheio
**Desempenho (fim dos travamentos)**
- Pool fixo de luzes: as luzes do jogo viram "fontes" e só 4 luzes reais recebem as mais próximas (adotadas na hora em toda troca de área). Antes eram até 17 ativas, e trocar de área mudava a contagem e recompilava todos os shaders.
- Névoa do mesmo tipo dentro de casa, nas lojas e no modo admin (antes `null` ↔ `Fog` recompilava tudo ao entrar e sair).
- Todos os shaders pré-compilados no carregamento. Na v16, um passeio pelo vale, pela casa, pelas lojas e pela caverna compilava 82 shaders novos no meio do jogo (cada um é um engasgo); agora as trocas de área praticamente não compilam nada. A única exceção é quando o próprio jogo baixa a qualidade gráfica por estar lento.
- Blocos de instância de 16×16 tiles, recorte por distância onde a névoa fecha, frutas do pomar low-poly (eram ~10 mil frutas de 256 triângulos), itens miúdos sem sombra e vegetação simplificada com meshopt. Na praça: 1.967 → ~1.290 draw calls e 5,4 → 2,5 milhões de triângulos.

**Multiplayer**
- Corrigido o formato do `onPeers` (as amigas nunca apareciam) e o nome da sala (o código em maiúsculas era recusado, então ninguém conseguia entrar).
- As amigas aparecem com o visual completo (cabelo, roupa, acessórios, rosto), com movimento suave independente de FPS e teletransporte em saltos grandes. Presença 10×/s.
- Teste automático com duas abas e sala simulada (`tools/teste/mp.js`).

**Visual**
- Chão pintado à mão: sem xadrez, com bordas arredondadas e orgânicas entre grama, caminho, areia e terra, contorno suave nos caminhos e manchas de grama.
- Rosto como textura: bochechas, sardas, estrelinha, coração e pintinha agora são pintados na pele (uma cópia da malha da cabeça presa ao esqueleto). Novas opções: bigodinhos de gatinho, brilhinhos, curativo, pintura de fada, arco-íris e rubor forte.
- 48 modelos CC0 novos (Kenney, Quaternius e KayKit): barraquinhas de feira na praça e na Vila Girassol, fonte, carrinhos, bancos, guarda-sóis e canoa na praia, gazebo e tocos no lago, acampamento no bosque, fardos de feno nos campos, e flores, samambaias e cogumelos espalhados pela natureza.
- 18 móveis novos (camas, sofá, poltrona, lareira, estantes, plantas, tapetes, quadros) e 18 enfeites novos para a fazenda e as áreas personalizáveis.

**Som**
- Motor novo em WebAudio: os efeitos tocam a partir de buffers decodificados, com baixa latência e sem clonar `<audio>`, com variação de tom, limite de repetição e pan estéreo por posição. A música passa por um ganho por faixa, então o crossfade funciona no iPhone (o iOS ignora `audio.volume`). O som pausa com a aba escondida e destrava no primeiro toque.
- Ambiência em camadas: pássaros de dia, grilos à noite, vento, lago, ondas na praia e no barco, chuva e caverna, com volume pelo lugar, pela hora e pelo clima.
- Passos por terreno: grama, terra, areia, madeira (casa, lojas e píer), pedra (caverna) e água.
- 70 sons novos (OpenGameArt e Kenney, todos CC0): pá ao plantar, regador, colheita, golpes suaves, espada, picareta na pedra, slime amassando, respingo da linha de pesca, vaca, ovelha, porco e pintinhos no carinho, páginas, moedas, sininhos e fanfarra. Créditos em `game/assets/CREDITS-v17-sons.md`.

**Mundo e correções**
- Bolsões de chão fechados por árvores e pedras (a auditoria achou 13): quando dá para abrir tirando até 3 árvores ou pedras, eles ganham passagem; os outros viram mato fechado, para nada nascer onde não dá para chegar.
- A Praia do Sol abre no meio do tutorial (antes tudo fora da Vila ficava bloqueado até o fim).
- Corrigido um erro da v16 em que um comentário anulava o retorno antecipado do rosto (personagens sem osso de cabeça podiam quebrar).

## v16: acessórios e cabelos novos
- Nova aba **Acessórios** no criador de personagem, separada por região: **Cabeça**, **Rosto**, **Costas** e **Cintura**.
- Óculos viraram modelos 3D (redondo, quadrado, gatinho, coração, estrela, sol), com cor da armação e estampa.
- Costas: mochilinha, asinhas de fada (batem as asas), laçarote, aljava de flores. Cintura: bolsinha, sininho, flor, cinto de estrelas.
- Cabeça: boina, orelhas de gatinho e tiara de coração; todos os acessórios de cabeça aceitam cor e estampa.
- Estampas em pixel art geradas em canvas: lisa, xadrez, bolinhas, listras, estrelinhas, corações, vichy.
- 8 cabelos 3D modelados (`hr_*`): Longo repicado, Rabo volumoso, Chanel moderno, Coque bagunçado, Clássico, Franja moderna, Topete alto, Raspadinho.
- Espantalho redesenhado (camisa xadrez, palha, rosto de saco e passarinho azul no braço).
- Sombras recalculadas no máximo 20×/s ou quando a personagem anda (desempenho).
- Suporte à cabeça com capuz (`_Head_Hooded`) da base `rogue_hooded`.
- Correção: as bolinhas de cor dos acessórios agora pintam o item (antes só a "Cor livre" funcionava).

### v16.1: correções
- Óculos, costas e cintura ficam presos no lugar certo com qualquer tamanho de cabeça e em qualquer pose (âncoras guardadas no espaço do osso).
- Mechas funcionam nos 8 cabelos 3D novos (faixas por cor de vértice).
- Sombras voltam a atualizar todo quadro na qualidade Alta; o limite de 20×/s fica só em Média/Baixa.
- Aba Acessórios respeita o Ateliê da Fifi: laço, coroa de flores, gorro, tiara estelar e coroa aparecem com 🔒 até serem comprados (antes dava para equipar de graça).
- "Aleatório" também sorteia óculos, costas, cintura, cores e estampas.
- Acessórios antigos da prévia 3D são liberados da memória e as texturas de estampa são compartilhadas.
- Não quebra mais ao carregar um visual sem acessório definido.

## v15 / v15b: mar aberto e Kraken
- Vozes, respostas nos diálogos, sons de interface, barco, mar aberto e o chefe Kraken com modelo próprio (`tools/kraken.mjs`).
- Tabela única de game feel (`FEEL`): pausa de impacto, tremor, zoom, flash, som e elástico.

## v14: duas bases, cabelos, PvP
- Duas bases de corpo (Menina/Menino) com tudo personalizável, cabelos femininos e masculinos com mechas e volume, enquadramento do palco 3D, VFX orientados, PvP, decoração KayKit, ajuste automático de qualidade.

## v13: Vovó Rosa e multiplayer
- Alinhamento, cercas, fome, desejos por tempo, clima e luas, salas, modo admin (F9), multiplayer e a luta com a Vovó Rosa.

## v12: mapa novo e game feel
- Borda irregular, Névoa Sonolenta, mapa novo, menu principal, game feel, eventos dos moradores.

## v11: regiões e VFX
- Remapeamento de texturas da personagem (paleta 8×4 do KayKit), regiões por nível, inimigos por região, portões, VFX do Kenney Particle Pack e amigas humanas no Poço.

## v10: polimento geral

## v9: pixel art e habilidades
- Sem emojis: ícones em pixel art. Árvore de habilidades, level up, machado, cutscene, animais.

## v8: combate e marcos
- Slimes gelatinosos, novos inimigos e habilidades; placas, marcos visitáveis, viagem e lore contada.

## Antes da v8
- Base do jogo: fazenda, pesca, moradores, Poço dos Desejos (gacha de bichinhos), casa decorável, Caverna Cintilante, Rei Slime, Ateliê da Fifi, Forja da Duda, história do vale com páginas perdidas.
