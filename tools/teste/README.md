# Testes automáticos no navegador

Rodam com o Chromium do Playwright (sem GPU funciona com SwiftShader; é lento, então os scripts usam timeouts longos).

```bash
node tools/teste/serve.mjs "$PWD/game" 8765 &     # servidor estático (aguenta várias abas)
node tools/teste/tour.js http://localhost:8765/ depois   # fotos de cada área + draw calls, triângulos, luzes, shaders
node tools/teste/mp.js http://localhost:8765/            # multiplayer com duas abas e uma sala simulada (roomstub.js)
node tools/teste/audit.js http://localhost:8765/         # alcançabilidade: marcos, totens, portas e bolsões fechados
```

- `roomstub.js` imita a capacidade `room` do claude.ai (contrato 0.2.96: `join`, `presence`, `onPeers` com `{peers, joined, left, updated}`) usando BroadcastChannel, para testar o multiplayer fora do claude.ai.
- `OUT=pasta` muda onde o tour salva as fotos.
