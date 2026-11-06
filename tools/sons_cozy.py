# Gera os efeitos sonoros "cozy" do Estrelume (v28): kalimba, marimba, sininhos de vidro, caixinha de música,
# bolhas, toques de madeira, sopros de ar e "puf" macios, todos com um pouco de reverb de quarto.
# Substituem os sons de 8 bits (pacote Ninja Adventure) com os mesmos nomes, então o jogo não muda nada na lógica.
# Sons feitos aqui são do projeto (CC0). Uso: python3 tools/sons_cozy.py [pasta_saida]   (precisa de numpy, scipy e ffmpeg)
import os, sys, subprocess, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'game', 'assets', 'sfx')
R = np.random.default_rng(7)

def t_(d): return np.arange(int(SR * d)) / SR
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def lp(x, f, o=2): return sosfilt(butter(o, min(f, SR * 0.45), 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, a, b, o=2): return sosfilt(butter(o, [a, min(b, SR * 0.45)], 'band', fs=SR, output='sos'), x)
def pad(x, d): y = np.zeros(int(SR * d)); y[:min(len(x), len(y))] = x[:len(y)]; return y
def mix(parts, d):
    """parts: lista de (atraso_s, sinal, ganho)"""
    y = np.zeros(int(SR * d))
    for at, s, g in parts:
        i = int(SR * at); n = min(len(s), len(y) - i)
        if n > 0: y[i:i + n] += s[:n] * g
    return y
def attack(n, a):
    e = np.ones(n); k = max(1, int(SR * a)); e[:k] = 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, k)); return e
def soft_end(x, frac=0.35):
    """toda nota termina em zero (sem isso, o corte no fim vira um estalo no meio do som)"""
    k = max(1, int(len(x) * frac)); x = x.copy(); x[-k:] *= np.cos(np.linspace(0, np.pi / 2, k)) ** 2; return x
def fade_end(x, d=0.04):
    k = min(len(x), int(SR * d)); x[-k:] *= np.linspace(1, 0, k) ** 2; return x

# reverb de quarto: ruído com decaimento exponencial e cauda mais escura
def room(d=0.9, dark=3500, pre=0.012):
    t = t_(d); ir = R.standard_normal(len(t)) * np.exp(-t / (d / 5.5)); ir = lp(ir, dark); ir[:int(SR * pre)] = 0; ir[0] = 0
    return ir / np.sqrt(np.sum(ir ** 2))
ROOM = {'s': room(0.5, 4200), 'm': room(0.9, 3500), 'l': room(1.8, 2800)}
def verb(x, wet=0.25, kind='m'):
    w = fftconvolve(x, ROOM[kind])[:len(x) + len(ROOM[kind])]
    y = np.zeros(len(w)); y[:len(x)] += x * (1 - wet * 0.5); y += w * wet * 0.6
    return y

# ---------- instrumentos ----------
def kalimba(f, d=1.0, v=1.0, bright=1.0):
    t = t_(d); fb = f * (1 + 0.004 * np.exp(-t / 0.01))  # leve "boing" no ataque
    ph = 2 * np.pi * np.cumsum(fb) / SR
    s = np.sin(ph) * np.exp(-t / (0.32 * d + 0.08))
    s += 0.10 * bright * np.sin(ph * 5.92) * np.exp(-t / 0.05)
    s += 0.035 * bright * np.sin(ph * 2.0) * np.exp(-t / 0.15)
    tick = lp(R.standard_normal(len(t)), 2400) * np.exp(-t / 0.003) * 0.05 * bright
    return soft_end((s + tick) * attack(len(t), 0.002) * v)

def marimba(f, d=0.6, v=1.0):
    t = t_(d); ph = 2 * np.pi * f * t
    s = np.sin(ph) * np.exp(-t / 0.22) + 0.22 * np.sin(ph * 4.0) * np.exp(-t / 0.05) + 0.05 * np.sin(ph * 9.9) * np.exp(-t / 0.02)
    mallet = lp(R.standard_normal(len(t)), 1200) * np.exp(-t / 0.004) * 0.10
    return soft_end((s + mallet) * attack(len(t), 0.0015) * v)

def glass(f, d=1.4, v=1.0):
    t = t_(d); s = np.zeros(len(t))
    for r, a, tau in [(1, 1.0, 0.45), (2.0, 0.22, 0.25), (2.76, 0.18, 0.18), (5.4, 0.06, 0.08), (8.93, 0.025, 0.05)]:
        s += a * np.sin(2 * np.pi * f * r * t + R.uniform(0, 6)) * np.exp(-t / (tau * d))
    return soft_end(lp(s * attack(len(t), 0.003), 7500) * v)

def musicbox(f, d=1.2, v=1.0):
    t = t_(d); ph = 2 * np.pi * f * t
    s = np.sin(ph) * np.exp(-t / 0.42) + 0.12 * np.sin(ph * 3.0) * np.exp(-t / 0.12) + 0.04 * np.sin(ph * 6.1) * np.exp(-t / 0.05)
    return soft_end(lp(s * attack(len(t), 0.0015), 8000) * v)

def bubble(f0=650, d=0.16, v=1.0, rise=0.9):
    t = t_(d); f = f0 * (1 + rise * (1 - np.exp(-t / 0.018)))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.035)
    return soft_end(s * attack(len(t), 0.0015) * v)

def wood(f=900, d=0.12, v=1.0):
    t = t_(d); s = np.zeros(len(t))
    for r, a, tau in [(1, 1.0, 0.035), (2.31, 0.45, 0.02), (3.9, 0.2, 0.012)]:
        s += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / tau)
    s += lp(R.standard_normal(len(t)), 3000) * np.exp(-t / 0.002) * 0.15
    return soft_end(s * attack(len(t), 0.0008) * v)

def pink(n):
    X = np.fft.rfft(R.standard_normal(n)); fr = np.fft.rfftfreq(n, 1 / SR); X[1:] /= np.sqrt(fr[1:]); X[0] = 0
    y = np.fft.irfft(X, n); return y / (np.max(np.abs(y)) + 1e-9)

def sweep(x, fc, kind='bp'):
    """filtro que varre fc(t) sem estalos: mistura bandas fixas, interpolando em escala log"""
    bands = np.geomspace(120, 6000, 14); outs = []
    for f in bands: outs.append(bp(x, f * 0.62, f * 1.6) if kind == 'bp' else lp(x, f))
    outs = np.array(outs); lf = np.log(np.clip(fc, bands[0], bands[-1])); lb = np.log(bands)
    j = np.clip(np.searchsorted(lb, lf) - 1, 0, len(bands) - 2); w = (lf - lb[j]) / (lb[j + 1] - lb[j]); idx = np.arange(len(x))
    return outs[j, idx] * (1 - w) + outs[j + 1, idx] * w

def whoosh(d=0.24, f0=500, f1=1400, f2=600, v=1.0, peak=0.4):
    n = int(SR * d); k = np.linspace(0, 1, n)
    fc = np.where(k < peak, f0 + (f1 - f0) * k / peak, f1 + (f2 - f1) * (k - peak) / (1 - peak))
    env = np.where(k < peak, np.sin(k / peak * np.pi / 2) ** 2, np.clip(np.cos((k - peak) / (1 - peak) * np.pi / 2), 0, 1) ** 1.5)
    return sweep(pink(n), fc) * env * v

def thump(f0=120, f1=50, d=0.3, v=1.0):
    t = t_(d); f = f1 + (f0 - f1) * np.exp(-t / 0.05)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.09)
    s += lp(R.standard_normal(len(t)), 500) * np.exp(-t / 0.03) * 0.5
    return soft_end(s * attack(len(t), 0.002) * v)

def puff(d=0.4, c0=2200, c1=280, v=1.0):
    n = int(SR * d); t = t_(d); fc = c1 + (c0 - c1) * np.exp(-t / d * 5)
    return sweep(pink(n), fc, 'lp') * np.exp(-t / (d / 4)) * attack(n, 0.004) * v

def crackle(d=0.4, rate=60, v=1.0):
    n = int(SR * d); y = np.zeros(n)
    for _ in range(int(rate * d)):
        i = R.integers(0, n - 400); y[i:i + 300] += bp(R.standard_normal(300), 1500, 5000) * np.exp(-np.arange(300) / 40) * R.uniform(0.2, 1)
    return y * np.exp(-t_(d) / (d / 2)) * v

def hum(f=240, d=0.14, vowel=(450, 900), v=1.0, bend=1.08):
    t = t_(d); ff = f * (1 + (bend - 1) * np.sin(np.pi * t / d)) * (1 + 0.01 * np.sin(2 * np.pi * 6 * t))
    ph = np.cumsum(ff) / SR; src = sum(np.sin(2 * np.pi * k * ph) / k for k in range(1, 14))
    y = bp(src, vowel[0] * 0.7, vowel[0] * 1.4) + 0.6 * bp(src, vowel[1] * 0.75, vowel[1] * 1.3)
    env = np.sin(np.linspace(0, np.pi, len(t))) ** 1.3
    return lp(y * env, 2600) * v

PENTA = [0, 2, 4, 7, 9]
def penta(base, i): return base + PENTA[i % 5] + 12 * (i // 5)

# ---------- receitas ----------
S = {}
S['accept'] = verb(mix([(0, kalimba(midi(76), 0.7), 0.8), (0.075, kalimba(midi(81), 0.9), 1.0)], 1.0), 0.28)
S['cancel'] = verb(mix([(0, marimba(midi(67), 0.4), 0.9), (0.08, marimba(midi(62), 0.5), 0.8)], 0.7), 0.22)
S['switch'] = verb(wood(1700, 0.06, 1.0), 0.15, 's')
S['hover'] = verb(wood(2300, 0.04, 0.6), 0.12, 's')
S['menu'] = verb(mix([(0, whoosh(0.2, 350, 900, 400, 0.5, 0.35), 1), (0.05, kalimba(midi(72), 1.0, 0.6, 0.5), 0.8)], 1.1), 0.3)
S['menu2'] = verb(mix([(0, whoosh(0.18, 300, 800, 350, 0.45, 0.35), 1), (0.05, kalimba(midi(67), 1.0, 0.6, 0.5), 0.8)], 1.1), 0.3)
S['pick'] = verb(mix([(0, bubble(620, 0.14), 0.8), (0.04, kalimba(midi(79), 0.6, 0.6), 0.9)], 0.75), 0.22)
S['pop'] = verb(bubble(560, 0.16), 0.18, 's')
for i, f in enumerate([480, 640, 760]): S[f'pop_c_{i + 1}'] = verb(bubble(f, 0.15, 1, 0.7 + 0.15 * i), 0.18, 's')
S['coin'] = verb(mix([(0, glass(midi(88), 0.5), 0.6), (0.06, glass(midi(95), 0.6), 0.7)], 0.8), 0.25)
S['gold'] = verb(mix([(0.0, glass(midi(84), 0.6), 0.5), (0.05, glass(midi(88), 0.6), 0.55), (0.1, glass(midi(91), 0.7), 0.6), (0.15, glass(midi(96), 0.9), 0.65)], 1.2), 0.3)
S['quest'] = verb(mix([(i * 0.09, kalimba(midi(n), 1.1), 0.8) for i, n in enumerate([72, 76, 79, 84])] + [(0.36, glass(midi(96), 1.6), 0.35)], 2.0), 0.32, 'l')
S['success'] = verb(mix([(0, kalimba(midi(79), 0.9), 0.8), (0.09, kalimba(midi(84), 1.1), 0.9), (0.18, glass(midi(91), 1.2), 0.3)], 1.5), 0.3, 'l')
S['secret'] = verb(mix([(i * 0.075, musicbox(midi(n), 1.2), 0.7) for i, n in enumerate([74, 78, 81, 86, 90, 93])], 2.0), 0.4, 'l')
S['newthing'] = verb(mix([(i * 0.11, musicbox(midi(n), 1.3), 0.75) for i, n in enumerate([79, 83, 86, 91])] + [(0.44, glass(midi(98), 1.5), 0.3)], 2.2), 0.38, 'l')
S['alert'] = verb(mix([(0, glass(midi(81), 1.0), 0.8), (0.16, glass(midi(76), 1.2), 0.75)], 1.5), 0.3)
S['bonus'] = verb(mix([(i * 0.05, kalimba(midi(penta(72, i)), 0.6), 0.7) for i in range(6)], 1.1), 0.3)
def sparkle(n=7, span=0.3, base=84, d=1.6, seed=0):
    rg = np.random.default_rng(seed); parts = [(rg.uniform(0, span), glass(midi(penta(base, int(rg.integers(0, 8)))), 0.8), rg.uniform(0.25, 0.5)) for _ in range(n)]
    return mix(parts, d)
S['magic'] = verb(sparkle(6, 0.22, 84, 1.2, 1) + 0.3 * pad(whoosh(0.3, 600, 1500, 900, 0.6), 1.2), 0.45, 'l')
S['magic2'] = verb(sparkle(6, 0.25, 81, 1.2, 2) + 0.3 * pad(whoosh(0.3, 500, 1300, 800, 0.6), 1.2), 0.45, 'l')
S['magic3'] = verb(mix([(i * 0.12, glass(midi(penta(72, i)), 1.0), 0.35 + i * 0.02) for i in range(14)], 2.6) + 0.25 * pad(whoosh(1.2, 300, 1200, 700, 0.6, 0.6), 2.6), 0.45, 'l')
S['powerup'] = verb(mix([(i * 0.035, kalimba(midi(penta(72, i)), 0.7, 0.6), 0.55 + i * 0.03) for i in range(10)], 1.4), 0.35, 'l')
S['powerup2'] = verb(mix([(i * 0.035, kalimba(midi(penta(67, i)), 0.7, 0.6), 0.55 + i * 0.03) for i in range(10)], 1.4), 0.35, 'l')
S['spirit'] = verb(pad(whoosh(0.8, 250, 900, 500, 0.5, 0.5), 1.0) * 0.6 + mix([(0.1, glass(midi(79), 1.0), 0.25), (0.2, glass(midi(86), 1.0), 0.2)], 1.0), 0.45, 'l')
S['fx'] = verb(mix([(0, whoosh(0.22, 500, 1500, 700, 0.6), 0.8), (0.06, glass(midi(91), 0.6), 0.3), (0.11, glass(midi(96), 0.6), 0.25)], 0.9), 0.3)
S['swing'] = verb(whoosh(0.22, 450, 1300, 500, 0.9, 0.35), 0.12, 's')
S['sword'] = verb(whoosh(0.18, 700, 2000, 800, 0.8, 0.3), 0.12, 's')
S['hit'] = verb(mix([(0, thump(160, 70, 0.22, 0.9), 1), (0.003, wood(520, 0.08, 0.35), 1)], 0.35), 0.12, 's')
S['hit2'] = verb(mix([(0, thump(130, 60, 0.25, 0.9), 1), (0.003, wood(430, 0.09, 0.3), 1)], 0.38), 0.12, 's')
S['impact'] = verb(mix([(0, thump(110, 45, 0.3, 1.0), 1), (0, puff(0.2, 900, 200, 0.35), 1)], 0.45), 0.15, 's')
S['hurt'] = verb(mix([(0, marimba(midi(55), 0.35, 0.6), 1), (0, thump(140, 60, 0.2, 0.6), 1), (0.07, marimba(midi(50), 0.4, 0.5), 1)], 0.6), 0.18)
S['kill'] = verb(mix([(0, puff(0.35, 1800, 250, 0.9), 1), (0.05, glass(midi(88), 0.6), 0.25), (0.1, glass(midi(93), 0.6), 0.2)], 0.9), 0.3)
S['boom'] = verb(mix([(0, thump(95, 38, 0.5, 1.0), 1), (0, puff(0.6, 1400, 160, 0.8), 1), (0.03, crackle(0.4, 30, 0.12), 1)], 0.8), 0.25)
S['fireball'] = verb(mix([(0, whoosh(0.35, 300, 1100, 400, 0.8, 0.3), 1), (0.02, crackle(0.35, 70, 0.25), 1)], 0.5), 0.2, 's')
def hop(f0, f1, d=0.12, v=1.0):
    t = t_(d); f = f0 + (f1 - f0) * (1 - np.exp(-t / 0.03)); return soft_end(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.045) * attack(len(t), 0.003) * v)
S['jump'] = verb(mix([(0, hop(260, 520, 0.14), 0.8), (0, puff(0.12, 1200, 300, 0.25), 1)], 0.3), 0.15, 's')
S['voice'] = verb(hum(250, 0.13, (500, 1000), 1.0, 1.10), 0.15, 's')
S['voice2'] = verb(hum(290, 0.12, (650, 1150), 1.0, 1.06), 0.15, 's')
# vinhetas
S['jingle_a'] = verb(mix([(t, kalimba(midi(n), 1.0), g) for t, n, g in [(0, 72, .8), (0.11, 76, .8), (0.22, 79, .85), (0.38, 81, .75), (0.5, 79, .7), (0.66, 84, 1.0)]] + [(0.66, glass(midi(96), 1.6), 0.25), (0, marimba(midi(48), 0.6), 0.35), (0.66, marimba(midi(48), 0.8), 0.35)], 2.0), 0.32, 'l')
S['jingle_4'] = verb(mix([(t, kalimba(midi(n), 0.9), 0.8) for t, n in [(0, 79), (0.1, 76), (0.2, 79), (0.32, 84)]] + [(0.32, glass(midi(91), 1.2), 0.25)], 1.4), 0.3, 'l')
S['jingle_5'] = verb(mix([(t, kalimba(midi(n), 1.1), g) for t, n, g in [(0, 72, .7), (0.1, 76, .7), (0.2, 79, .75), (0.3, 84, .8), (0.46, 88, .9), (0.62, 91, .7)]] + [(0.62, glass(midi(96), 1.8), 0.3), (0, marimba(midi(36), 0.8), 0.45), (0.3, marimba(midi(43), 0.8), 0.4), (0.62, marimba(midi(48), 1.0), 0.45)], 2.4), 0.35, 'l')
S['fanfare'] = verb(mix([(i * 0.03, marimba(midi(n), 0.6), 0.55) for i, n in enumerate([55, 60, 64])] + [(0.32 + i * 0.03, marimba(midi(n), 0.9), 0.6) for i, n in enumerate([60, 64, 67, 72])] + [(0.32, kalimba(midi(84), 1.4), 0.6), (0.45, glass(midi(91), 1.6), 0.3)], 2.2), 0.35, 'l')

# ---------- v30: escolher no criador e expressões dos moradores ----------
S['sel_color'] = verb(mix([(0, bubble(700, 0.14, 1, 0.6), 0.9), (0.015, glass(midi(91), 0.35), 0.18)], 0.5), 0.2, 's')        # gotinha (o jogo muda a altura pela cor)
S['sel_hair'] = verb(mix([(0, whoosh(0.16, 900, 2600, 1200, 0.5, 0.3), 0.7), (0.07, bubble(820, 0.1, 1, 0.5), 0.55)], 0.45), 0.18, 's')  # escovinha + plim
def rustle(d=0.22, v=1.0):
    n = int(SR * d); x = bp(pink(n), 900, 4200); t = t_(d); am = 0.55 + 0.45 * np.sin(2 * np.pi * 23 * t + 3 * np.sin(2 * np.pi * 7 * t)); return x * am * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.5 * v
S['sel_cloth'] = verb(mix([(0, rustle(0.24), 0.7), (0.09, marimba(midi(72), 0.3, 0.35), 1)], 0.5), 0.18, 's')                      # tecido + toquinho
S['sel_face'] = verb(mix([(0, glass(midi(93), 0.5), 0.35), (0.06, glass(midi(98), 0.6), 0.3)], 0.8), 0.3)                          # brilhinho
S['sel_pop'] = verb(mix([(0, bubble(520, 0.13, 1, 0.8), 0.9), (0.02, wood(1300, 0.04, 0.25), 1)], 0.4), 0.15, 's')
S['emo_feliz'] = verb(mix([(0, hum(330, 0.09, (520, 1100), 0.8, 1.12), 1), (0.11, hum(390, 0.11, (560, 1200), 0.8, 1.15), 1), (0.12, kalimba(midi(84), 0.5, 0.4), 0.5)], 0.7), 0.2, 's')
S['emo_amor'] = verb(mix([(i * 0.09, glass(midi(n), 0.7), 0.35) for i, n in enumerate([84, 88, 91])] + [(0, hum(300, 0.16, (480, 950), 0.6, 1.05), 0.7)], 1.1), 0.3)
S['emo_surpresa'] = verb(mix([(0, bubble(500, 0.12, 1, 1.4), 0.8), (0.02, hum(360, 0.1, (700, 1250), 0.8, 1.35), 1)], 0.45), 0.15, 's')
S['emo_hmm'] = verb(hum(230, 0.34, (430, 850), 0.8, 0.93), 0.18, 's')
S['emo_sono'] = verb(mix([(0, whoosh(0.7, 250, 600, 300, 0.4, 0.4), 0.6), (0.1, hum(170, 0.5, (380, 750), 0.4, 0.96), 0.7)], 1.0), 0.2, 's')
S['emo_risada'] = verb(mix([(i * 0.1, hum(330 + i * 25, 0.07, (600, 1200), 0.8, 1.1), 1) for i in range(4)], 0.6), 0.15, 's')
QUIET_V30 = {'sel_color': 0.7, 'sel_hair': 0.7, 'sel_cloth': 0.7, 'sel_face': 0.6, 'sel_pop': 0.65, 'emo_hmm': 0.55, 'emo_sono': 0.5}

# ---------- saída ----------
# alvo de volume: ticks de interface mais baixinhos; vinhetas e efeitos com um pouco mais de presença
QUIET = {**QUIET_V30, 'switch': 0.32, 'hover': 0.22, 'voice': 0.4, 'voice2': 0.4, 'pop': 0.5, 'pop_c_1': 0.5, 'pop_c_2': 0.5, 'pop_c_3': 0.5}
os.makedirs(OUT, exist_ok=True)
for k, x in S.items():
    x = hp(x, 35); x = fade_end(x.copy(), 0.06); pk = np.max(np.abs(x)) + 1e-9
    x = x / pk * 0.89 * QUIET.get(k, 0.85)
    # corta o silêncio do fim da cauda (abaixo de -58 dB do pico) com um fade curto
    loud = np.nonzero(np.abs(x) > np.max(np.abs(x)) * 10 ** (-58 / 20))[0]; end = min(len(x), (loud[-1] if len(loud) else len(x)) + int(SR * 0.03))
    x = fade_end(x[:end].copy(), 0.08)
    wav =(np.clip(x, -1, 1) * 32767).astype('<i2').tobytes()
    p = subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libvorbis', '-q:a', '4', os.path.join(OUT, k + '.ogg')], input=wav)
    if p.returncode: sys.exit('ffmpeg falhou em ' + k)
print(len(S), 'sons em', os.path.abspath(OUT))
