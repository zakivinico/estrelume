# Referências de game design, game feel e tecnologia

Pesquisa feita em 04/11/2026 para guiar a evolução do Estrelume.

## Game feel / juice
- **Juice It or Lose It** (Jonasson & Purho, 2012) e **The Art of Screenshake** (Jan Willem Nijman): tremor, hitstop, partículas, recuo e som em camadas.
- **Juicing Your Cameras With Math** (Squirrel Eiserloh, GDC 2016), https://gdcvault.com/play/1023146 : tremor por "trauma" (amplitude = trauma²) e suavização de câmera; em 3D, tremor principalmente de rotação.
- **Lerp smoothing is broken** (Freya Holmér): suavização independente de FPS com `1 - exp(-k·dt)`.
- [tweenjs/tween.js](https://github.com/tweenjs/tween.js) (MIT): tweens e easing.
- [skevy/wobble](https://github.com/skevy/wobble) (MIT): molas amortecidas (squash & stretch).
- [mixandjam/Balatro-Feel](https://github.com/mixandjam/Balatro-Feel) (MIT): receitas de "tato" na interface.

## Design cozy / life-sim
- **Coziness in Games** (Project Horseshoe 2017; resumo em lostgarden.com): segurança, suavidade, necessidades satisfeitas, padrão "cuidar e fazer amizade".
- **Lostgarden** (Daniel Cook), https://lostgarden.com : loops de jogo e padrões de amizade (proximidade, repetição, reciprocidade).
- [ellisonleao/magictools](https://github.com/ellisonleao/magictools) (MIT): índice de recursos de gamedev.

## Desempenho em three.js
- [mrdoob/three.js](https://github.com/mrdoob/three.js): `BatchedMesh`, `InstancedMesh`, `renderer.compileAsync`.
- [agargaro/instanced-mesh](https://github.com/agargaro/instanced-mesh) (MIT): `InstancedMesh2` com recorte por instância e LOD.
- [gkjohnson/three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) (MIT): raycast e consultas espaciais rápidas.
- [donmccurdy/glTF-Transform](https://github.com/donmccurdy/glTF-Transform) (MIT): já usado em `tools/opt.mjs`.
- [mrdoob/stats.js](https://github.com/mrdoob/stats.js) (MIT) + `renderer.info` para medir.
- Fórum three.js (Safari/iOS): limitar pixelRatio, texturas e mapas de sombra menores, tratar `webglcontextlost`.

## Personalização de personagem
- [pixiv/three-vrm](https://github.com/pixiv/three-vrm) (MIT): expressões por morph e por atlas com offset de textura.
- [spite/THREE.DecalGeometry](https://github.com/spite/THREE.DecalGeometry) / drei `<Decal>`: decalques projetados; não seguem ossos de SkinnedMesh sozinhos.

## Multiplayer no navegador
- **Snapshot Interpolation** (Gaffer On Games) e **Fast-Paced Multiplayer** (Gabriel Gambetta): buffer de interpolação (~100 ms na Source).
- [geckosio/snapshot-interpolation](https://github.com/geckosio/snapshot-interpolation) (BSD-3).
- [yjs/yjs](https://github.com/yjs/yjs) (protocolo "awareness": presença com TTL), [colyseus](https://github.com/colyseus/colyseus), [partykit](https://github.com/partykit/partykit).

## Técnicas a aplicar no Estrelume
1. Suavização independente de FPS em câmera, pets e seguidores: `lerp(a, b, 1 - Math.exp(-k * dt))`.
2. Tremor por trauma (0–1, amplitude trauma², ruído suave, mais rotação) e controle de intensidade nas configurações.
3. Hitstop curto (40–80 ms) em crítico, golpe final e peixe raro, sem congelar UI e partículas.
4. Squash & stretch com mola ao colher, plantar, pular e acertar slimes (volume conservado).
5. Um tweener único com easing (`easeOutBack` em popups, itens voando para a mochila).
6. Transições de câmera suaves entre vale, casa, caverna e barco.
7. Loop diário cozy: poucos pedidos por dia, resumo ao dormir, sem punição por faltar.
8. Amizade com reciprocidade: lembrar presentes, falas e itens por marco de coração.
9. Onboarding em camadas: um sistema novo por vez, em contexto.
10. `InstancedMesh`/`BatchedMesh` para cercas, árvores, pedras e canteiros; medir `renderer.info.render.calls`.
11. `renderer.compileAsync` no carregamento e antes de trocar de área, para não travar na primeira aparição.
12. Sombras baratas: câmera de sombra justa, mapSize menor no celular, discos de sombra para bichinhos.
13. Safari/iOS: pixelRatio até 1,5, `dispose()` em CanvasTextures, `webglcontextlost`, pausar em `visibilitychange`.
14. Rosto pintado na textura (CanvasTexture em cache por visual), expressões por atlas.
15. Jogadores remotos interpolados por buffer de snapshots, extrapolação curta e teletransporte em saltos grandes.
