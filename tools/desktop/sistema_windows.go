package main

import (
	"os/exec"
	"syscall"
	"unsafe"
)

// CREATE_NO_WINDOW: não abre console para o processo filho (não esconde a janela do navegador)
func esconderConsole(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{CreationFlags: 0x08000000}
}

// caixinha de aviso do Windows (o lançador não tem console)
func aviso(msg string) {
	t, _ := syscall.UTF16PtrFromString("Estrelume")
	m, _ := syscall.UTF16PtrFromString(msg)
	syscall.NewLazyDLL("user32.dll").NewProc("MessageBoxW").Call(0, uintptr(unsafe.Pointer(m)), uintptr(unsafe.Pointer(t)), 0x40)
}
