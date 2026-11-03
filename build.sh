set -e
cd /home/claude/v3d
npx esbuild src/main.js --bundle --minify --format=iife --outfile=game/bundle.js --log-level=warning
python3 - <<'PY'
t=open('template.html',encoding='utf-8').read()
open('game/index.html','w',encoding='utf-8').write(t.replace('<script>/*GAME*/</script>','<script src="bundle.js"></script>'))
PY
ls -la game/bundle.js game/index.html
