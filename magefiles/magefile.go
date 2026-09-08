//go:build mage
// +build mage

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/magefile/mage/sh"
	"github.com/ttab/newsdoc/codegen"

	//mage:import rpc
	"github.com/ttab/mage/rpc"
)

// newsdocProto is the protobuf declaration generated from the newsdoc module.
// It declares no service, so the rpc targets do not discover it and Newsdoc
// compiles it itself.
const newsdocProto = "newsdoc/newsdoc.proto"

func init() {
	// The services are dual stack: the /twirp/ paths are still served, so
	// the Twirp code is generated alongside the Connect code.
	rpc.Twirp = true
}

// Newsdoc regenerates the NewsDoc protobuf declaration and its conversion
// code from the newsdoc module, compiles it, and then regenerates every
// service, since they carry the NewsDoc messages in their own requests and
// responses.
func Newsdoc() error {
	var proto bytes.Buffer

	newsdocDir, err := sh.Output("go", "list", "-m",
		"-f", "{{.Dir}}",
		"github.com/ttab/newsdoc")
	if err != nil {
		return fmt.Errorf("find the newsdoc module location: %w", err)
	}

	newsdocDir = strings.TrimSpace(newsdocDir)

	err = codegen.Protobuf(
		&proto,
		"newsdoc",
		filepath.Join(newsdocDir, "doc.go"),
		map[string]string{
			"go_package": "github.com/ttab/elephant-api/newsdoc",
		})
	if err != nil {
		return fmt.Errorf("generate protobuf: %w", err)
	}

	err = os.WriteFile(newsdocProto, proto.Bytes(), 0o600)
	if err != nil {
		return fmt.Errorf("write protobuf file: %w", err)
	}

	err = generateNewsdocMessages()
	if err != nil {
		return err
	}

	var convert bytes.Buffer

	err = codegen.RPCConversion(
		&convert,
		"newsdoc",
		filepath.Join(newsdocDir, "doc.go"),
		"gofumpt")
	if err != nil {
		return fmt.Errorf("generate conversion code: %w", err)
	}

	err = os.WriteFile("newsdoc/conversion.go", convert.Bytes(), 0o600)
	if err != nil {
		return fmt.Errorf("write conversion code file: %w", err)
	}

	// A changed NewsDoc message changes the descriptors the services embed,
	// so they are regenerated from the new declaration.
	return rpc.Generate()
}

// generateNewsdocMessages compiles newsdoc/newsdoc.proto to Go.
//
// The rpc targets generate for the directories that hold a service.proto, and
// newsdoc declares only messages, so it is compiled here instead. The compiler
// and the plugin are the ones ttab/mage pins, run the way it runs them: as
// "go run <module>@<version>", with nothing installed and nothing taken off
// PATH.
func generateNewsdocMessages() error {
	template := map[string]any{
		"version": "v2",
		"plugins": []map[string]any{
			{
				"local": []string{
					"go", "run",
					"google.golang.org/protobuf/cmd/protoc-gen-go@" +
						rpc.ProtocGenGoVersion,
				},
				"out": ".",
				"opt": []string{"paths=source_relative"},
			},
		},
	}

	data, err := json.Marshal(template)
	if err != nil {
		return fmt.Errorf("marshal the buf template: %w", err)
	}

	err = sh.RunV("go", "run",
		"github.com/bufbuild/buf/cmd/buf@"+rpc.BufVersion,
		"generate", "--template", string(data),
		"--path", newsdocProto)
	if err != nil {
		return fmt.Errorf("compile %s: %w", newsdocProto, err)
	}

	return nil
}
