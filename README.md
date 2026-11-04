# Estrelume

Um jogo cozy em 3D no navegador: plante, pesque, faça amizades, deseje bichinhos mágicos no Poço dos Desejos, enfrente a Vovó Rosa, navegue até o Mar Estrelado e encare o Kraken.

**Versão atual: v16** (acessórios por região, estampas em pixel art e cabelos 3D novos). Histórico completo em [`CHANGELOG.md`](CHANGELOG.md).

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

## Créditos

Modelos e sons CC0 de KayKit (Kay Lousberg), Kenney e Quaternius; ícones do Ninja Adventure e DawnLike. Detalhes em `game/assets/LICENSE-*` e `game/assets/CREDITS-*`.
