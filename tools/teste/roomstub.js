// Stub da capacidade "room" do claude.ai (contrato 0.2.96) usando BroadcastChannel, para testar com várias abas.
(() => {
  const me = Math.random().toString(36).slice(2, 10);
  const mkRoom = (name) => {
    const bc = new BroadcastChannel('room-' + name); let mine = {}; const others = {}; const hs = new Set(); let pend = null, joined = [], left = [], updated = [], alive = true;
    const snap = () => [{ peer: me, by: null, isMe: true, sameTab: true, kind: 'viewer', guest: false, presence: Object.freeze({ ...mine }), updatedAt: Date.now() }, ...Object.values(others)];
    const flush = () => { pend = null; const ch = { peers: snap(), joined, left, updated }; joined = []; left = []; updated = []; for (const h of hs) try { h(ch); } catch (e) { console.error('onPeers handler threw', e); } };
    const sched = () => { if (!pend) pend = requestAnimationFrame(flush); };
    const send = (m) => alive && bc.postMessage({ ...m, from: me });
    bc.onmessage = (ev) => { const m = ev.data; if (!m || m.from === me) return;
      if (m.t === 'hello') send({ t: 'p', presence: mine });
      if (m.t === 'p') { const isNew = !others[m.from]; others[m.from] = Object.freeze({ peer: m.from, by: null, isMe: false, sameTab: false, kind: 'viewer', guest: false, presence: Object.freeze(m.presence), updatedAt: Date.now() }); (isNew ? joined : updated).push(others[m.from]); sched(); }
      if (m.t === 'bye' && others[m.from]) { left.push(others[m.from]); delete others[m.from]; sched(); } };
    send({ t: 'hello' });
    return { name, emit: async () => {}, on: () => () => {}, presence: async (patch) => { if (JSON.stringify({ ...mine, ...patch }).length > 4096) throw { code: 'invalid_argument', message: 'presence > 4 KiB' }; mine = { ...mine, ...patch }; send({ t: 'p', presence: mine }); },
      peers: snap, onPeers: (h) => { hs.add(h); joined = snap(); sched(); return () => hs.delete(h); }, connected: () => true, onConnection: (h) => { setTimeout(() => h(true)); return () => {}; },
      leave: async () => { send({ t: 'bye' }); alive = false; bc.close(); } };
  };
  const lobby = { ...mkRoom('lobby'), join: async (name) => { if (!/^[a-z0-9][a-z0-9_.-]{0,47}$/.test(name)) throw { code: 'invalid_argument', message: 'room name grammar' }; return mkRoom(name); } };
  window.claude = { use: (n) => new Promise((r) => setTimeout(() => r(n === 'room' ? lobby : null), 50)) };
})();
