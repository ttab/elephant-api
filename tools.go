//go:build tools
// +build tools

package tools

import (
	_ "github.com/navigacontentlab/twopdocs"
	_ "github.com/ttab/newsdoc/cmd/newsdoc"
	_ "github.com/twitchtv/twirp/protoc-gen-twirp"
	_ "google.golang.org/protobuf/cmd/protoc-gen-go"
)
