# API declarations for the Elephant

Protobuf / [Twirp](https://github.com/twitchtv/twirp) API declarations for the
Elephant platform. Each service is defined in a `service.proto` file and shipped
with generated Go + Twirp clients and servers, plus an OpenAPI 3 specification
for non-Go consumers.

## The APIs

| API | Package | Description | Specs |
| --- | --- | --- | --- |
| **Repository** | `elephant.repository` | The core document store. Read, write, validate, lock, and delete documents; query the event log; manage statuses and workflows; configure schemas, document types, and metrics. | [proto](repository/service.proto) · [openapi](docs/repository-openapi.json) |
| **Repository socket** | `elephant.repositorysocket` | WebSocket protocol for live document access — authenticate a connection, fetch and subscribe to sets of documents, and receive update/removal events as they happen. | [proto](repositorysocket/service.proto) · [openapi](docs/repositorysocket-openapi.json) |
| **Index** | `elephant.index` | Search and index management. Query and multi-search indexed documents, inspect mappings, manage subscriptions, and administer search clusters and index sets (reindexing, status). | [proto](index/service.proto) · [openapi](docs/index-openapi.json) |
| **Spell** | `elephant.spell` | Spelling and language tooling. Check text and get suggestions, manage custom dictionaries (words and phrases) and pattern-matching rules. | [proto](spell/service.proto) · [openapi](docs/spell-openapi.json) |
| **Replicant** | `elephant.replicant` | Document replication between repository instances. Configure replication targets that follow a source repository's event log and replicate documents onward. | [proto](replicant/service.proto) · [openapi](docs/replicant-openapi.json) |
| **User** | `elephant.user` | Per-user settings and messaging. Store user settings documents and key-value properties, and push/poll user and inbox messages. The target user is taken from the bearer token's `sub` claim. | [proto](user/service.proto) · [openapi](docs/user-openapi.json) |

The [`newsdoc`](newsdoc/newsdoc.proto) package carries the shared NewsDoc
document model used across the services. It is generated from the
[`github.com/ttab/newsdoc`](https://github.com/ttab/newsdoc) module.

## Using the APIs

### Go

Add the module and import the package for the service you need. The generated
code includes both client and server interfaces.

```bash
go get github.com/ttab/elephant-api@latest
```

```go
import "github.com/ttab/elephant-api/repository"
```

### Other languages

Use the OpenAPI 3 specs under [`docs/`](docs/) to generate a client, or call the
JSON endpoints directly — Twirp speaks JSON over HTTP `POST`. The specs list the
production and staging server URLs (`https://<service>.api.tt.se` and
`https://<service>.api.stage.tt.se`).

## Working in this repo

Protobuf/Twirp/OpenAPI artifacts are generated through
[mage](https://magefile.org/) targets that run the protoc toolchain inside the
`elephant-twirptools` Docker image — never invoke protoc directly. Run all
targets from the repository root.

| Target | Purpose |
| --- | --- |
| `mage twirp:generate` | Regenerate Go, Twirp, and OpenAPI artifacts for every service, using the most recent git tag as the version. |
| `mage twirp:release <version>` | Same as generate, but stamps the given version into the OpenAPI specs. Used for releases. |
| `mage twirp:stub <app> <service> <method>` | Scaffold a new service proto. |
| `mage newsdoc` | Regenerate the NewsDoc proto and conversion code from the newsdoc module. |

To change an API, edit its `service.proto`, run `mage twirp:generate`, and
commit the proto together with the regenerated files.

## Releasing

Releases are version bumps stamped into the OpenAPI specs and then tagged — the
git tag is the source of truth for the version. From a clean tree on `main`, to
cut `vX.Y.Z`:

```bash
mage twirp:release vX.Y.Z          # regenerate specs with the new version
git add docs/*.json
git commit -m "bump to vX.Y.Z"
git tag vX.Y.Z
git push origin main && git push origin vX.Y.Z
```

The only expected change from the release step is the `version` field in each
`docs/*-openapi.json`. If anything else changes, a proto edit was left
ungenerated.

## License

Licensed under MIT, the document schema is adapted from https://github.com/navigacontentlab/navigadoc/blob/88d257b9dfed8e192bbfd106042b2974343f9cc1/rpc/document.proto
