//go:build !windows

package main

import (
	"fmt"
	"os"
	"os/exec"
	"runtime"
)

func esconderConsole(cmd *exec.Cmd) {}

func aviso(msg string) {
	fmt.Fprintln(os.Stderr, "Estrelume:", msg)
	if runtime.GOOS == "darwin" {
		_ = exec.Command("osascript", "-e", fmt.Sprintf("display dialog %q with title \"Estrelume\" buttons {\"OK\"}", msg)).Run()
	}
}
