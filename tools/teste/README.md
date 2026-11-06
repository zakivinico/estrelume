# Testes automáticos no navegador

Rodam com o Chromium do Playwright (sem GPU funciona com SwiftShader; é lento, então os scripts usam timeouts longos).

```bash
node tools/teste/serve.mjs "$PWD/game" 8765 &     # servidor estático (aguenta várias abas)
node tools/teste/tour.js http://localhost:8765/ depois   # fotos de cada área + draw calls, triângulos, luzes, shaders
node tools/teste/mp.js http://localhost:8765/            # multiplayer com duas abas e uma sala simulada (roomstub.js)
node tools/teste/audit.js http://localhost:8765/         # alcançabilidade: marcos, totens, portas e bolsões fechados
node tools/teste/duel.js http://localhost:8765/          # duelo entre duas abas (convite, arco, placar)
node tools/teste/eventos.js http://localhost:8765/       # shaders compilados no meio do jogo, evento por evento (o ideal é nenhum)
node tools/teste/sistemas.js "http://localhost:8765/?noauto=1"   # passeio por todos os sistemas: estado depois de cada passo e erros (SHOT=1 tira fotos)
node tools/teste/bench.js "http://localhost:8765/?noauto=1" alta rótulo   # custo de desenho por quadro em 9 áreas (ms, draw calls, triângulos) para comparar antes/depois
```

- `roomstub.js` imita a capacidade `room` do claude.ai (contrato 0.2.96: `join`, `presence`, `onPeers` com `{peers, joined, left, updated}`) usando BroadcastChannel, para testar o multiplayer fora do claude.ai.
- `OUT=pasta` muda onde o tour salva as fotos.
- `?noauto=1` desliga a qualidade automática da v27 (o SwiftShader é lento e ela baixaria a qualidade no meio do teste).
- `sistemas.js` simula um controle sobrescrevendo `navigator.getGamepads` (`window.__padOn`, `window.__pad`).
