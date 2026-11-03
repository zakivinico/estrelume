# Estrelume

Um jogo cozy em 3D no navegador: plante, pesque, faça amizades, deseje bichinhos mágicos no Poço dos Desejos, enfrente a Vovó Rosa, navegue até o Mar Estrelado e encare o Kraken.

## Jogar

- **GitHub Pages:** depois que este repositório for publicado no Pages (Settings → Pages → Source: *GitHub Actions*), o jogo fica em `https://<usuario>.github.io/estrelume/`.
- **Local:** `cd game && python3 -m http.server 8000` e abra `http://localhost:8000`.
- Modo de testes: adicione `?admin=1` ao endereço (ou ligue em Configurações) e aperte **F9**.

## Estrutura

| Pasta | O que tem |
|---|---|
| `game/` | O site pronto (index.html, bundle.js e assets). É isso que o Pages publica. |
| `src/main.js`, `template.html` | Código-fonte (three.js r0.187). |
| `build.sh` | Gera `game/bundle.js` e `game/index.html` com esbuild. |
| `tools/opt.mjs` | Otimiza modelos com gltf-transform (meshopt + WebP). |
| `tools/kraken.mjs` | Modela o Kraken com three.js e exporta GLB. |

## Créditos

Modelos e sons CC0 de KayKit (Kay Lousberg), Kenney e Quaternius; detalhes em `game/assets/LICENSE-*` e `game/assets/CREDITS-*`.
