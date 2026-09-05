package spellconnect_test

import (
	"net/http"
	"testing"

	"connectrpc.com/connect"
	"github.com/ttab/elephant-api/spell"
	"github.com/ttab/elephant-api/spell/spellconnect"
)

// The Connect clients are drop-in replacements for the Twirp ones, so each
// one implements the plain service interface. A regeneration that renames or
// drops an adapter fails to compile here.
var (
	_ spell.Check        = spellconnect.NewCheckServiceClient(nil, "")
	_ spell.Dictionaries = spellconnect.NewDictionariesServiceClient(nil, "")
	_ spell.Rules        = spellconnect.NewRulesServiceClient(nil, "")
)

// The handler adapters take the plain implementation and return the mount
// path together with the handler, which is the pair the API server registers.
var (
	_ func(spell.Check, ...connect.HandlerOption) (string, http.Handler)        = spellconnect.NewCheckServiceHandler
	_ func(spell.Dictionaries, ...connect.HandlerOption) (string, http.Handler) = spellconnect.NewDictionariesServiceHandler
	_ func(spell.Rules, ...connect.HandlerOption) (string, http.Handler)        = spellconnect.NewRulesServiceHandler
)

// TestHandlerPaths pins the Connect mount paths. They carry no "/twirp"
// prefix, so the two protocols coexist on one server, and an ingress rule
// written against them is only correct for as long as this holds.
func TestHandlerPaths(t *testing.T) {
	cases := []struct {
		Service string
		Handler func() (string, http.Handler)
	}{
		{
			Service: spellconnect.CheckName,
			Handler: func() (string, http.Handler) {
				return spellconnect.NewCheckServiceHandler(nil)
			},
		},
		{
			Service: spellconnect.DictionariesName,
			Handler: func() (string, http.Handler) {
				return spellconnect.NewDictionariesServiceHandler(nil)
			},
		},
		{
			Service: spellconnect.RulesName,
			Handler: func() (string, http.Handler) {
				return spellconnect.NewRulesServiceHandler(nil)
			},
		},
	}

	for _, c := range cases {
		t.Run(c.Service, func(t *testing.T) {
			path, handler := c.Handler()

			want := "/" + c.Service + "/"
			if path != want {
				t.Errorf("got the mount path %q, wanted %q", path, want)
			}

			if handler == nil {
				t.Error("got a nil handler")
			}
		})
	}
}
