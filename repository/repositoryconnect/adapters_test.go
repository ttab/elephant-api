package repositoryconnect_test

import (
	"net/http"
	"testing"

	"connectrpc.com/connect"
	"github.com/ttab/elephant-api/repository"
	"github.com/ttab/elephant-api/repository/repositoryconnect"
)

// The Connect clients are drop-in replacements for the Twirp ones, so each
// one implements the plain service interface. A regeneration that renames or
// drops an adapter fails to compile here.
var (
	_ repository.Documents = repositoryconnect.NewDocumentsServiceClient(nil, "")
	_ repository.Schemas   = repositoryconnect.NewSchemasServiceClient(nil, "")
	_ repository.Workflows = repositoryconnect.NewWorkflowsServiceClient(nil, "")
	_ repository.Metrics   = repositoryconnect.NewMetricsServiceClient(nil, "")
)

// The handler adapters take the plain implementation and return the mount
// path together with the handler, which is the pair the API server registers.
var (
	_ func(repository.Documents, ...connect.HandlerOption) (string, http.Handler) = repositoryconnect.NewDocumentsServiceHandler
	_ func(repository.Schemas, ...connect.HandlerOption) (string, http.Handler)   = repositoryconnect.NewSchemasServiceHandler
	_ func(repository.Workflows, ...connect.HandlerOption) (string, http.Handler) = repositoryconnect.NewWorkflowsServiceHandler
	_ func(repository.Metrics, ...connect.HandlerOption) (string, http.Handler)   = repositoryconnect.NewMetricsServiceHandler
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
			Service: repositoryconnect.DocumentsName,
			Handler: func() (string, http.Handler) {
				return repositoryconnect.NewDocumentsServiceHandler(nil)
			},
		},
		{
			Service: repositoryconnect.SchemasName,
			Handler: func() (string, http.Handler) {
				return repositoryconnect.NewSchemasServiceHandler(nil)
			},
		},
		{
			Service: repositoryconnect.WorkflowsName,
			Handler: func() (string, http.Handler) {
				return repositoryconnect.NewWorkflowsServiceHandler(nil)
			},
		},
		{
			Service: repositoryconnect.MetricsName,
			Handler: func() (string, http.Handler) {
				return repositoryconnect.NewMetricsServiceHandler(nil)
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
