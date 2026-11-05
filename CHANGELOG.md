# Histórico de versões

Cada versão corresponde a uma seção `/* ==== vN: ... ==== */` em `src/main.js`.

## v27: mais leve (resolução dinâmica e qualidade automática), personagem do título, cabelos diferentes e introdução com diálogos
**Desempenho**
- **Resolução dinâmica**: o jogo mede o tempo de cada quadro e baixa a resolução interna quando fica lento (até 60%), subindo de volta quando sobra folga.
- **Qualidade automática**: se mesmo na resolução mínima continuar lento, a qualidade desce sozinha de Alta para Média e depois para Baixa, com um aviso. Dá para desligar em Ajustes → ⚡ Desempenho, onde também tem a opção **Mostrar FPS**.
- A névoa sonolenta (9 camadas de tela cheia) só é desenhada quando há uma região fechada por perto, e com metade das camadas fora da Alta.
- O antisserrilhado (MSAA) do pós-processamento ficou só na Alta.
- Objetos miúdos (vasinhos, pedrinhas, enfeites) não projetam mais sombra, o que deixa a passada de sombra mais leve.
- O HUD é redesenhado no máximo 8 vezes por segundo, em vez de a cada quadro.

**Tela inicial e píer**
- A Fofinha da tela inicial fica de pé no píer e acena de vez em quando. O "sentar" das animações novas é de cadeira e afundava o corpo nas tábuas.
- No jogo, a personagem também afundava uns 30 cm nas tábuas do píer. Agora pisa em cima delas.

**Cabelos**
- Cada penteado ganhou uma combinação própria de touca e franja: touca de lado, curtinha, comprida ou fofa (afro), e franja de cortina, reta, de lado ou espetada. Os 22 penteados ficaram bem diferentes uns dos outros.
- Alguns moradores trocaram de penteado para não ficarem todos iguais.

**Introdução**
- A abertura virou cinco cenas curtas com diálogo em balão: a Narradora conta a história do vale, do Poço e da névoa, e depois a carta da Vovó Rosa aparece.
- O texto aparece letra por letra. <kbd>Espaço</kbd>, <kbd>Enter</kbd>, <kbd>E</kbd>, um clique ou um toque mostra a fala inteira e depois passa para a próxima. <kbd>Esc</kbd> ou o botão "Pular" encerra a abertura.

## v26: cabelos divertidos, casas variadas, corações com sol e lua, arena aberta da Vovó, pulo e parkour
**Cabelos**
- 10 penteados novos da Fofinha: rabo de lado com laço, tranças, afro fofo, moicano, chanel com franja, coquinhos de coelho, chiquinhas com estrelas, topete de onda, orelhinhas de gato e rabo alto com xuxinha. Quatro são de graça; os outros ficam no Ateliê da Fifi.
- Todas as franjas viraram mechinhas separadas com uma mecha mais clara de brilho.

**Casas**
- Modelos novos de casa (KayKit Medieval Hexagon, CC0): duas casinhas em quatro cores, taverna e mercado. As casas das vilas se alternam entre eles, em vez de repetirem sempre os mesmos dois modelos. A sua casa e a da Vovó continuam como eram.

**HUD de vida, fôlego e fome**
- A vida virou uma fileira de corações (20 de vida por coração) que pulsam quando a vida está baixa.
- Fôlego e saciedade ficaram em barras arredondadas com ícone, e a saciedade pisca quando você está com fome.
- Atrás do retrato há um céu que muda de cor com a hora (amanhecer, dia, entardecer e noite estrelada), com um sol ou uma lua de carinha andando num arco para mostrar o horário.

**Arena da Vovó num campo aberto**
- O Desafio da Vovó Rosa (e a arena de duelos) foi para a **Arena das Flores**, num campo aberto (o mais perto da praça que couber, hoje na Praia do Sol), sem parede de vidro: círculo de pedra, postes com bandeirinhas e tochas. Durante a luta, um anel de pétalas acende no chão para marcar o limite. A arena aparece no mapa.

**Pulo e parkour**
- <kbd>C</kbd> pula (o Álbum foi para a tecla <kbd>L</kbd>); no controle é o LT e no celular há um botão ⤒. Pular gasta um pouquinho de fôlego, e no ar dá para passar por cima de cercas, pedrinhas e arbustos.
- **Circuito de Parkour** ao lado da arena, na areia: nove plataformas cada vez mais altas até a estrela lá no topo. Tem cronômetro e recorde; a primeira vez dá +120🪙 e +10⭐.

## v25: interface mais clara e adaptável, só a base Fofinha, título com shader e música, abertura com cenários e amigos
**Interface (inspirada em Zelda: Breath of the Wild, Animal Crossing: New Horizons, Stardew Valley e Pokémon Let's Go)**
- **Estrelofone**: o menu virou um celular com apps coloridos (Mochila, Mapa, Diário, Álbum, Habilidades, Desejos, Visual, Casa, Amigos, Salvar, Carregar, Ajustes, Como jogar, Créditos e Título). Cada app mostra a tecla de atalho e uma descrição, e dá para navegar com as setas ou o controle.
- **Diálogo em balão**, como no Animal Crossing: cantos bem redondos, retrato redondo, nome numa etiqueta inclinada e setinha que pula.
- **Roda de ferramentas**: segure <kbd>X</kbd> para escolher a ferramenta numa roda (com o mouse ou as setas) e solte para equipar.
- **Ajustes de interface**: tamanho (pequena, automática, grande, enorme), texto grande, menos animação e qual tipo de dica de botão mostrar (automático, teclado, toque ou controle).
- **Controle (gamepad)**: anda pelo analógico, A usa, X fala, B esquiva, Y abre a mochila, LB/RB trocam o item e Start abre o menu.
- Avisos e a dica de ação ficaram em balões arredondados, mais fáceis de ler. Em tela estreita, a lista de tarefas começa recolhida.

**Só a base Fofinha**
- As bases de aventureiro (Cavaleiro, Bárbaro, Mago e Andarilho) saíram do jogo, inclusive da tela inicial e do criador. Jogadora, moradores, lojistas, quem está em casa e as amigas do multiplayer usam a Fofinha.
- As antigas roupas de aventureiro viraram conjuntos da Fofinha: Cavaleiro (uniforme e quepe), Bárbaro, Mago (vestido e tiara) e Andarilho (moletom). Saves antigos passam para a Fofinha sozinhos.

**Tela inicial**
- Shader por cima do vale: raios de sol, aurora rosada, bolinhas de luz subindo e brilhinhos em cruz. O título flutua.
- Música fofa nova, de caixinha de música (melodia de sininho, acordes macios, baixinho e brilhos), composta e gerada na hora com Web Audio.

**Abertura com cenários**
- A história agora tem seis cenas, com hora do dia e efeitos próprios:
  1. a chuva de estrelas;
  2. as flores de luz no lago;
  3. o Poço dos Desejos ao entardecer;
  4. a névoa sonolenta cobrindo o vale;
  5. a carta da Vovó Rosa;
  6. a chegada na vila.
- Cada cena tem nome, transição em clarão e bolinhas de progresso. O tempo segue o jogo, então em computador lento nenhuma cena é pulada.

**Multiplayer**
- Até 4 jogadores por partida. Quem entra numa partida cheia recebe um aviso e sai.
- Painel de amigos à esquerda, com retrato, nome, nível, onde cada um está (área, casa, caverna, loja), distância e vida.

## v24: base Fofinha redonda, moradores num lugar só e brilho nas portas
**Base Fofinha nova**
- O corpo quadradinho do Kenney deu lugar a um bonequinho redondo, tipo pelúcia: cabeça grande e redonda com orelhinhas e narizinho, corpinho de feijão, bracinhos curtos com mãozinha redonda e sapatinhos redondos.
- As animações continuam as mesmas (as peças ficam presas nos ossos do esqueleto Kenney).
- Os 12 penteados foram refeitos: coque alto, coquinhos, coque com faixa, coque redondo, liso comprido, chiquinhas, cacheadinho, careca com barba, quepe, espetado, topete com óculos e bagunçado.
- As 12 roupas também foram refeitas: moletom com capuz, blusinha com gola, vestido, terninho, jaleco, jaqueta com zíper, camiseta, camisetão com bermuda, uniforme com cinto, terno com gravata, colete e jardineira.
- Rosto com olhos maiores, estilo Animal Crossing. Acabou a recoloração que pintava o cabelo da cor da pele.
- Todos os moradores na base nova também mudaram.

**Moradores e lojas**
- As lojas abrem das 6h às 20h. Com a loja aberta, a Duda, a Fifi e o Tico ficam no balcão e não aparecem passeando lá fora. Com a loja fechada, eles saem para o vale e a porta não deixa entrar.
- Dentro da Forja e do Ateliê, do lado do balcão, dá para conversar com a lojista (pedidos e missões dela continuam valendo).
- Quem está em casa (à noite ou no almoço) não aparece mais lá fora ao mesmo tempo. A Vovó Rosa fica sempre na praça.
- O nome de quem não está ali não fica mais flutuando no ar, nem no mapa.

**Portas**
- Portas abertas soltam um brilho quente com faíscas subindo, mais forte ao entardecer. A porta de loja fechada e a de casa sem ninguém ficam apagadas.

**Mundo**
- Barracas, carrinhos, chafariz e bancos da feira ficam longe do caminho (pelo menos 2 tiles) e reservam espaço em volta, para ninguém atravessar a lona.

## v23: terreno irregular, inimigos novos, elites, acampamentos e mirantes
**Terreno irregular**
- O vale ganhou relevo: colinas suaves na grama selvagem, mais altas na Floresta do Norte e nas Terras do Leste e mais baixas na praia. Caminhos, praças, fazenda, arenas, beiras de água e o entorno das construções continuam planos, então as trilhas passam entre os morros.
- Árvores, pedras, flores, moradores, bichinhos, inimigos e itens acompanham a altura do chão, e a câmera sobe um pouco junto com você. O topo das colinas fica mais claro e as encostas mais escuras, para dar para ler o relevo vista de cima.
- O relevo é só visual: colisão, cliques e saves continuam iguais, e nenhum shader novo é compilado durante o jogo.

**Inimigos**
- **Caranguejo** (Praia do Sol): anda de lado em volta de você, ergue as garras e dá um bote. Depois do bote fica cansado e leva mais dano.
- **Pedrolho** (Floresta do Norte e Terras do Leste): pedra com musgo que mira (linha vermelha no chão) e sai rolando. Normalmente é duro (leva pouco dano), mas se bater numa parede ou árvore fica **atordoado** e leva o dobro.
- **Elites ★**: alguns inimigos fora da vila nascem maiores, com aura dourada, mais vida e mais força. Derrotar um dá moedas, Desejos e loot extra.

**Áreas**
- **Acampamentos de monstros**: um por área (Maré, Pétalas, Musgo, Campos e Pedras), com fogueira, barracas e cinco monstros liderados por um elite. Limpe o acampamento para abrir o baú (moedas, Desejos e itens da área), uma vez por dia. Eles aparecem no mapa (M).
- **Mirantes**: o ponto mais alto de cada área tem uma bandeirinha. Aprecie a vista (E) para a câmera abrir e, na primeira vez, ganhar +5⭐ e XP.
- Ambiência própria em cada área: folhas caindo no norte, pólen na Vila Girassol, brilhos na praia, sementinhas nos campos e luzes mágicas no leste.

## v22: mais leve, golpes estilo Genshin, pesca com zoom, casa editável por dentro e fazenda que cresce
**Mais leve**
- O chão é desenhado no shader: um mapa de tipos de 170×120 (≈80 KB) diz onde é grama, caminho, areia ou terra, e a GPU faz bordas e detalhes. Antes era uma textura pintada na CPU de ≈16 MB que levava mais de 1 s para ficar pronta; agora leva ≈0,1 s e fica lisa em qualquer zoom.
- **Áreas**: o mapa todo existe, mas só a área em volta da câmera é desenhada. O que está além da névoa sai do desenho sozinho e volta ao chegar perto. Ao entrar numa área nova aparece o nome dela no alto da tela.
- Sombras na qualidade Alta atualizam a 30 Hz quando você está parada; a checagem de erros de shader (lenta) só roda no modo admin; bandeirinhas, floreiras e bancos viraram uma malha só cada.
- Efeitos de golpe, faíscas e sprites são reaproveitados ou liberados da memória de vídeo ao sumir (antes ficavam acumulando).

**Golpes estilo Genshin**
- Corte novo desenhado por shader: meia-lua brilhante com núcleo branco, borda colorida e rastro que se apaga, inclinação alternada a cada golpe do combo.
- Impacto com estrela de faíscas finas e anel; crítico ganha clarão. O golpe final do combo faz um segundo corte cruzado com brilho dourado. O arco antigo em folha de sprites saiu.

**Pesca com zoom e minigame novo**
- A câmera aproxima e enquadra a boia enquanto você pesca.
- Depois de fisgar, uma coluna de água com o peixe: **segure Espaço** (ou o botão, ou o clique) para a barra verde subir e mantenha o peixe dentro dela até encher o medidor. Peixe comum nada manso, o raro muda de ideia e o lendário dá arrancadas.
- Às vezes aparece um **brilho do lago**: segure-o na barra por 1 s para ganhar +5⭐. O peixe pego salta da água até você.

**Casa**
- A **bancada** não vem mais pronta lá fora: dentro de casa há um canto de obra marcado no chão, e você constrói a bancada com 10 madeiras e 4 pedras. Ela vira um móvel comum (dá para mudar de lugar no modo decorar). Quem já usava a bancada ganha a dela dentro de casa.
- Piso e papel de parede mudam de dentro do cômodo, sem menu: no modo decorar, clique na parede ou no chão vazio; perto da parede, <kbd>E</kbd> troca o papel de parede.

**Fazenda que começa pequena (estilo Stardew)**
- Jogo novo começa num **Canteirinho** cercado com 10 quadradinhos de terra. Em volta há cinco terrenos cheios de mato, galhos, pedrinhas e tocos, cada um com uma placa 🪧 de **terreno à venda** na cerca (250 a 1.500🪙).
- Ao comprar, a cerca se abre para o terreno novo. Limpe o mato com a espada, os galhos e tocos com o machado e as pedrinhas com a picareta, ou com <kbd>E</kbd> à mão (menos os tocos). Dá madeira, pedra e às vezes trevo ou flor.
- Um pouco de mato volta a crescer a cada dia na grama livre da fazenda. Saves antigos mantêm a área que já tinham.

## v21: base fofinha estilo Animal Crossing, Poço estilo Genshin, barco e inconsistências
**Personagem (base nova "Fofinha")**
- Base nova e mais simples: os 12 personagens do **Kenney Mini Characters** (CC0), cabeçudinhos como em Animal Crossing, com o mesmo esqueleto e 18 animações (andar, correr, pular, sentar, pegar, comemorar...). Jogo novo começa nela; as bases aventureiras continuam no criador.
- Personalização peça por peça: **12 penteados** e **12 roupas** que se misturam, cor do cabelo, da blusa, da calça ou saia e dos sapatos (18 tecidos), pele, altura e tamanho da cabeça.
- Rosto pintado como em Animal Crossing: 10 tipos de olhos, 7 cores de olho, 6 sobrancelhas, 8 bocas e 8 bochechas/enfeites (sardas, rubor, bigodinhos, estrela, coração).
- Acessórios de cabeça, óculos, costas e cintura funcionam na base nova. Penteados, roupas e tecidos extras ficam à venda no Ateliê da Fifi.
- Todos os moradores (Rosa, Tico, Bento, Pipo, Íris, Duda, Otto, Lia, Fifi, Tomé e Marina) passaram para a base nova, cada um com visual próprio, no mesmo estilo da jogadora.

**Poço dos Desejos estilo Genshin**
- Três banners com pity separado: **bichinho** e **personagem** (eventos que trocam a cada 3 dias) e o **Desejo do Vale**, permanente.
- ★5 com 0,8% de base, chance subindo a partir do 66º desejo e garantido no 80º. 50/50 com garantia no ★5 e também no ★4 (garantido a cada 10).
- ★3 agora são **peças do Ateliê** (roupas, penteados, tecidos, acessórios, rastros e tintas).
- Repetidos sobem de **Constelação** (♥) e dão **Pó Estelar**, trocado na **Troca Estelar** por Desejos, Paleta mágica, coroa, rastro e tecido dourado.
- Meteoro da cor da maior raridade, revelação item por item (★4/★5 com o bichinho em 3D), resumo em cartas altas, **Histórico** com o número do desejo de cada ★5 (e se perdeu o 50/50) e página de **Detalhes** com as chances.

**Barco (playtest)**
- Salvar no mar guarda a posição do píer, e carregar um save no barco desembarca e encerra o Kraken (antes você ficava presa na água ou num barco em terra).
- A personagem fica em cima do convés (estava dentro do casco), o Kraken surge à frente do barco, tem mais vida, toca a música de chefe e só aparece uma vez por dia mesmo recarregando.
- Segurar Espaço continua atirando, a mira puxa de leve para o Kraken, os tiros param na terra, e virar o dia na luta não some com a barra.
- No barco não dá para carregar a espada, correr gastando fôlego, usar habilidades ou subir na bicicleta. O minimapa diz "Mar Estrelado", e o barco bloqueado aparece com 🔒.

**Chão sem pixelado**
- O chão é repintado de forma suave: a borda entre grama, caminho, areia e terra mistura as duas cores em vez de escolher uma por texel, e os detalhes (tufos alongados, pedrinhas com sombrinha, sulcos ondulados na terra arada, florzinhas redondas e brilho na areia) são feitos de ruído macio interpolado, sem os carimbos de 1 texel que viravam quadradinhos ampliados.

**Inconsistências (auditoria)**
- Textos de moeda certos em compras, mochila, arar, morte, missões, Kraken, ginástica, aniversário, cartas e saves (🪙 Moedas × ⭐ Desejos). O presente da Rosa passa a dar Desejos, e o pulinho das moedas anima a moeda certa.
- Ajuda atualizada: controles 1–8 e novas teclas, cartões de saciedade, bancada e reforma, barco e Kraken, duelos e natureza que volta, e o Poço novo.
- Nomes iguais em todo lugar (Quadro de tarefas, Torre da Íris, Arena Estelar, Minha Fazenda), textos que respeitam "ela/ele" e código do multiplayer com 5 caracteres.
- Interface: sem a ligadura quebrada da fonte ("Fifi", "floresta"), o botão de fechar volta para o canto certo, os ícones que sumiam (lua/sol do relógio, martelo, apagar save) aparecem, os requisitos mostram o nome do minério e a mochila fica em 6 colunas.
- A tecla R volta a girar móveis e enfeites. O duelo acaba se você entra numa casa, desce da bicicleta ao começar, e as armas não disparam de bicicleta nem no barco. A migração da Paleta mágica olha todas as cores. Os créditos no jogo foram completados.

## v20: correções visuais e placas novas
**Interface**
- Cartão da personagem: as barras de vida, fôlego e fome ficam dentro do cartão (vazavam para fora desde o HUD enxuto da v18) e o texto "100 / 100" não quebra mais em duas linhas.
- O mapa mantém a proporção certa (antes ficava achatado em telas mais baixas).

**Criador de personagem**
- Penteados completos (os cabelos 3D e os curtos, como bob, topete e black power) escondem o cabelo que vem modelado na cabeça, em vez de sair por cima dele. Os cabelos 3D se encaixam pela "touca" (antes os longos ficavam enormes e flutuando).
- A lista de penteados mostra só os do gênero escolhido, mais os unissex.
- A "Cor livre" virou a **Paleta mágica** do Ateliê da Fifi (450🪙), coerente com as outras cores pagas. Quem já usava uma cor livre continua com ela.

**Moradores**
- Cada morador tem visual próprio: cabelo, roupa, chapéu, óculos, mochila, cinto, tamanho e rosto. Antes quatro deles eram o mesmo mago e três o mesmo bárbaro. Os retratos, os lojistas e os moradores dentro de casa usam o mesmo visual.

**Mundo**
- Placas novas: um poste com braço e a tábua pendurada por cordinhas, que balança e dá um "boing" quando você passa, com um passarinho que pula, uma estrela que gira ou uma flor em cima. Dentro das lojas, a placa fica só na parede.
- As placas saem de dentro das construções e da frente das portas (7 mudaram de lugar), e só o poste é sólido.
- O píer do lago encosta na margem.
- Nada de abóbora, caixote, árvore, pedra ou arbusto no meio do caminho. Os canteiros que encostavam nas casas saem.
- Caixa de correio nova (antes era um cubo num pau) e o gazebo do lago saiu (escondia o Seu Bento).

**Chão**
- Mais resolução (12 px por tile no computador e 8 no celular), normais suaves (acabaram os triângulos claros e escuros do sombreamento facetado) e detalhes pintados: tufos de grama, florzinhas, pedrinhas no caminho, sulcos na terra arada e brilho na areia. O caminho não "vaza" mais para baixo das árvores.

## v19: pendências da v18
- **Arco com cara de arco:** ícone novo em pixel art no atlas (antes usava o da varinha) e, durante o PvP e os duelos, a personagem segura um arco 3D (ou o machado, conforme a arma escolhida).
- **Sem engasgo ao baixar a qualidade:** ligar ou desligar o mapa de sombras recompilava todos os shaders. Agora, quando o jogo baixa para a qualidade Baixa no meio da partida, as sombras continuam ligadas, só que baratas (mapa 512 atualizado no máximo 10×/s). Ao abrir o jogo já em Baixa, elas começam desligadas. Ligar as sombras pelo menu compila tudo de uma vez, com o menu aberto.
- **Pré-compilação completa:** os shaders agora são compilados também para o buffer do pós-processamento (espaço de cor linear, usado em Média e Alta). Antes só saía a versão para a tela, então o que estava longe no carregamento compilava de novo ao aparecer (era o engasgo no Bosque das Fadas). A chuva e as malhas instanciadas ainda vazias, como os cogumelos e trevos que nascem durante o dia, também entram. Em 41 etapas de teste (chuva, bosque, lojas, casas, chefes, barco, Kraken, duelo, poço, criador, troca de qualidade...), nenhum shader novo foi compilado no meio do jogo.
- O arco tem a própria dica no botão ("Atirar com o arco" / "Golpear com o machado") e os testes em `tools/teste/` voltam a rodar (o `package.json` da pasta os marca como CommonJS). Teste novo: `tools/teste/eventos.js`.
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
