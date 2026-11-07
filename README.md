# Estrelume

Um jogo cozy em 3D no navegador: plante, pesque, faça amizades, deseje bichinhos mágicos no Poço dos Desejos, enfrente a Vovó Rosa, navegue até o Mar Estrelado e encare o Kraken.

**Versão atual: v1.35** (falas sem marcação crua, protagonista sem contorno, roupas que acompanham o corpo novo, casa que começa vazia, itens pequenos em cima de mesas e armários e árvore de habilidades com ramo da arma, desbloqueios e maestria). A v1.34 trouxe: (escudo, machado, aljava e flechas do KayKit e arco do Quaternius, todos CC0, no lugar dos modelos feitos à mão). A v1.33 trouxe: (armas guardadas nas costas e sacadas no ataque, escudo com a espada, duas habilidades por arma, ícones em pixel, interface mais reativa, brilho certo nas portas e tela de título consertada). A v1.32 trouxe: (protagonista com proporções novas, contorno e espada bem segurada, arma escolhida no criador, Desafio da Vovó numa ilha com aulas de combate, moradores que ensinam cada mecânica, mapa maior sem parkour, praia acessível, penteados, roupas e estampas novos). A v1.31 trouxe: (Espaço pula e C usa a ferramenta, combate mais fluido com dash longo, escadas das casas, cômodos e divisórias, cozinha com minigames, desejo épico, praça maior com Poço novo e cores mais vivas). A v31 trouxe: (12 roupas novas, estampas na blusa e no vestido e tipos de sapato). A v30 trouxe: (12 penteados em mechas estilizadas, moradores com expressões como no Animal Crossing, sons próprios no criador e personagem que gira). A v29 trouxe: (metade do custo por quadro: FXAA no lugar do MSAA, borda da floresta recortada, enfeites miúdos só de perto, materiais e pós-processamento mais leves). A v28 trouxe: (efeitos sonoros cozy: kalimba, sininhos, bolhas, madeira e sopros no lugar dos sons de 8 bits). A v27 trouxe: (resolução dinâmica e qualidade automática, personagem do título de pé no píer, cabelos bem diferentes entre si e introdução com diálogos que você passa apertando). A v26 trouxe: (10 penteados novos, casas variadas, corações com sol e lua no HUD, arena aberta da Vovó, pulo e circuito de parkour). A v25 trouxe: (menu Estrelofone, diálogo em balão, roda de ferramentas, ajustes de interface e controle, só a base Fofinha, tela inicial com shader e música fofa, abertura com cenários e painel de amigos até 4). A v24 trouxe: (base Fofinha redonda tipo pelúcia, moradores num lugar só, lojas com horário e brilho nas portas abertas). A v23 trouxe: (terreno irregular com colinas, inimigos novos e elites, acampamentos de monstros com baú e mirantes). A v22 trouxe: (chão no shader e áreas que só desenham o que está perto, golpes estilo Genshin, pesca com zoom e barra de segurar, bancada construída dentro de casa, piso e parede trocados no cômodo e fazenda que começa pequena e cresce por terrenos). A v21 trouxe a base fofinha estilo Animal Crossing e o Poço estilo Genshin; a v20 trouxe correções visuais e a v18 duas moedas, bancadas de craft, reforma da casa, natureza que volta, interiores vivos, duelos com três armas e HUD enxuto. Histórico completo em [`CHANGELOG.md`](CHANGELOG.md).

## Jogar

- **GitHub Pages:** a cada push na `main`, o workflow `.github/workflows/pages.yml` publica a pasta `game/`. Ative uma vez em *Settings → Pages → Source: GitHub Actions*. O endereço fica `https://<usuario>.github.io/estrelume/`.
- **Local:** `npm run serve` e abra `http://localhost:8000`.
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
| `tools/teste/` | Testes no navegador: tour visual com métricas, multiplayer com sala simulada e auditoria do mapa. |
| `docs/REFERENCIAS.md` | Referências de game design, game feel e desempenho usadas no projeto. |

## Créditos

Modelos e sons CC0 de KayKit (Kay Lousberg), Kenney e Quaternius; ícones do Ninja Adventure e DawnLike. Detalhes em `game/assets/LICENSE-*` e `game/assets/CREDITS-*`.
