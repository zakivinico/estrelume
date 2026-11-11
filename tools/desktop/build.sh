#!/usr/bin/env bash
# Gera os downloads da versão para PC em game/baixar/ (roda no workflow do Pages; os binários não vão para o git).
#   Estrelume-Windows.zip   Estrelume.exe (amd64, sem console, com ícone)
#   Estrelume-macOS.zip     Estrelume.app (arm64 + amd64; o script escolhe pelo chip)
#   Estrelume-Linux.tar.gz  estrelume (amd64) + atalho .desktop
set -euo pipefail
cd "$(dirname "$0")"
RAIZ=$(cd ../.. && pwd); SAIDA="$RAIZ/game/baixar"; TMP=$(mktemp -d)
rm -rf jogo && mkdir jogo && cp -r "$RAIZ/game/." jogo/ && rm -rf jogo/baixar jogo/sw.js
VERSAO=$(grep -o 'Estrelume · v[0-9.]*' "$RAIZ/template.html" | head -1 | sed 's/.*v//')
export CGO_ENABLED=0
FL=(-trimpath -ldflags "-s -w -X main.versao=$VERSAO")
go run github.com/akavel/rsrc@v0.10.2 -ico icone.ico -arch amd64 -o rsrc_windows_amd64.syso
mkdir -p "$TMP/win/Estrelume" "$TMP/mac/Estrelume.app/Contents/MacOS" "$TMP/mac/Estrelume.app/Contents/Resources" "$TMP/linux/Estrelume"
GOOS=windows GOARCH=amd64 go build -trimpath -ldflags "-s -w -H=windowsgui -X main.versao=$VERSAO" -o "$TMP/win/Estrelume/Estrelume.exe" .
GOOS=darwin GOARCH=arm64 go build "${FL[@]}" -o "$TMP/mac/Estrelume.app/Contents/MacOS/estrelume-arm64" .
GOOS=darwin GOARCH=amd64 go build "${FL[@]}" -o "$TMP/mac/Estrelume.app/Contents/MacOS/estrelume-amd64" .
GOOS=linux GOARCH=amd64 go build "${FL[@]}" -o "$TMP/linux/Estrelume/estrelume" .
rm -f rsrc_windows_amd64.syso
# macOS: pacote .app com um script que escolhe o binário do chip
cat > "$TMP/mac/Estrelume.app/Contents/MacOS/Estrelume" <<'SH'
#!/bin/sh
D="$(cd "$(dirname "$0")" && pwd)"
if [ "$(uname -m)" = "arm64" ]; then exec "$D/estrelume-arm64"; else exec "$D/estrelume-amd64"; fi
SH
cp icone.icns "$TMP/mac/Estrelume.app/Contents/Resources/icone.icns"
cat > "$TMP/mac/Estrelume.app/Contents/Info.plist" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>CFBundleName</key><string>Estrelume</string><key>CFBundleDisplayName</key><string>Estrelume</string>
<key>CFBundleIdentifier</key><string>io.github.estrelume</string><key>CFBundleVersion</key><string>$VERSAO</string><key>CFBundleShortVersionString</key><string>$VERSAO</string>
<key>CFBundleExecutable</key><string>Estrelume</string><key>CFBundleIconFile</key><string>icone</string><key>CFBundlePackageType</key><string>APPL</string>
<key>LSMinimumSystemVersion</key><string>11.0</string><key>NSHighResolutionCapable</key><true/>
</dict></plist>
PL
chmod +x "$TMP/mac/Estrelume.app/Contents/MacOS/"*
cp icone.png "$TMP/linux/Estrelume/icone.png"
cat > "$TMP/linux/Estrelume/estrelume.desktop" <<'DT'
[Desktop Entry]
Type=Application
Name=Estrelume
Comment=Jogo cozy em 3D
Exec=sh -c 'cd "$(dirname "%k")" && ./estrelume'
Icon=icone
Terminal=false
Categories=Game;
DT
cp LEIA-ME-windows.txt "$TMP/win/Estrelume/LEIA-ME.txt"; cp LEIA-ME-mac.txt "$TMP/mac/LEIA-ME.txt"; cp LEIA-ME-linux.txt "$TMP/linux/Estrelume/LEIA-ME.txt"
mkdir -p "$SAIDA"; rm -f "$SAIDA"/Estrelume-*
(cd "$TMP/win" && zip -qr -9 "$SAIDA/Estrelume-Windows.zip" Estrelume)
(cd "$TMP/mac" && zip -qry -9 "$SAIDA/Estrelume-macOS.zip" Estrelume.app LEIA-ME.txt)
(cd "$TMP/linux" && tar -czf "$SAIDA/Estrelume-Linux.tar.gz" Estrelume)
rm -rf "$TMP" jogo
ls -la "$SAIDA"
