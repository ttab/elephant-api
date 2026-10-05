# Changelog

Everything from v0.25.0 onwards is documented here; earlier releases are not
reconstructed. The entries are derived from the release tags, and the linked
pull requests hold the detail.

## [v0.27.0] - Unreleased

**New messages and fields (sync handshake and lineage on `Collaborate`):**
the stream now carries both halves of the y-protocols sync handshake, so a
client can push edits the server lacks, such as ones made offline. A subscribe
is answered with `sync_step2`, then the new `CollaborateResponse.sync_step1`
carrying the server's state vector (read-write subscriptions only), then
`synced`; the client answers `sync_step1` with the new
`CollaborateRequest.sync_step2`, which may be up to 1 MiB rather than an
update's 32 KiB. `Subscribe.lineage` declares which CRDT lineage the client's
local document belongs to, and `Synced` reports the session's `lineage` and
`state_vector`. The comments on `CollaborateResponse` and
`CollaborateRequest.sync_step2` carry the full contract.

**Behaviour change (subscribe answers):** once elephant-collab implements this
contract, existing clients see two differences without opting in. A subscribe
whose state vector belongs to a different lineage than the session's, such as
a reconnect with a local document from a session since evicted and re-seeded,
is refused with the new `Close` reason `lineage_mismatch` and gets neither
`sync_step2` nor `synced`, even when it declares no lineage. Until now such a
client's updates referenced items the new seed does not hold, so the server
parked them as pending and never integrated them; with the client's
`sync_step2` carrying its whole old history, merging would duplicate the
document's structure instead, which is what the refusal prevents. The `Close`
message is a JSON object in the shape of `session_terminated`'s,
`{"lineage": "...", "reason": "...", "version": 12}`: the session's current
lineage, why the client's lineage ended (`frozen`, `reset`, `purged`,
`discarded`, `promoted`, `expired`, `anchor_moved` or `unknown`), and the
repository version it ended at; `CollaborateResponse.close` describes each
reason. A client should treat that as the end
of the subscription and keep its local document rather than resubscribe with
it. A repeat `subscribe` on an open subscription, which got only `synced`, now
gets `sync_step1` first; a client with nothing to send may ignore it.

Changes:

- `elephant.collab.v1.CollaborateResponse` gains `sync_step1` (9), a new
  `SyncStep1` message carrying `state_vector`, sent between `sync_step2` and
  `synced`; the response documents the handshake order, including what a
  repeat subscribe gets.
- `elephant.collab.v1.CollaborateRequest` gains `sync_step2` (8), reusing
  `SyncStep2`, for the client's answer to the server's Step 1, with its own
  1 MiB payload cap.
- `elephant.collab.v1.Subscribe` gains `lineage` (5), and `Synced` gains
  `lineage` (2) and `state_vector` (3).
- `CollaborateResponse.close` documents the `lineage_mismatch` reason and its
  JSON message, and `Subscribe.state_vector` the rule the lineage guard applies
  to it.
- `elephant.collab.v1.CollaborativeSession` gains `lineage` (15), the
  lineage the session was seeded with or, when it resumed the state of an
  evicted session, continued; `GetCollaborativeSession`,
  `ListCollaborativeSessions` and `ListActiveCollaborativeSessions` all
  report it.

## [v0.26.0] - 2026-09-18

**New service (collaborative editing):** `elephant.collab.v1` is the
declaration for elephant-collab, which until now kept it in its own
repository. It carries the synchronous control plane — `Snapshot`,
`BeginPublish` and `CancelPublish`, the inspection, session and sketch RPCs,
`BulkSnapshot` and `GetDocumentTimeline` — and `Collaborate`, a bidirectional
stream that is the server-side counterpart of the WebSocket the service
terminates for browsers. Go consumers import
`github.com/ttab/elephant-api/elephant/collab/v1` and
`github.com/ttab/elephant-api/elephant/collab/v1/collabv1connect`.

**Connect only, on connect-go's own interface:** collab is the first service
here that generates neither Twirp nor the plain protobuf service interface. A
bidirectional stream has no room in an interface that returns a single
response, so `collabv1connect` holds connect-go's own
`NewCollaborationServiceClient` and `NewCollaborationServiceHandler`, which
speak `*connect.Request[T]` and `*connect.Response[T]`. There is no `/twirp/`
mount for it and no plain-interface adapter alongside them. The
`Collaborate` stream needs an HTTP/2 transport; the unary RPCs on the same
service do not.

**New layout (versioned directories):** it is also the first declaration in
the versioned layout, at `elephant/collab/v1/`, which is what buf's
directory-match rule requires for the `elephant.collab.v1` package and what
`mage rpc:stub` scaffolds for anything new. The shape follows the layout, so
nothing in the magefile configures it, and none of the existing services
moved or changed.

Changes:

- `elephant.collab.v1` is declared at `elephant/collab/v1/service.proto`, with
  the messages generated into `elephant/collab/v1` and connect-go's client and
  handler into `elephant/collab/v1/collabv1connect`.
- The README's service table, Connect client section and generation notes
  describe the Connect-only shape and the versioned layout.

## [v0.25.2] - 2026-09-17

**New field (a hit says what it is):** `elephant.index.HitV1` gains
`document_type`, the type of the document the hit is for. A query that spans
several document types returns a mixed result set, and until now nothing on
the hit told them apart — `HitV1` carried the id, the score, the fields, the
source, the sort values and the document, and none of them name the type. A
caller that needed it had to infer it from a field it had indexed itself, or
run one query per type so that the type was known from the query rather than
the answer. Existing fields are untouched and a caller that ignores the new
one is unaffected.

Changes:

- `elephant.index.HitV1` gains the `document_type` field (7).

## [v0.25.1] - 2026-09-17

**New field (multi-type index queries):** `elephant.index.QueryRequestV1` gains
`document_types`, a repeated string, alongside the singular `document_type`.
It names the document types a query should span, and an empty list still means
every type. The two fields are additive rather than exclusive: a request that
sets both is asking for the union of them, so a caller can add the plural field
without first removing the singular one. Nothing about `document_type` changed,
and a request that never sets `document_types` behaves exactly as it did.

Two limits are the index service's, not the declaration's, and are worth
knowing before reaching for the field. Subscriptions are single-type — a
subscribing query still names exactly one — and the types are indexed
separately, so a field name that carries different types in different document
types cannot be queried or sorted on across them. `GetMappingsRequestV1` is
still single-type, so reconciling the mappings of several types is the caller's
job.

Changes:

- `elephant.index.QueryRequestV1` gains the repeated `document_types` field
  (13), for queries that span several document types.

## [v0.25.0] - 2026-09-08

**Build:** the `go` directive moves from 1.25.7 to 1.27.1, so every module that
imports this one needs a `go` directive of at least 1.27 and a toolchain that
can build it. That is the whole fleet, and it reaches further than the Connect
work does: a consumer that only wants the message types has to move its floor
too, and CI that pins a Go version rather than reading `go.mod` has to be
updated before the bump lands. `google.golang.org/protobuf` moves to v1.36.12,
which is the runtime version the pinned `protoc-gen-go` names in the generated
headers.

**New protocol (Connect):** every service now ships Connect clients and
handlers alongside the Twirp ones, in a `<package>connect` subpackage —
`repository/repositoryconnect`, `index/indexconnect`, `spell/spellconnect`,
`user/userconnect` and `replicant/replicantconnect`.
`New<Service>ServiceClient(httpClient, baseURL)` returns the same plain service
interface `New<Service>ProtobufClient` returns, so switching a Go client is one
constructor call and nothing downstream changes;
`New<Service>ServiceHandler(svc, opts...)` takes an implementation of that
interface and returns the mount path and the handler. connect-go's own
`New<Service>Client` and `New<Service>Handler`, which speak in
`*connect.Request[T]`, are generated too — the `Service` infix is what tells the
two apart. Nothing about the Twirp clients, the Twirp server interfaces or the
`/twirp/` paths changed, and `elephant.repositorysocket` declares no service so
it has no `…connect` package.

The Connect paths are the standard `/<package>.<Service>/<Method>`, with no
prefix: `POST /elephant.repository.Documents/Get` against
`POST /twirp/elephant.repository.Documents/Get`. They do not overlap, so both
protocols are served by one server. An ingress rule that routes on `/twirp/`
needs a sibling rule before a service can serve Connect. This module only
declares the API — whether an environment answers on the Connect paths is
decided by each service's own release.

A Connect mount answers gRPC and gRPC-Web on those same paths too, selected by
content type, but only from inside the cluster: the platform's ingress speaks
HTTP/1.1 to its targets, so neither protocol is externally reachable and
neither is offered to customers. They are a supported way for one service to
call another in the cluster. gRPC-Web is in particular not a browser protocol
here — a browser client uses Connect.

**Behaviour change (Connect JSON field names):** a Connect JSON response spells
its fields in lowerCamelCase (`{"documentUuid": "…"}`) where a Twirp response
spells them the way the `.proto` declares them (`{"document_uuid": "…"}`).
Twirp marshals with `protojson` and `UseProtoNames: true`; Connect's codec is
`protojson` with its default options, and the services deliberately do not
install a codec that makes Connect look like Twirp, since every Connect runtime
and proxy assumes the standard encoding. Nothing else about the encoding
differs — both omit unpopulated fields, both render an enum as its name and a
`google.protobuf.Timestamp` as an RFC 3339 string — and requests are
unaffected, because `protojson` unmarshalling accepts both spellings on both
stacks. This reaches a caller that reads JSON responses by hand, with `fetch`
or `curl`: change the path prefix without changing the field names and every
multi-word field reads `undefined`. The generated clients — Go, `@protobuf-ts`,
`connect-es` — parse into the generated types and see no difference at all.

**Behaviour change (Connect error bodies):** a Connect error body is
`{"code":…,"message":…,"details":[…]}` where Twirp's is
`{"code":…,"msg":…,"meta":{…}}`. Connect has no free-form meta map, so the
key/value metadata — `lock_holder_sub`, `required_any_of_scopes`, `argument`
and the rest — travels as an `elephantine.rpc.ErrorMeta` error detail, which Go
callers read with `rpc.Meta(err)` from `elephantine/rpc` and other clients read
with `findDetails`. The codes and the messages are identical on both stacks.
The HTTP status is identical except for three codes: `canceled` is 499 rather
than 408, `deadline_exceeded` is 504 rather than 408, and `failed_precondition`
— which document locks and workflow rules return — is **400** where Twirp sends
412. Anything keyed on 412 for a lock conflict has to read the code from the
body instead.

**Build change (generation):** the artifacts are generated with buf and
plugins pinned in `ttab/mage`, not with protoc in the `elephant-twirptools`
Docker image, so regenerating needs no Docker and installs nothing. The mage
targets are renamed to match: `mage rpc:generate` and `mage rpc:stub`,
replacing the `twirp:` ones. `mage newsdoc` keeps its name
and now regenerates every service afterwards, since a changed NewsDoc message
changes the descriptors the services embed. `protoc-gen-elephant-rpc`, which
writes the adapters, is pinned by `ttab/mage` like the other generators, and
`ttab/mage` also pins the Go toolchain it runs every generator under, so the
committed output no longer depends on which Go version the machine that
regenerated it happened to have. Generation needs network access: buf and the
plugins are resolved as `go run <module>@<version>`, which queries the module
proxy on every run even with a warm cache.

**Removed (OpenAPI):** the OpenAPI 3 specifications under `docs/` are gone.
They described the Twirp paths and Twirp's error schema only, nobody generated
a client from them, and the generator that wrote them cannot run under buf. The
`.proto` files are the declaration a non-Go consumer generates from. With
nothing left to stamp a version into, a release is a plain git tag: there is no
`rpc:release` target and no "bump to vX.Y.Z" commit any more.

Changes:

- The module requires `connectrpc.com/connect` v1.20.0, and that is the only
  new dependency the generated code brings with it. It still does not depend on
  `elephantine`: the generated code imports connect, the standard library and
  the message packages, and the error helpers, header propagation and
  interceptors live in `elephantine/rpc`.
- The Go code is generated by protoc-gen-go v1.36.12 where the image pinned
  v1.36.2, which rewrites every `.pb.go`: the embedded descriptor becomes a
  string constant rather than a byte slice, `unsafe` is imported, and the header
  records `protoc (unknown)` because buf reports no protoc version. The
  `service.twirp.go` files change only in the gzip encoding of their descriptor
  blob. The compiled descriptors themselves are byte-identical to the ones the
  image produced, so no message, field or method changed.
- Each `<package>connect` package has a test that asserts the adapters still
  satisfy the plain service interfaces and still mount on the unprefixed paths,
  so a regeneration that loses them fails rather than compiling.
