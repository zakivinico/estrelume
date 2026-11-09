# Histórico de versões

Cada versão corresponde a uma seção `/* ==== vN: ... ==== */` em `src/main.js`.

## v1.40: criador visual com prévia na personagem
- Penteados, roupas, olhos, sobrancelhas, bocas e estampas viraram cartões com miniatura, nas cores da sua personagem. As miniaturas 3D (penteado e roupa) aparecem aos poucos, sem travar a janela.
- Passar o mouse (ou o foco do teclado e do controle) num cartão veste a opção na prévia 3D, com o nome e "clique para escolher"; ao sair, volta o que estava escolhido.
- Tocar ou clicar num item trancado (🔒) prova a peça por 3 s e diz que ela está à venda no Ateliê da Fifi.
- A prévia 3D fica parada no lugar enquanto você rola as opções; no celular ela fica menor.

## v1.39: nada de ficar presa, câmera livre, pesca nova e rosto ajustável
**Colisões e caminhos**
- Árvores, pedras, postes, Pedras do Vento e outros sólidos soltos colidem como círculo: dá para contornar sem enroscar na quina, e andando de frente para eles a personagem escorrega para o lado.
- Quem fica encostada num sólido sempre consegue sair andando (vale para você, os moradores e os bichos). Se o centro da personagem cair dentro de um sólido, ela é solta no lugar livre mais perto.
- Moradores que nasciam encostados (o Pipo na borda do Poço, a Iris perto da cerca) são postos num lugar livre, e o caminho deles evita passar colado em paredes.

**Câmera**
- Ao ar livre a câmera gira e inclina: arraste com o botão direito (clique sem arrastar continua interagindo), use `,` e `.`, o analógico direito ou dois dedos no celular. `Home` volta ao ângulo padrão.
- Zoom pela rodinha do mouse, por `+` e `−` e por pinça no celular. Shift + rodinha troca a ferramenta.
- O movimento acompanha a câmera: "para cima" é sempre para a frente da tela.

**Pesca**
- 15 espécies (12 novas), cada uma com lugar (lago, mar, oásis, riachos das montanhas), hora e raridade. A Enguia Faísca aparece mais na chuva, e espécie que você ainda não tem aparece um pouco mais.
- Minigame mais tranquilo: barrinha mais larga, peixe 25% mais lento, medidor que enche mais rápido e esvazia mais devagar, e o ❗ espera 1,7 s.
- Sombras de peixes nadam na água, e um deles vem até a boia antes de morder.
- Cada peixe tem tamanho em centímetros, com recorde por espécie.
- **Enciclopédia dos Peixes** (Estrelofone → Peixes): silhuetas das espécies que faltam, onde e quando cada uma aparece, quantos você pescou e o recorde. Espécie nova vale +3⭐ e completar vale +100⭐.

**Personagem**
- Estampas da blusa e do vestido viraram textura: bolinhas, corações, estrelas e flores saem nítidos, sem serrilhado.
- Ajuste fino do rosto no criador: altura, tamanho, distância e giro dos olhos, altura, tamanho e giro das sobrancelhas, e altura e tamanho da boca.
- Formatos novos: 6 de olhos, 5 de sobrancelhas e 6 de boca (com "sem boca").
- 6 penteados novos: chanel com franja reta, longo com franja cortina, maria-chiquinha baixa, curtinho bagunçado, coque alto com mechas e rabo de lado com laço.

**Vale**
- Píer do lago iluminado: postes com lanterna nas pontas, corrimão de correntes e um banco na margem para sentar e ver o lago.
- Paleta única nos modelos de cenário: KayKit, Kenney e Quaternius puxam o matiz para as mesmas cores do vale e ficam com saturação e brilho parecidos (`?nopal=1` mostra as cores antigas).
- A luz da porta da sua casa fica no centro do vão da porta.

**Correções**
- Missão da Lojinha do Tico: durante esse passo a loja abre também à noite, o catálogo abre sozinho depois da explicação, e quem só comprou lanche ganha um banquinho para o passo de decorar.
- Save automático: salva logo depois de criar a personagem, quando o visual muda, ao trocar de aba ou fechar a página e a cada 15 s, com uma cópia de segurança.

**Amigos**
- No GitHub Pages (fora do claude.ai) o Estrelofone mostra **Amigos** e a conexão é direta entre os navegadores (WebRTC pelo Trystero). As amigas abrem o mesmo link e digitam o mesmo código.

## v1.38: Arena dos Campos de verdade
- **Quadro na entrada** (tecla E) explicando a arena, com o Desafio das Ondas, os duelos com amigas e dicas de combate. Na primeira visita aparece um aviso.
- **Desafio das Ondas:** um modo para quem joga sozinha.
  - São 5 ondas de bichos de todo o vale: gelatinas, Planícies, Deserto, Ruínas e, por último, os gigantes da Montanha com um elite.
  - Uma barreira de pétalas fecha a arena. Entre as ondas há uma contagem e você recupera 30% da vida.
  - Prêmios: 🪙 por onda e ⭐ ao vencer as 5, com bônus na primeira vitória.
  - Fica salvo o recorde de onda, o melhor tempo e as vitórias.
  - O modo **Difícil** deixa os bichos 50% mais fortes e dobra os prêmios.
  - A força dos bichos se ajusta ao seu nível. Cair encerra o desafio sem perder moedas e dá para desistir pelo painel.
- **Visual novo:**
  - muro de pedra com borda rosa e 4 portões;
  - arquibancadas de madeira com uma torcida de bichinhos, que pula quando você vence uma onda;
  - arco com bandeirolas no portão virado para a estrada;
  - 8 braseiros com fogo, bandeirolas em volta e uma estrela dourada no centro.
- O quadro e a placa ficam dos dois lados do portão, fora da estrada. O chão da arena e das arquibancadas é plano.

## v1.37: biomas novos, trava no alvo, arco de puxar, moradores que desviam e colmeias novas
**Biomas** (cada um é uma região com nível e névoa própria)
- **Planícies Douradas** (nível 5): campo aberto com prados de flores, fardos de feno, árvores soltas e dois moinhos. Bichos: Javali Fofo (investe em linha reta e fica tonto se trombar) e Gafanhoto Saltador (pula onde você está).
- **Deserto do Sol** (nível 7): areia com dunas, cactos, arenito, ossos, um oásis com palmeiras e uma pirâmide. Bichos: Escorpião Dourado (ferroada com aviso) e Cactinho Espinhento (solta espinhos em volta).
- **Ruínas Antigas** (nível 8): piso antigo, colunas, muros caídos, estátuas e um portal sobre a trilha. Bichos: Sentinela de Pedra (mira e atira de longe) e Armadura Oca (bloqueia de frente; ponto fraco nas costas).
- **Montes de Pedra** (nível 9): montanhas de verdade em blocos, subindo em degraus até o cume com neve e cristais. Sobe 1 bloco andando e até 3 pulando, e descer de um degrau alto é uma queda. Quando um bloco fica entre a câmera e você, ele abre um buraco para você aparecer. Bichos: Cabrito Montês (investida que empurra longe) e Golem da Neve (arremessa pedras).
- Estrada nova ligando as Planícies e o Deserto à estrada do leste, com trilha para as montanhas. Pólen, areia ao vento, luzinhas e neve dão o clima de cada bioma.
- Acampamentos novos nas Planícies, no Deserto e nas Ruínas. O mapa mostra o relevo das montanhas e o nome dos biomas.

**Combate**
- Trava no alvo: tecla V, botão do meio do mouse, R3 no controle ou 🎯 no toque.
  - A personagem fica de frente para o inimigo, os golpes e as habilidades vão nele, as flechas fazem curva até ele e a câmera enquadra os dois.
  - Um cartão mostra o nome, o nível, a vida e uma dica do bicho. Apertar de novo troca de alvo ou solta; quando o alvo cai, a trava passa para o mais perto.
- Arco de puxar e soltar:
  - Segure para puxar a corda (os braços entram na pose) e solte para atirar. Um medidor sobre a cabeça mostra a força.
  - O dano vai de 0,55× a 1,9×. A puxada completa é um tiro perfeito que atravessa até 3 inimigos.
  - Enquanto puxa, a personagem anda devagar. O leque de flechas saiu do botão segurado e ficou só na habilidade.
- Machado mais pesado: bate 12% mais, é um pouco mais lento e o 3º golpe atordoa.
- Esquivar na hora do golpe deixa um contra-ataque pronto: o próximo golpe em 1,6 s bate 1,8×.

**Mundo e moradores**
- A arena saiu da praia e virou a Arena dos Campos, nas Planícies. Ela fica livre de bichos para os duelos.
- Moradores andam com A*: contornam casas, cercas e árvores, desviam uns dos outros e de você e não ficam mais presos nem teleportam.
- Colmeias novas: cestinhas de palha num toco, com abelhinhas voando e flores em volta.
- A placa dos Campos de Lavanda saiu da estrada. Nenhuma placa fica mais em cima de caminho.
- Monstros de acampamento não nascem mais em cima das barracas.
- As sombras dos blocos e dos enfeites novos são aquecidas no carregamento. A bandeirinha dos mirantes não projeta mais sombra: ela compilava um shader novo na primeira visita.

## v1.36: árvore de habilidades em constelação
- A Árvore de Habilidades ganhou outra interface:
  - abas para os ramos (arma, Combate, Natureza e Magia), com os pontos gastos em cada um e um pontinho quando há algo para aprender;
  - um céu noturno onde cada habilidade é uma estrela ligada ao pré-requisito;
  - um painel de detalhes ao lado.
- As estrelas mudam conforme o estado: apagada com cadeado (bloqueada), brilhando em dourado (dá para aprender), acesa (aprendida) e mais clara (no máximo). As habilidades R e F têm cantos quadrados, e as que dependem do nível mostram "Nv 3" ou "Nv 5".
- O painel mostra o tipo (Habilidade R/F, Melhoria, Maestria ou Passiva), o efeito de agora e o do próximo nível, os requisitos marcados com ✔ ou ✖ e o botão Aprender.
- Clicar numa estrela só seleciona. O botão (ou duplo clique, Enter, Espaço ou C) aprende.
- Navegação pelo teclado e pelo controle: setas ou WASD escolhem, Q/E ou LB/RB trocam de ramo. No celular, as abas e o painel ficam empilhados.

## v1.35: falas sem marcação crua, sem contorno, roupas no corpo novo, casa vazia, itens empilhados e árvore de habilidades de verdade
**Textos e visual**
- As falas não mostram mais `<span class="key">` cru: o texto da máquina de escrever é limpo e as teclas voltam a aparecer como teclinhas.
- A protagonista não tem mais contorno.
- As saias, vestidos e barras das roupas descem junto com as pernas mais longas da v1.32, sem deixar um vão na cintura.

**Casa**
- O jogo novo começa com a casa vazia, sem móveis nem fogão de presente: tudo se compra no Tico. Saves antigos continuam com os móveis que já tinham.
- Sem cama, dá para dormir no chão perto da parede do fundo.

**Itens empilhados**
- Itens pequenos (abajur, livros, quadros, porta-retrato, cactos e vasinhos) podem ir em cima de superfícies (mesas, armários, prateleiras baixas, bancada, banquinho e lareira).
- O item de cima fica na altura do tampo do móvel e a luz do abajur sobe junto. Ao guardar ou mover, o item de cima sai primeiro. Se o móvel de baixo sai, o de cima volta para o inventário.

**Árvore de Habilidades**
- Quatro ramos: o da arma equipada, Combate, Natureza e Magia.
- No ramo da arma você desbloqueia a habilidade R (no nível 2) e a F (a partir do nível 3), melhora cada uma (até +60% de dano e 2,4 s a menos de recarga) e chega à maestria no nível 5: Guarda Firme (escudo), Peso Pesado (machado) ou Mão Rápida (arco).
- R e F ficam com cadeado na barra até serem desbloqueadas. Cada arma guarda os próprios pontos.
- A Chuva de Estrelas e a Estocada Ágil saíram da árvore e os pontos voltam. Saves antigos ganham de graça a habilidade R da arma atual.

## v1.34: armas com modelos CC0 da internet
- O escudo, o machado, a aljava e as flechas agora são do KayKit Character Pack Adventurers (Kay Lousberg, CC0), o mesmo pacote das espadas. Os anteriores eram feitos à mão no código.
- O arco é o arco de madeira do Medieval Weapons Pack do Quaternius (CC0), convertido de FBX para GLB.
- Quem usa o arco leva a aljava nas costas. As flechas do arco e da Flecha Perfurante usam o modelo novo.
- Tudo continua preso nos ossos da mão, do braço e do tronco, então acompanha qualquer tamanho de personagem.
- Créditos e licenças em `game/assets/CREDITS-v17-modelos.md`, `LICENSE-KayKit-Adventurers-CC0.txt` e `LICENSE-Quaternius-CC0.txt`, e na tela de créditos.

## v1.33: armas guardadas e sacadas, escudo, habilidades por arma, ícones em pixel, brilho nas portas e título consertado
**Armas**
- Fora de combate a arma fica nas costas, presa no tronco, então serve para qualquer tamanho de personagem e de cabeça.
- No primeiro golpe ela salta para a mão com som de sacar e já ataca. Depois de 4 s sem atacar e sem inimigo por perto, volta para as costas sozinha.
- A Espada vem com escudo: no braço esquerdo quando a espada está na mão (segura metade do dano que vem de frente, com "Bloqueio!") e nas costas quando ela está guardada.

**Habilidades de cada arma** (R e F mudam com a arma; T, o Abraço da Flor, continua para todas)
- Espada: Estocada Estelar e Investida de Escudo (corre com o escudo, empurra e atordoa).
- Machado: Golpe Sísmico (onda em volta que atordoa) e Machado Bumerangue (vai e volta girando).
- Arco: Flecha Perfurante (atravessa todos no caminho) e Chuva de Flechas (marca um ponto à frente).
- Inimigos atordoados ficam parados um instante, com estrelinhas.

**Ícones e interface**
- As miniaturas 3D dos ícones (itens, ferramentas, pratos) viram pixel art, com cores reduzidas e contorno, no mesmo estilo do atlas.
- Ícones novos para o escudo, o bumerangue e a chuva de flechas. O cristal voltou a ser azul.
- Botões, slots, cartões e apps respondem ao passar o mouse e ao apertar. O slot escolhido salta e as moedas e os desejos pulam quando mudam. Tudo fica mais calmo no modo calmo.

**Correções**
- Brilho das portas medido no próprio modelo: a escada aparece como saliência no raio baixo e o brilho vai para a parede da porta logo acima. Isso arrumou as casas com escada de lado, a forja e o moinho.
- Ao voltar para a tela de título vindo de dentro de casa ou de uma loja, o vale de fora é desenhado de novo (antes o píer sumia e a personagem ficava sobre a água). Os balões e nomes dos moradores também não aparecem mais por cima do menu.

**Desempenho:** nenhum shader novo durante o jogo (98 do início ao fim). No bench, 481 ms em média.

## v1.32: protagonista nova, espada na mão, arena da Vovó com aulas, moradores que ensinam, escolha de arma e mapa maior
**Protagonista**
- Proporções novas: pernas mais longas, cabeça um pouco menor e braços mais compridos. O modelo inteiro sobe e as pernas esticam até o chão, então as animações continuam certas.
- Contorno suave em volta dela, para se destacar do chão vista de cima.
- Brilho de anime no cabelo: um arco mais claro sobre a touca, para o cabelo escuro não virar um borrão.
- A espada fica na mão do jeito certo: lâmina para a frente e para cima na pose parada, cabo no punho e tamanho de meia Fofinha. A inclinação vem da pose Idle, então ela acompanha a mão nos golpes sem sair de lado. A picareta segue a mesma regra.
- Animações mais vivas por cima das do Kenney: quique no passo, inclinação para a frente ao correr e para dentro nas curvas, cabeça que olha para a curva, respiração parada, achatadinha ao aterrissar e balanço dos braços.

**Arma escolhida no criador (obrigatória)**
- No jogo novo, você escolhe Espada, Machado ou Arco antes de começar.
- A arma vale também nas aventuras:
  - o Machado bate 60% mais forte, empurra mais e é mais lento;
  - o Arco atira flechas de longe e, carregado, solta um leque de 5.
- Dá para trocar depois em Armas de duelo.

**Desafio da Vovó**
- Agora é numa ilha flutuante fora do mapa, montada quando a luta começa e desmontada quando ela acaba. Você volta para a praça.
- Na primeira vez, a Vovó dá quatro aulas antes da luta valendo: golpe, combo, esquiva e golpe carregado. Durante as aulas ela não ataca de verdade e você não cai.

**Moradores ensinam**
- Seu Bento ensina a pescar quando você chega no píer, e o Tico mostra a loja e a decoração.
- Depois do tutorial, 10 moradores oferecem aulas próprias. Quem tem aula mostra um 📘 sobre a cabeça e o botão "📘 Aula" no menu dele.
  - Vovó Rosa: cozinha. Seu Bento: pesca. Pipo: pulo e dash. Duda: mineração.
  - Íris: bichinhos. Otto: pedidos do dia. Lia: mirantes. Fifi: Ateliê. Marina: barco. Tomé: desejos.
- Cada aula tem um objetivo no painel e dá 🪙, ⭐ e XP.

**Mundo**
- O mapa cresceu de 170×120 para 170×150 tiles: mais 30 linhas de Campos do Sul até a praia.
- O circuito de parkour saiu.
- Névoa organizada: a estrada que desce até a praia virou um corredor da Praia do Sol (nível 1). Antes, os Campos do Sul (nível 4) ficavam no caminho e a praia liberada era inalcançável.

**Visual**
- 5 penteados novos: ondas longas com presilha, chanel com tiara de contas, chiquinhas com fitas, cachinhos com antena e coque com franja de anime.
- 5 roupas novas: vestido de laçarote, moletom de gatinho, colete de explorador, macacão estrelado e blusa de babados.
- 6 estampas novas: corações, estrelinhas, florzinhas, vichy, ondas e arco-íris.

**Desempenho:** nenhum shader novo durante o jogo (98 do início ao fim). No bench, 483 ms em média.

## v1.31: combate fluido, pulo no Espaço, escadas, cômodos, cozinha, desejo épico e cores vivas
A numeração passa a ser 1.31 (a seção no código é `v1.31`).

**Teclas novas**
- **Espaço pula** (andando ao ar livre). **C usa a ferramenta e ataca** (segure C para o giro). No barco, pescando, em casa e nos menus, o Espaço continua como antes.
- No controle: **A** usa a ferramenta e **LT** pula. O Álbum fica só no **L**.

**Combate da Fofinha**
- Mira suave: o golpe vira para o inimigo mais próximo à sua frente.
- Golpe apertado no meio do dash sai assim que ele acaba.
- Com inimigo por perto, a espada ataca em vez de colher a flor ou a concha da frente.
- Movimento por cima das animações: giro do tronco alternado, inclinação, squash e stretch, pulinho no 3º golpe, giro completo no golpe carregado e susto ao levar dano.
- Dash mais longo e macio (0,55 s, desacelera aos poucos), só com um rastro suave no lugar da explosão de poeira.

**Personagem e ferramentas**
- O brilho do cabelo escuro não fica mais cinza: clareia na mesma cor.
- Óculos na altura dos olhos e do tamanho certo do rosto redondo.
- Espada num tamanho de mão, apontando para a frente.
- Regador novo: corpo arredondado, bico fino com chuveirinho, alça em arco e florzinhas.

**Casas**
- Dá para subir as escadas das casas: a altura dos degraus é medida no carregamento.
- O brilho das portas fica no alto da escada, alinhado à porta de verdade.
- As casas dos moradores ganharam cômodos: um quarto separado por parede com passagem e uma cozinha com fogão e pia.
- Na sua casa: Divisória, Meia parede com plantinhas e Arco de passagem (Lojinha do Tico) para montar seus cômodos, e dois níveis novos de reforma, o Casarão do Vale (17×11) e a Mansão Estrelada (19×12).

**Cozinha**
- Fogãozinho Rosa (você ganha um; coloque em casa no modo decorar). Também dá para cozinhar na cozinha das casas dos moradores.
- 8 pratos: Sopa de Cenoura, Salada do Vale, Espetinho de Peixe, Bolinho de Arroz, Geleia de Frutinhas, Torta de Maçã, Panquecas com Mel e Ensopado de Abóbora. Cada um mata a fome e dá vida, fôlego ou corrida turbo, e vende bem.
- Minigames em cada receita: 🔪 cortar na marquinha, 🥄 mexer alternando ← →, 🔥 segurar o fogo na faixa verde e 🧂 apertar no anel dourado.
- Os ingredientes só saem da mochila no fim, e nunca dá errado: capricho de 85% ou mais rende porção dupla.
- Despensa com farinha, ovo, manteiga, arroz e açúcar, e a Panela de Cobre, que deixa as faixas dos minigames 30% maiores.

**Poço e praça**
- Desejo épico em 5 tempos: as moedinhas caem no poço, a luz carrega em espiral, a cor "promove" de azul para lilás e para dourado só quando o resultado merece, as estrelas sobem com rastro e tudo explode em flash, tremida e raios. Com o modo calmo ligado, a animação é mais suave.
- Poço dos Desejos novo: pedras lilás, água que brilha, telhadinho rosa com estrela e flores em volta.
- A praça do Poço ficou maior (16×8 tiles, era 12×7), com postes, bancos e varais nas bordas.

**Cores**
- As cores dos modelos seguem a mesma curva viva: tons apagados ganham mais saturação, cinzas e brancos ficam como estão. Texturas repetidas são processadas uma vez só (26 únicas em ~0,3 s no carregamento). Para comparar com as cores antigas, use `?novib=1`.

**Desempenho:** igual à v29 (bench: 566 ms em média no SwiftShader) e nenhum shader novo durante o jogo.

## v31: roupas novas, estampas e tipos de sapato
Ideias pesquisadas:
- as categorias e os estilos de roupa do Animal Crossing (blusas, vestidos, casacos, fantasias, vários estilos);
- peças cottagecore (jardineira de linho com blusa bufante, cardigã com saia midi, avental pinafore, cores terrosas e pastel);
- fantasias de personagens chibi (marinheiro, capa de chuva, bichinho, bruxinha).

**12 roupas novas da Fofinha**
- Jardineira de linho com mangas bufantes e barra dobrada.
- Cardigã com botões e saia midi.
- Avental de flores (pinafore) com babado.
- Vestido balonê com laço nas costas.
- Capa de chuva com capuz, botões e galochas.
- Marinheiro com a gola quadrada nas costas e lencinho.
- Kigurumi de ursinho: capuz com orelhinhas, barriguinha, rabinho e patinhas.
- Suéter de tricô com gola alta e barra canelada.
- Quimono com mangas largas e faixa obi com laço.
- Manto de bruxinha com capa e broche.
- Conjunto esportivo com listras.
- Colete de losangos sobre camisa branca.
- Quatro são de graça e as outras ficam no Ateliê da Fifi.

**Estampas e sapatos**
- Estampas na blusa ou no vestido: listras, listrinhas, bolinhas, xadrez, degradê e losangos, cada uma com a cor que você escolher.
- Tipos de sapato: redondinho, botinha e sapatilha.

**Moradores:** a Lia, o Bento, o Otto, o Tomé, a Fifi e a Marina estreiam roupas e estampas novas.

## v30: cabelos em mechas, moradores com expressões, sons do criador e girar a personagem
**Cabelos**
- 12 penteados novos feitos de **mechas estilizadas**, que afinam na ponta e têm curva, onda ou ponta de anime:
  - espetado de anime;
  - chanel em mechas;
  - ondas compridas;
  - rabo alto em mechas;
  - topete de lado;
  - tranças longas;
  - cachos soltos;
  - pixie em camadas;
  - fada das estrelas (pontas mais claras e estrelinhas);
  - coque samurai;
  - corte lobo;
  - princesa.
- São inspirados nos tipos de um pacote de penteados estilizados (curto, médio, longo, em camadas, trançado, cacheado, espetado, fantasia e anime), mas foram todos feitos para o jogo.
- Quatro são de graça e os outros ficam no Ateliê. A Iris, a Duda, a Marina e o Pipo estreiam penteados novos.

**Cores**
- Todas as cores foram conferidas uma a uma: pele, cabelo, blusa, calça, sapato, olhos e a cor livre, em todos os penteados (148 testes, todos certos).
- A pele "Original" era igual à "Pêssego" e saiu da lista.

**Moradores com expressões (como no Animal Crossing)**
- Quem passeia pelo vale agora muda de rosto, mostra um balãozinho e faz um gesto:
  - alegria ♪;
  - amor ♥;
  - surpresa !;
  - pensando …;
  - sono z;
  - risada ✦;
  - piscadinha ✿.
- Eles te cumprimentam quando você chega perto, se assustam quando você passa correndo, cochilam de noite e ficam pensativos na chuva.
- Cada expressão tem um sonzinho baixinho e posicionado.

**Criador de personagem**
- Cada escolha toca **um som só, que combina com o que você escolheu**:
  - uma gotinha nas cores (mais aguda nas cores claras);
  - uma escovinha nos penteados;
  - um tecido nas roupas;
  - um brilhinho no rosto;
  - uma bolhinha no tamanho.
- Antes, cada clique tocava cinco sons ao mesmo tempo (clique, confirmar, página, menu e brilho).
- **Gire a personagem**:
  - arraste o modelo com o mouse ou com o dedo (com inércia);
  - use os botões ⟲ ⟳;
  - ou as teclas <kbd>Q</kbd> e <kbd>E</kbd>.
- Dois cliques voltam a personagem para a frente. A dica "arraste para girar" já aparecia antes, mas girar não funcionava.

## v29: metade do custo por quadro
Medido com `tools/teste/bench.js` (o mesmo quadro desenhado várias vezes, esperando a placa terminar, em 9 áreas, qualidade Alta, 1280×720): **de 1.165 ms para 563 ms por quadro, −52%** no renderizador de software dos testes. Nada mudou no jogo; o que saiu era trabalho desperdiçado.
- **Antisserrilhado:** o MSAA da qualidade Alta era o maior custo do quadro. Saiu, e no lugar entrou um FXAA dentro do pass de cor que já existia, praticamente de graça. Agora a Média também fica com as bordas suaves.
- **Borda da floresta:** 3.600 árvores eram desenhadas sempre, mesmo atrás da névoa e fora da tela, e todas faziam sombra (cerca de 850 mil triângulos duas vezes por quadro). Agora entram no recorte por distância em blocos, e lá no fundo da névoa viram pinheiros simples.
- **Enfeites miúdos:** grama, flores, frutinhas, samambaias, cogumelos e o campo de lavanda aparecem até a distância 34, onde a névoa já os apagava.
- **Materiais:** os modelos usavam o material PBR só pela parte difusa (rugosidade 1, metal 0) e agora usam Lambert, que dá o mesmo visual com menos conta.
- **Pós-processamento:** dois passes de tela cheia (a limpeza de pixels inválidos e a saída final) foram para dentro do pass de cor. O brilho (bloom) é calculado em 1/8 da resolução, e o desfoque de maquete lê menos vezes a imagem.
- **Chão:** o ruído das manchas de grama e terra virou uma textura pré-calculada.
- **Sombra:** o mapa de sombra da Alta passou de 2048 para 1024, que já sobra para a área de 32×32 em volta da personagem.
- Triângulos por quadro no mundo aberto: de cerca de 2,6 milhões para cerca de 0,6 a 1,3 milhão.

## v28: efeitos sonoros cozy, no lugar dos sons de 8 bits
- Os 32 efeitos que vinham de um pacote retrô de 8 bits foram refeitos com instrumentos macios: confirmar, cancelar, menus, cliques, bolhas, moedas, missões, segredos, alertas, magia, golpes, acertos, dano, "boom", pulo, voz dos diálogos e as vinhetas de nível, vitória e fanfarra.
  - Interface: **kalimba** e toquinhos de **madeira**.
  - Moedas, alertas e magia: **sininhos de vidro**.
  - Segredos e itens novos: **caixinha de música**.
  - Bolhas: **gotinhas de água**, com três variações.
  - Golpes e acertos: **sopros de ar** e batidas de **almofada**, em vez de bipes.
- Tudo tem um pouco de reverb de quarto, ataque suave e volume mais baixo, para ficar aconchegante (estilo ASMR).
- O bipe sintetizado que acompanha regar e plantar virou um seno macio.
- O golpe no ar não usa mais o som metálico de faca.
- Os sons gravados de verdade (passos, portas, páginas, tecido, água, enxada, machado e bichos) continuam.
- Os sons novos são gerados por `tools/sons_cozy.py` (Python), feitos para o jogo e livres (CC0).

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

**Janelas que não fechavam (correção)**
- O ✕ de quase todas as janelas (Mochila, Mapa, Loja, Ateliê, Ajustes, Habilidades, Poço...) ficava coberto pelo título do painel, então clicar ou tocar nele não fazia nada. Agora ele fica sempre por cima e grudado no topo mesmo quando você rola a janela.
- <kbd>L</kbd> abre e fecha o Álbum (antes só abria).
- A roda de ferramentas fecha com <kbd>Esc</kbd>, com um clique fora dela ou quando a janela do jogo perde o foco. Antes ela podia ficar aberta para sempre.
- No controle, o <kbd>B</kbd> fecha a janela aberta (antes só o Start fechava).

**Caça aos bugs (correção)**
- A roupa equipada no Álbum (Cavaleiro, Bárbaro, Mago, Andarilho) sumia toda vez que o jogo era carregado.
- **Controle:** parava de responder com qualquer menu aberto (inclusive na tela inicial), e um controle parado conectado travava o andar pelo teclado. Agora o controle funciona nos menus e só mexe nas teclas quando o analógico está em uso.
- **Pulo:** pousar em cima de uma cerca, arbusto ou pedrinha, ou encostada numa parede, podia deixar a personagem presa. No ar a colisão agora usa o corpo inteiro (só passa por cima do que é baixo), e quem ficou encostada consegue sair andando.
- **Voltar ao título** no meio de uma conversa, da luta da Vovó, de um duelo, do Kraken ou da abertura deixava tudo isso preso ao continuar. De dentro de casa, loja ou caverna, o vale ficava escondido atrás da tela inicial. Agora tudo volta ao normal.
- **Tamanho da interface:** "Automática" ficava fixa e "Pequena" podia sair maior que ela; ao redimensionar a janela ou girar o celular, a escolha se perdia.
- **Menos animação:** os avisos de nível, de item novo e o nome da área sumiam na hora. Agora continuam aparecendo.
- **Arena das Flores:** blocos invisíveis no anel do chão (e postes que dava para atravessar). Agora só os postes são sólidos, e nenhum enfeite nasce dentro do círculo.
- **Abertura:** <kbd>L</kbd> (Álbum) e <kbd>X</kbd> (roda) funcionavam por baixo dela. A carta da Vovó diz "Querido" para personagens masculinos.
- **Amigos:** o selo "Partida" piscava, a quinta pessoa da sala às vezes continuava aparecendo, e o nível de quem estava na sala não era tratado antes de ir para a tela.
- O formulário de **Sugestões** voltou, agora como app do Estrelofone. A ajuda mostra <kbd>L</kbd> para o Álbum e <kbd>C</kbd> para pular.

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
