# API declarations for the Elephant

Protobuf API declarations for the Elephant platform. Each service is defined in
a `service.proto` file and shipped with generated Go code for two protocols:
[Connect](https://connectrpc.com/), which also serves gRPC and gRPC-Web, and
[Twirp](https://github.com/twitchtv/twirp), which is what the platform served
before Connect and is still served everywhere.

## The APIs

| API | Package | Description | Declaration |
| --- | --- | --- | --- |
| **Repository** | `elephant.repository` | The core document store. Read, write, validate, lock, and delete documents; query the event log; manage statuses and workflows; configure schemas, document types, and metrics. | [proto](repository/service.proto) |
| **Repository socket** | `elephant.repositorysocket` | WebSocket protocol for live document access — authenticate a connection, fetch and subscribe to sets of documents, and receive update/removal events as they happen. | [proto](repositorysocket/service.proto) |
| **Index** | `elephant.index` | Search and index management. Query and multi-search indexed documents, inspect mappings, manage subscriptions, and administer search clusters and index sets (reindexing, status). | [proto](index/service.proto) |
| **Spell** | `elephant.spell` | Spelling and language tooling. Check text and get suggestions, manage custom dictionaries (words and phrases) and pattern-matching rules. | [proto](spell/service.proto) |
| **Replicant** | `elephant.replicant` | Document replication between repository instances. Configure replication targets that follow a source repository's event log and replicate documents onward. | [proto](replicant/service.proto) |
| **User** | `elephant.user` | Per-user settings and messaging. Store user settings documents and key-value properties, and push/poll user and inbox messages. The target user is taken from the bearer token's `sub` claim. | [proto](user/service.proto) |

The [`newsdoc`](newsdoc/newsdoc.proto) package carries the shared NewsDoc
document model used across the services. It is generated from the
[`github.com/ttab/newsdoc`](https://github.com/ttab/newsdoc) module.

`elephant.repositorysocket` declares only message types, so it has no clients
and no `…connect` package.

## Using the APIs

### Go

Add the module and import the package for the service you need.

```bash
go get github.com/ttab/elephant-api@latest
```

Each service package holds the messages and the plain service interface, which
is the contract both protocols are expressed in:

```go
Get(ctx context.Context, req *repository.GetDocumentRequest) (*repository.GetDocumentResponse, error)
```

#### Connect clients

The Connect clients live in a `<package>connect` subpackage and return that same
plain interface, so they are drop-in replacements for the Twirp clients:

```go
import (
	"github.com/ttab/elephant-api/repository"
	"github.com/ttab/elephant-api/repository/repositoryconnect"
)

// client is an *http.Client that carries the bearer token, usually one built
// by oauth2.NewClient.
var docs repository.Documents = repositoryconnect.NewDocumentsServiceClient(
	client, "https://repository.api.tt.se")
```

`New<Service>ServiceClient` takes the base URL of the server, not a per-service
path. The constructors, one pair per service:

| Package | Clients and handlers |
| --- | --- |
| `repository/repositoryconnect` | `Documents`, `Schemas`, `Workflows`, `Metrics` |
| `index/indexconnect` | `Management`, `SearchV1` |
| `spell/spellconnect` | `Check`, `Dictionaries`, `Rules` |
| `user/userconnect` | `Settings`, `Messages` |
| `replicant/replicantconnect` | `Replication` |

`New<Service>ServiceHandler(svc, opts...)` is the server side. It takes an
implementation of the plain interface and returns the mount path together with
the handler, which is the pair `elephantine`'s API server registers.

The same packages also carry connect-go's own generated `New<Service>Client` and
`New<Service>Handler`, which speak in `*connect.Request[T]` and
`*connect.Response[T]`. The `Service` infix is what distinguishes the plain
adapters from them. Use the adapters unless you need per-call access to headers.

#### Twirp clients

`New<Service>ProtobufClient` and `New<Service>JSONClient` are unchanged and
still generated. Nothing about them, or about the `/twirp/` paths, has changed.

### Other languages

Both protocols speak JSON over HTTP `POST` and are served side by side, on
different paths:

| Protocol | Path | Content types |
| --- | --- | --- |
| Connect | `/elephant.repository.Documents/Get` | `application/json`, `application/proto` |
| Twirp | `/twirp/elephant.repository.Documents/Get` | `application/json`, `application/protobuf` |

Connect additionally serves gRPC and gRPC-Web on its own paths, selected by
content type. Connect clients send a `Connect-Protocol-Version: 1` header, and
`Connect-Timeout-Ms` sets a deadline; the servers do not require either, so a
plain `curl` or `fetch` works.

The services are reachable at `https://<service>.api.tt.se` in production and
`https://<service>.api.stage.tt.se` in staging. There is no OpenAPI
specification: the `.proto` file is the declaration, and a non-Go consumer
generates its client from it with its language's Connect or protobuf tooling.

### Errors

The two protocols share the error codes but not the body. Twirp:

```json
{"code": "not_found", "msg": "no such document", "meta": {"uuid": "..."}}
```

Connect:

```json
{
  "code": "not_found",
  "message": "no such document",
  "details": [{"type": "elephantine.rpc.ErrorMeta", "value": "<base64 Any>"}]
}
```

`msg` is `message`, and Connect has no free-form meta map in the body. The
key/value metadata the Twirp errors carry travels as an `elephantine.rpc.ErrorMeta`
error detail instead, which Go callers read with `rpc.Meta(err)` from
[`elephantine/rpc`](https://github.com/ttab/elephantine) and other clients read
with their Connect implementation's `findDetails`. The message is byte for byte
the same on both stacks.

The HTTP status differs for three codes: `canceled` is 499 rather than 408,
`deadline_exceeded` is 504 rather than 408, and — the one that matters, since
document locks and workflow rules return it — `failed_precondition` is **400**
on Connect where Twirp sends 412. Read the code from the body rather than the
status.

This module declares the messages and nothing else: it does not depend on
`elephantine`, so the generated code imports only `connectrpc.com/connect` and
the message packages. Header propagation, error helpers and interceptors come
from `elephantine/rpc`.

## Working in this repo

The Protobuf, Connect and Twirp artifacts are generated through
[mage](https://magefile.org/) targets from [`ttab/mage`](https://github.com/ttab/mage).
The compiler is [buf](https://buf.build/) and every plugin is pinned there and
run as `go run <module>@<version>` — there is no Docker image and nothing is
installed or taken off `PATH`. A generator version moves when `ttab/mage` is
bumped. Run all targets from the repository root.

| Target | Purpose |
| --- | --- |
| `mage rpc:generate` | Regenerate the Go, Connect and Twirp artifacts for every service. |
| `mage rpc:stub <app> <service> <method>` | Scaffold a new service proto. |
| `mage newsdoc` | Regenerate the NewsDoc proto and conversion code from the newsdoc module, then regenerate every service. |

Per service directory, generation writes `service.pb.go` (messages),
`service.twirp.go` (the Twirp clients, server, and the plain service interface),
and `<package>connect/service.connect.go` plus
`<package>connect/service.elephant.go` (the Connect clients and handlers, and
the adapters that put them on the plain interface).

`protoc-gen-elephant-rpc`, the plugin that writes the `service.elephant.go`
adapters, lives in `elephantine` and is pinned by `ttab/mage` like the other
generators, so `mage rpc:generate` needs nothing else. To try a plugin change
against this repository before it is pinned, point `ELEPHANT_RPC_PLUGIN` at an
elephantine checkout.

To change an API, edit its `service.proto`, regenerate, and commit the proto
together with the regenerated files.

## Releasing

A release is a git tag and nothing else — there is no version file and nothing
is stamped with the version. From a clean tree on `main`, with the generated
files up to date (`mage rpc:generate` produces no diff), cut `vX.Y.Z`:

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

Until the Connect work in elephantine and `ttab/mage` is tagged, the `ttab/mage`
requirement is a pseudo-version of its feature branch and the plugin it pins is
one of elephantine's. Cut a release of this module only once both are tags, so
the generated code in the tag comes from released generators.

## License

Licensed under MIT, the document schema is adapted from https://github.com/navigacontentlab/navigadoc/blob/88d257b9dfed8e192bbfd106042b2974343f9cc1/rpc/document.proto
