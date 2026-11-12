# Estrelume

Um jogo cozy em 3D no navegador: plante, pesque, faça amizades, deseje bichinhos mágicos no Poço dos Desejos, enfrente a Vovó Rosa, navegue até o Mar Estrelado e encare o Kraken.

**Versão atual: v1.44** (Masmorra Cintilante com 5 andares gerados a cada dia, baús, espinhos e o Guardião da Cripta; cozinhas com fogão, forno, pia e geladeira de verdade; madeira, tocos e caixotes novos; machado de duas lâminas, arco maior e escudos por espada). A v1.43 trouxe: (versão para PC em Windows, macOS e Linux, app instalável, Guia do Vale com "o que fazer agora", dicas na primeira vez, sombras de nuvens, luz do céu por hora, mais plantas no vento e enfeites com metade dos triângulos). A v1.42 trouxe: (PvP refeito: acerto na hora, Duelo melhor de 3, Arena Estelar com poderes, Treino com a Boneca Estelar e HUD de luta). A v1.41 trouxe: (Vendinha da Dona Mel com sementes e venda escolhida, Pasto Feliz comprado, Projetos da Vila, plantas que crescem por dias regadas, inimigos com aviso de ataque e mais peso por nível, pesca refeita, óculos e rosto ajustados, HUD e ícones novos). A v1.40 trouxe: (criador visual: miniaturas de penteados, roupas, rosto e estampas, e prévia na personagem ao passar o mouse, antes de escolher). A v1.39 trouxe: (colisões que não travam, câmera que gira e aproxima, estampas nítidas, rosto ajustável e penteados novos, pesca com 15 espécies, peixes nadando e enciclopédia, píer iluminado com banco, missão do Tico consertada, save automático da personagem e amigos direto pelo navegador no GitHub Pages). A v1.38 trouxe: (Arena dos Campos com quadro explicativo, Desafio das Ondas para jogar sozinha, muro, arquibancada com torcida e braseiros). A v1.37 trouxe: (biomas novos: Planícies, Deserto, Ruínas e Montanhas em blocos, com bichos próprios; trava no alvo, arco de puxar e soltar, contra-ataque na esquiva perfeita, moradores que desviam, arena nas Planícies e colmeias novas). A v1.36 trouxe: (árvore de habilidades em constelação: abas por ramo, estrelas ligadas num céu noturno e painel de detalhes). A v1.35 trouxe: (falas sem marcação crua, protagonista sem contorno, roupas que acompanham o corpo novo, casa que começa vazia, itens pequenos em cima de mesas e armários e árvore de habilidades com ramo da arma, desbloqueios e maestria). A v1.34 trouxe: (escudo, machado, aljava e flechas do KayKit e arco do Quaternius, todos CC0, no lugar dos modelos feitos à mão). A v1.33 trouxe: (armas guardadas nas costas e sacadas no ataque, escudo com a espada, duas habilidades por arma, ícones em pixel, interface mais reativa, brilho certo nas portas e tela de título consertada). A v1.32 trouxe: (protagonista com proporções novas, contorno e espada bem segurada, arma escolhida no criador, Desafio da Vovó numa ilha com aulas de combate, moradores que ensinam cada mecânica, mapa maior sem parkour, praia acessível, penteados, roupas e estampas novos). A v1.31 trouxe: (Espaço pula e C usa a ferramenta, combate mais fluido com dash longo, escadas das casas, cômodos e divisórias, cozinha com minigames, desejo épico, praça maior com Poço novo e cores mais vivas). A v31 trouxe: (12 roupas novas, estampas na blusa e no vestido e tipos de sapato). A v30 trouxe: (12 penteados em mechas estilizadas, moradores com expressões como no Animal Crossing, sons próprios no criador e personagem que gira). A v29 trouxe: (metade do custo por quadro: FXAA no lugar do MSAA, borda da floresta recortada, enfeites miúdos só de perto, materiais e pós-processamento mais leves). A v28 trouxe: (efeitos sonoros cozy: kalimba, sininhos, bolhas, madeira e sopros no lugar dos sons de 8 bits). A v27 trouxe: (resolução dinâmica e qualidade automática, personagem do título de pé no píer, cabelos bem diferentes entre si e introdução com diálogos que você passa apertando). A v26 trouxe: (10 penteados novos, casas variadas, corações com sol e lua no HUD, arena aberta da Vovó, pulo e circuito de parkour). A v25 trouxe: (menu Estrelofone, diálogo em balão, roda de ferramentas, ajustes de interface e controle, só a base Fofinha, tela inicial com shader e música fofa, abertura com cenários e painel de amigos até 4). A v24 trouxe: (base Fofinha redonda tipo pelúcia, moradores num lugar só, lojas com horário e brilho nas portas abertas). A v23 trouxe: (terreno irregular com colinas, inimigos novos e elites, acampamentos de monstros com baú e mirantes). A v22 trouxe: (chão no shader e áreas que só desenham o que está perto, golpes estilo Genshin, pesca com zoom e barra de segurar, bancada construída dentro de casa, piso e parede trocados no cômodo e fazenda que começa pequena e cresce por terrenos). A v21 trouxe a base fofinha estilo Animal Crossing e o Poço estilo Genshin; a v20 trouxe correções visuais e a v18 duas moedas, bancadas de craft, reforma da casa, natureza que volta, interiores vivos, duelos com três armas e HUD enxuto. Histórico completo em [`CHANGELOG.md`](CHANGELOG.md).

## Jogar

- **GitHub Pages:** a cada push na `main`, o workflow `.github/workflows/pages.yml` publica a pasta `game/`. Ative uma vez em *Settings → Pages → Source: GitHub Actions*. O endereço fica `https://<usuario>.github.io/estrelume/`.
- **Local:** `npm run serve` e abra `http://localhost:8000`.
- **No PC:** Estrelofone → **Baixar** (ou `https://<usuario>.github.io/estrelume/baixar/Estrelume-Windows.zip`, `Estrelume-macOS.zip` e `Estrelume-Linux.tar.gz`). O lançador traz o jogo inteiro e abre numa janela própria; o save fica no computador. Os pacotes são gerados pelo workflow do Pages a partir de `tools/desktop/`. No Chrome e no Edge também dá para instalar o site como app.
- **Com amigas:** Estrelofone → **Amigos**, digite um código de partida e passe o mesmo código para as amigas (até 4). Dentro do claude.ai o jogo usa a sala do artifact; no GitHub Pages (ou em qualquer servidor) a conexão é direta entre os navegadores, por WebRTC com o [Trystero](https://github.com/dmotz/trystero), sem servidor próprio.
- **Modo de testes:** adicione `?admin=1` ao endereço (ou ligue em Configurações) e aperte **F9**.

## Desenvolver

```bash
npm install        # uma vez: esbuild, three, gltf-transform
npm run build      # gera game/bundle.js e game/index.html
npm run dev        # build + servidor local em http://localhost:8000
```

O build é determinístico: o mesmo `src/main.js` sempre gera o mesmo `game/bundle.js`. O bundle fica no repositório porque o Pages publica `game/` sem passo de build.

## Estrutura

| Caminho | O que tem |
|---|---|
| `src/main.js` | Todo o código do jogo (three.js r0.187), em seções `/* ==== vN: ... ==== */`. |
| `template.html` | HTML + CSS da interface. O build troca `<script>/*GAME*/</script>` pelo bundle. |
| `game/` | O site pronto (index.html, bundle.js e assets). É isso que o Pages publica. |
| `game/assets/m/*.js` | Modelos GLB em base64 (`window.__GLB[nome]`), carregados pela `MODEL_LIST`. |
| `game/assets/{music,sfx,ui,vfx,icons}` | Músicas, sons, peças de interface, partículas e atlas de ícones. |
| `build.sh` | Build com esbuild (`npm run build`). |
| `tools/opt.mjs` | Otimiza modelos com gltf-transform (meshopt + WebP): `node tools/opt.mjs entrada/ saida/`. |
| `tools/glb2js.mjs` | Empacota `.glb` em `game/assets/m/<nome>.js`: `npm run glb2js -- modelo.glb`. |
| `tools/kraken.mjs` | Modela o Kraken com three.js e exporta GLB: `npm run kraken -- kr_kraken.glb`. |
| `CLAUDE.md` | Convenções do projeto para trabalhar com o Claude por aqui. |
| `tools/desktop/` | Lançador da versão para PC em Go (`build.sh` gera os pacotes de Windows, macOS e Linux em `game/baixar/`; precisa do Go 1.22+). |
| `tools/teste/` | Testes no navegador: tour visual com métricas, multiplayer com sala simulada e auditoria do mapa. |
| `docs/REFERENCIAS.md` | Referências de game design, game feel e desempenho usadas no projeto. |

## Créditos

Modelos e sons CC0 de KayKit (Kay Lousberg), Kenney e Quaternius; ícones do Ninja Adventure e DawnLike. Detalhes em `game/assets/LICENSE-*` e `game/assets/CREDITS-*`.
