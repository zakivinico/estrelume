// Lançador do Estrelume para PC (Windows, macOS e Linux).
// Guarda o jogo inteiro dentro do executável (pasta jogo/, copiada de game/ pelo build.sh), serve em
// http://127.0.0.1:38533 e abre numa janela própria do Edge, Chrome, Chromium ou Brave (modo --app),
// com um perfil só do Estrelume. A porta é sempre a mesma para o save (localStorage) continuar lá.
// Sem nenhum desses navegadores, abre no navegador padrão e fecha sozinho quando a aba some
// (a página manda um sinal para /__vivo a cada 5 s quando abre com ?pc=1).
package main

import (
	"embed"
	"io/fs"
	"mime"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sync/atomic"
	"time"
)

//go:embed all:jogo
var jogo embed.FS

const endereco = "127.0.0.1:38533"

var versao = "dev"

func main() {
	for ext, tipo := range map[string]string{".js": "text/javascript; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".ogg": "audio/ogg", ".wav": "audio/wav", ".mp3": "audio/mpeg", ".glb": "model/gltf-binary", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8"} {
		_ = mime.AddExtensionType(ext, tipo)
	}
	sub, err := fs.Sub(jogo, "jogo")
	if err != nil {
		aviso("Os arquivos do jogo não estão dentro do lançador.")
		os.Exit(1)
	}
	url := "http://" + endereco + "/?pc=1"
	ln, err := net.Listen("tcp", endereco)
	if err != nil {
		// a porta já está em uso: se for outro Estrelume aberto, só abre mais uma janela dele
		if r, e := http.Get("http://" + endereco + "/__estrelume"); e == nil {
			r.Body.Close()
			if r.StatusCode == 200 {
				if j := abrirJanela(url); j == nil {
					abrirPadrao(url)
				}
				return
			}
		}
		// outro programa usa a porta: usa uma livre (o save fica separado desta vez)
		if ln, err = net.Listen("tcp", "127.0.0.1:0"); err != nil {
			aviso("Não consegui abrir o servidor local do jogo: " + err.Error())
			os.Exit(1)
		}
		url = "http://" + ln.Addr().String() + "/?pc=1"
	}
	var vivo atomic.Int64
	vivo.Store(time.Now().Unix())
	arquivos := http.FileServer(http.FS(sub))
	mux := http.NewServeMux()
	mux.HandleFunc("/__estrelume", func(w http.ResponseWriter, r *http.Request) { _, _ = w.Write([]byte("ok")) })
	mux.HandleFunc("/__vivo", func(w http.ResponseWriter, r *http.Request) {
		vivo.Store(time.Now().Unix())
		w.WriteHeader(http.StatusNoContent)
	})
	mux.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		arquivos.ServeHTTP(w, r)
	}))
	go func() { _ = http.Serve(ln, mux) }()

	if j := abrirJanela(url); j != nil {
		_ = j.Wait()
		// alguns navegadores devolvem o controle na hora (repassam para um processo que já existia):
		// nesse caso, segue servindo enquanto a página der sinal de vida
		if time.Since(time.Unix(vivo.Load(), 0)) > 3*time.Second {
			return
		}
	} else {
		abrirPadrao(url)
	}
	esperarSinais(&vivo)
}

// fica no ar enquanto a página mandar sinais; sem sinal por 45 s, encerra
func esperarSinais(vivo *atomic.Int64) {
	time.Sleep(60 * time.Second)
	for {
		time.Sleep(5 * time.Second)
		if time.Since(time.Unix(vivo.Load(), 0)) > 45*time.Second {
			return
		}
	}
}

func perfil() string {
	base, err := os.UserConfigDir()
	if err != nil || base == "" {
		base = os.TempDir()
	}
	d := filepath.Join(base, "Estrelume", "janela")
	_ = os.MkdirAll(d, 0o755)
	return d
}

func navegadores() []string {
	var c []string
	switch runtime.GOOS {
	case "windows":
		for _, v := range []string{"ProgramFiles(x86)", "ProgramFiles", "LocalAppData"} {
			b := os.Getenv(v)
			if b == "" {
				continue
			}
			c = append(c,
				filepath.Join(b, `Microsoft\Edge\Application\msedge.exe`),
				filepath.Join(b, `Google\Chrome\Application\chrome.exe`),
				filepath.Join(b, `BraveSoftware\Brave-Browser\Application\brave.exe`),
				filepath.Join(b, `Chromium\Application\chrome.exe`))
		}
	case "darwin":
		casa, _ := os.UserHomeDir()
		for _, raiz := range []string{"/Applications", filepath.Join(casa, "Applications")} {
			c = append(c,
				filepath.Join(raiz, "Google Chrome.app/Contents/MacOS/Google Chrome"),
				filepath.Join(raiz, "Microsoft Edge.app/Contents/MacOS/Microsoft Edge"),
				filepath.Join(raiz, "Chromium.app/Contents/MacOS/Chromium"),
				filepath.Join(raiz, "Brave Browser.app/Contents/MacOS/Brave Browser"))
		}
	default:
		for _, n := range []string{"google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "microsoft-edge", "microsoft-edge-stable", "brave-browser"} {
			if p, err := exec.LookPath(n); err == nil {
				c = append(c, p)
			}
		}
	}
	return c
}

func abrirJanela(url string) *exec.Cmd {
	for _, nav := range navegadores() {
		if st, err := os.Stat(nav); err != nil || st.IsDir() {
			continue
		}
		cmd := exec.Command(nav, "--app="+url, "--user-data-dir="+perfil(), "--no-first-run", "--no-default-browser-check",
			"--window-size=1280,800", "--autoplay-policy=no-user-gesture-required", "--disable-features=Translate")
		esconderConsole(cmd)
		if cmd.Start() == nil {
			return cmd
		}
	}
	return nil
}

func abrirPadrao(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	esconderConsole(cmd)
	if cmd.Start() != nil {
		aviso("Abra no navegador: " + url)
	}
}
