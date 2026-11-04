import http from 'http'; import fs from 'fs'; import path from 'path';
const root = process.argv[2], port = +process.argv[3] || 8765;
const T = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.ogg': 'audio/ogg', '.md': 'text/plain', '.txt': 'text/plain' };
http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, path.normalize(p)); if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, st) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream', 'Content-Length': st.size, 'Cache-Control': 'max-age=3600' }); fs.createReadStream(f).pipe(res); }); }).listen(port);
