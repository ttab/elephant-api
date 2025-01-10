//go:build mage
// +build mage

package main

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/magefile/mage/sh"
	"github.com/ttab/newsdoc/codegen"

	//mage:import twirp
	"github.com/ttab/mage/twirp"
)

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

	err = os.WriteFile("newsdoc/newsdoc.proto", proto.Bytes(), 0660)
	if err != nil {
		return fmt.Errorf("write protobuf file: %w", err)
	}

	tool := twirp.TwirpTools()

	err = tool("protoc",
		"--go_out=.",
		"--go_opt=paths=source_relative",
		"--proto_path", ".",
		"newsdoc/newsdoc.proto",
	)
	if err != nil {
		return fmt.Errorf("generate go code from protobuf: %w", err)
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

	err = os.WriteFile("newsdoc/conversion.go", convert.Bytes(), 0660)
	if err != nil {
		return fmt.Errorf("write conversion code file: %w", err)
	}

	return nil
}
