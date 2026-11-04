# Histórico de versões

Cada versão corresponde a uma seção `/* ==== vN: ... ==== */` em `src/main.js`.

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
