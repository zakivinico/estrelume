# Desenha o ícone do Estrelume (estrelinha com rosto) em PNG e ICO. Uso: python3 tools/desktop/icone.py
import math, os
from PIL import Image, ImageDraw
R = os.path.dirname(os.path.abspath(__file__)); G = os.path.join(R, '..', '..', 'game', 'assets', 'app')
def draw(N):
    S = N * 4; im = Image.new('RGBA', (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    # fundo: quadrado arredondado com degradê rosa → lilás → azul
    bg = Image.new('RGBA', (S, S)); bd = ImageDraw.Draw(bg)
    for y in range(S):
        t = y / S; a = (255, 183, 213); b = (201, 162, 255); c = (159, 192, 255)
        col = tuple(int(a[i] + (b[i] - a[i]) * t * 2) if t < .5 else int(b[i] + (c[i] - b[i]) * (t - .5) * 2) for i in range(3))
        bd.line([(0, y), (S, y)], fill=col + (255,))
    m = Image.new('L', (S, S), 0); ImageDraw.Draw(m).rounded_rectangle([S * .04, S * .04, S * .96, S * .96], radius=S * .22, fill=255)
    im.paste(bg, (0, 0), m)
    d.rounded_rectangle([S * .04, S * .04, S * .96, S * .96], radius=S * .22, outline=(90, 61, 104, 255), width=int(S * .035))
    # brilhos
    for (x, y, r) in [(.2, .22, .035), (.8, .2, .025), (.82, .78, .03), (.17, .74, .02)]:
        d.ellipse([S * (x - r), S * (y - r), S * (x + r), S * (y + r)], fill=(255, 255, 255, 220))
    # estrela
    cx, cy, ro, ri = S * .5, S * .54, S * .36, S * .17; pts = []
    for k in range(10):
        a = -math.pi / 2 + k * math.pi / 5; r = ro if k % 2 == 0 else ri; pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
    sh = [(x + S * .015, y + S * .03) for x, y in pts]; d.polygon(sh, fill=(90, 61, 104, 90))
    d.polygon(pts, fill=(255, 217, 106, 255)); d.line(pts + [pts[0]], fill=(90, 61, 104, 255), width=int(S * .03), joint='curve')
    hl = [(cx + (x - cx) * .55, cy - S * .04 + (y - cy) * .55) for x, y in pts]; d.polygon(hl, fill=(255, 236, 160, 255))
    # rosto
    ink = (90, 61, 104, 255)
    for ex in (-.075, .075):
        d.ellipse([cx + S * (ex - .028), cy - S * .02, cx + S * (ex + .028), cy + S * .05], fill=ink)
        d.ellipse([cx + S * (ex - .012), cy - S * .008, cx + S * (ex + .004), cy + S * .01], fill=(255, 255, 255, 255))
    for bx in (-.135, .135): d.ellipse([cx + S * (bx - .035), cy + S * .055, cx + S * (bx + .035), cy + S * .09], fill=(255, 143, 181, 200))
    d.arc([cx - S * .04, cy + S * .03, cx + S * .04, cy + S * .1], 20, 160, fill=ink, width=int(S * .018))
    return im.resize((N, N), Image.LANCZOS)
os.makedirs(G, exist_ok=True)
for n in (192, 512): draw(n).save(os.path.join(G, f'icone-{n}.png'))
big = draw(256); big.save(os.path.join(R, 'icone.ico'), sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
big.save(os.path.join(R, 'icone.png'))
print('ok')
draw(1024).save(os.path.join(R, 'icone.icns'))
print('icns ok')
