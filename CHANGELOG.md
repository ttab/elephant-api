# Changelog

Everything from v0.25.0 onwards is documented here; earlier releases are not
reconstructed. The entries are derived from the release tags, and the linked
pull requests hold the detail.

## [v0.31.0] - Unreleased

**New service (tables):** `elephant.tables.v1` is the declaration for
elephant-tables, which gives a document its own tabular data in a SQLite
database of the document's current generation. It is seven services in one
package: `DatabasesService` (create, describe, fork, restore in place,
history, recovery from a lost replica, and delete), `SchemaService`
(namespaces, tables, columns, constraints, indexes, type changes with a
dry run and declared schemas), `DataService`
(rows, mutations, undo, read-only SQL, column summaries, agent
suggestions, presence, and the `Watch` change stream), `SnapshotsService`
(export snapshots and publications), `ImportsService` (upload, analyze,
apply), `EventsService` (the tenant's coarse event log, over the
`WatchEvents` stream) and, for operators, `AdminService` (databases out
of sync with their documents). It is declared at
`elephant/tables/v1/service.proto`; Go consumers import
`github.com/ttab/elephant-api/elephant/tables/v1` and
`github.com/ttab/elephant-api/elephant/tables/v1/tablesv1connect`, and the
README's service table and Connect client section describe it.

**Connect only, on connect-go's own interface:** like collab, tables is in
the versioned layout and declares streams, so `tablesv1connect` holds only
connect-go's `New<Service>Client` and `New<Service>Handler`. There is no
`/twirp/` mount and no plain-interface adapter. Both streams are server
streams and need no HTTP/2 transport.

Changes:

- Document generations: a database belongs to one generation of its
  owning document, the repository's nonce. Requests name a database by
  the document's UUID and are served from the current generation's, read
  with the caller's token, so every database-scoped call needs read
  permission on the document. `DatabaseInfo.id` (10) is the database's
  own id, `DatabaseInfo.document_nonce` (11) its generation and
  `DatabaseInfo.parent_id` (12) its parent's id; `Event.database_id` (9)
  and `Event.document_nonce` (10) name the database and the generation it
  was bound to when the event happened. `database` and `parent_database`
  fields name owning documents. `CreateDatabase` binds to the current
  generation, so a document created again under a deleted one's UUID gets
  a database of its own while the deleted generation's stays archived
  until its deletion is purged; it answers `already_exists` when the
  generation has a database, `failed_precondition` for a generation the
  service has seen deleted, `unavailable` while an earlier generation's
  database is not archived yet, and `aborted` when the generation changes
  during the call. A fork into the document whose pod died before it
  opened does not keep the document from getting a database.
- `DataService.Suggest` needs the `doc_suggest` scope together with
  `doc_read`, and read permission on the document; any caller holding the
  scope may suggest, an agent or a person. `Suggestion.agent` is the token
  subject of whoever made the suggestion.
- Database size: `DatabaseInfo.data_size` (13) is the database's size in
  bytes without its change log and free pages, measured by the serving pod
  and up to 30 seconds old; it is unset when the response does not open
  the database. `DatabaseInfo.soft_size_cap` (14) is the size past which a
  client should warn; it is reported and never enforced.
- `DatabasesService.DeleteDatabase` is served: it archives the database
  of the document's current generation while the document lives on, logs
  a `deleted` event and ends the database's `Watch` streams; a second
  call is `not_found`. The service keeps the archived database for a
  retention window before deleting it, and a document restore never
  brings it back; an operator can within the window, which logs
  `undeleted`. Its pending imports do not run while it is deleted.
  `CreateDatabase` and `Fork` then give the generation a
  new, empty database, numbered on within the generation in
  `DatabaseInfo.generation` (15), with an id of its own: a generation's
  first database has the nonce as its id, a later one an id derived from
  the nonce and the number. A `Fork` is refused with `aborted`, for a
  retry, when another database of the generation was created or deleted
  while it made its copy.
- Namespaces: every table belongs to a namespace, named by the
  application that created it, and a change batch touches exactly one.
  The `Namespace` message (name, the advisory `schema_editable` flag, and
  `schema_version` (3) and `schema_digest` (4)) and
  `SchemaService.UpdateNamespace`, which sets the flag as a change batch.
  `Table.namespace` (7), `DatabaseInfo.namespaces` (9) and
  `DescribeResponse.namespace` (4). A required `namespace` on
  `DescribeRequest` (2), `CreateTableRequest` (4), `UpdateTableRequest`
  (5), `DeleteTableRequest` (3), `AddColumnRequest` (4),
  `UpdateColumnRequest` (4), `ChangeColumnTypeRequest` (7),
  `DeleteColumnRequest` (4), `ListRequest` (8), `MutateRequest` (5),
  `UndoRequest` (3), `ChangesRequest` (4), `WatchRequest` (5),
  `SummarizeRequest` (6), `SuggestRequest` (5), `ResolveSuggestionRequest`
  (5), `ListSuggestionsRequest` (3), `AnalyzeRequest` (5) and
  `WatchEventsRequest` (2); `ImportPlan.namespace` (8),
  `Suggestion.namespace` (11), `Change.namespace` (15),
  `Change.namespace_state` (16), `ImportJob.namespace` (10) and
  `Event.namespace` (8). `ChangesResponse.cursor` (3) is how far a read
  reached, past the other namespaces' changes. `RestoreResponse.batches`
  (9, `NamespaceBatch`) lists the batches of a restore, one per namespace
  it changes. A table's view for `Query` is named
  `<namespace>__<key>`.
- Stable keys: `Table.key` (8), unique within the namespace, and
  `Column.key` (9), unique within the table, given at creation or made by
  the service from the name, and never changed. `CreateTableRequest.key`
  (5) and `ImportCandidate.table_key` (13) give a new table's key, and a
  new column's comes from its `Column.key`. Requests that take a namespace
  accept a key wherever they name a table or column by id; ids always
  start with a digit and keys with a letter. A deleted table's or column's
  key stays reserved while the change log holds the deletion, and a key in
  use or reserved is refused with `already_exists`. Keys name the views
  `Query` reads and their columns, so a rename changes nothing a
  statement names; a table or column key may not start with `sqlite`,
  `pragma`, or `t_`/`c_` and an id, a table key may not be an SQLite
  table-valued function's name and a column key may not be `id`, each
  refused with `invalid_argument`. SQL keywords are allowed as keys and
  are quoted in SQL. The display name of a table or column is free
  text.
  `UpdateColumnRequest.column` is matched on its key when its id is empty.
- Constraints: `Column.required` (10), and unique constraints and indexes
  as the `Index` message in `Table.indexes` (9), at most 16 per table and
  8 columns each, set with `SchemaService.SetRequired`, `AddIndex` and
  `DeleteIndex`, each a change batch; the first two take a `dry_run`. A
  write that would leave a required column empty or duplicate a unique
  constraint's values is refused per operation with a
  `ConstraintViolation`, in `MutationResult.violation` (6); adding a
  constraint existing rows break is `failed_precondition` with a
  `ConstraintViolations` detail. `UpdateColumn` ignores `required`; a
  column an index covers cannot be deleted, nor retyped when a unique
  constraint covers it. In `ChangeColumnType` and the constraints, a cell
  that would convert to an empty value counts as not converting.
- Declared schemas: `SchemaService.EnsureSchema` (`EnsureSchemaRequest`,
  `EnsureSchemaResponse`) declares the whole schema of a namespace with a
  version, as `SchemaDeclaration`, `DeclaredTable`, `DeclaredColumn` and
  `DeclaredIndex`, matched by key, and applies the difference as one
  change batch. A dry run returns the planned `SchemaStep`s
  (`SchemaStepKind`) and the rows that would refuse them. An older
  version, or the stored one with another schema, is
  `failed_precondition` with the reason `schema_version_conflict` and a
  `SchemaVersionConflict` detail; the digest does not depend on the order
  of tables and of indexes. A declaration batch undoes as a whole or not
  at all, and a declaration may take a key only a deletion reserves.
  `ConstraintViolation` also reports a cell that does not convert to a
  declared type.
- `QueryRequest.namespace` (5), optional, scopes a `Query` statement to
  one namespace: it sees that namespace's views under their tables' keys
  alone and only that namespace's rows of `_tables` and `_columns`.
  Without it a statement sees every namespace under `<namespace>__<key>`.
- `QueryRequest.named_params` (6), a map of values keyed by parameter
  name without its prefix, binds a statement's named parameters:
  `:name`, `@name` and `$name` all bind the entry for `name`. A statement
  takes `params` or `named_params`, not both. A name is
  `[A-Za-z_][A-Za-z0-9_]*`; the TCL forms `$name(...)` and `::` names,
  and `#name`, are refused. A parameter without a value, and a value no
  parameter uses, positional or named, are `invalid_argument`. Both kinds count
  together against the parameter cap.
- `RestoreRequest.namespace` (5), optional, limits a restore to one
  namespace: its tables, rows, schema, constraints, declared schema
  version and `schema_editable` flag go back to the point as one restore
  batch in that namespace, and `tables` may name tables by key, refusing
  a key that named one table now and another at the point as ambiguous. A
  restore of the whole database or of a whole namespace also puts back
  each namespace's `schema_editable` flag. A restored table whose key a
  table outside the restore holds is refused with `already_exists`.
  `PointInTime.snapshot` refuses a publish
  snapshot with `invalid_argument`.
- `Watch`: `Heartbeat.resume` (3) is the cursor a stream may be resumed
  from; it moves past other namespaces' changes, so a client of a quiet
  namespace keeps a cursor the change log still holds.
  `WatchRequest.tables` follows a key: a table created under it while the
  stream runs matches from its `table_create` on.
  `WatchResponse.suggestion` brings a suggestion too large for the stream
  as a notice without its mutations or rationale, read whole with
  `ListSuggestions`.
- Snapshots: `Snapshot.txid` is a replica position, in the cursor's
  epoch, that holds the snapshot's state; every snapshot is synced to the
  replica before it is recorded, and taking one again at the same cursor
  renews its expiry, unless it has expired. `Snapshot.expires` applies to
  restore points as well as exports. `GetSnapshot` and `GetPublication`
  answer an id that names nothing exactly as one the caller may not read.
- `DatabasesService.Fork` syncs the source after the state is copied,
  until its replica holds the fork point; a fork whose pod died before it
  opened refuses opens with `unavailable` until it is removed a few
  minutes later.
- Recovery: a database whose newest replica has nothing restorable
  refuses to open with `failed_precondition` and the reason
  `recovery_needed`. `GetDatabaseResponse.recovery` (`DatabaseRecovery`)
  reports the lost epochs, when the lost version was last saved, the
  epoch and TXID offered instead with the time of its newest restorable
  version, and the epoch the offer cuts short when only the end of the
  newest replica is missing, without opening the database.
  `DatabasesService.RecoverDatabase` accepts the offer, with `doc_write`
  and the caller's token, and logs a `recovered` event; cursors from the
  skipped epochs are invalid afterwards. The request echoes the whole
  offer and is refused with `failed_precondition` when any part of it no
  longer matches.
- `DataService.Summarize` returns the distribution of one column for a
  table widget at card size: a count per value for a choice or boolean
  column, a histogram for an integer, number, decimal, date or datetime
  column (decimal values treated as numbers), plus empty and other
  counts. `Table.summary_column` names the column summarised by default,
  and `UpdateTableRequest.summary_column` sets it; an empty
  `UpdateTableRequest.name` leaves the name unchanged.
- `DataService.Suggest`: only the cell writes of a `RowUpdate` need
  `expected`, not those of a `RowInsert`; a suggested delete or move
  conflicts when its row changed after the suggestion was made, reported
  as a `CellConflict` with an empty `column`; the open suggestions of a
  database are limited in number, per token subject and in bytes, refused with
  `resource_exhausted` past a limit; and document references in the
  operations are stored with their UUID alone.
- `DocumentRef.unresolved` (4) marks a reference the service did not look
  up, because the response references more distinct documents than one
  response resolves, or because the lookup failed after the request's
  write had committed; its title is empty and `no_access` is false. A
  write's response is never failed because of its references.
- Imports: `CreateUploadRequest.size` (4) is required, the file's size in
  bytes, which the presigned URL signs as the PUT's Content-Length; a
  size past the file size limit, or more pending uploads to a database
  than a caller may hold, is refused with `resource_exhausted`.
  `ImportJob.error` (9) says why a job failed. `ImportCandidate.header_row`
  counts from 1, as a spreadsheet numbers its rows, and 0 means no header
  row. `ImportCandidate.delete_missing` deletes the missing rows before
  the source is written. An import the service does not do yet, from
  another database or as a round trip, is refused with `unimplemented`
  by `Analyze` and `Apply` alike. `Analyze` refuses an uploaded SQLite
  database with `unimplemented` too, while `Apply`, which does not read
  the file, accepts its plan and the job fails with that message; a file
  it does not accept, such as a legacy `.xls` workbook, is
  `invalid_argument`.
- Events: `EventsService.WatchEvents` carries only the events of
  documents the caller may read, so ids need not be consecutive on one
  stream, and checks a database from its first event of any namespace. It
  opens with a heartbeat, a `WatchEventsResponse` without an event, and
  sends one every 30 seconds without events, also while it passes over
  withheld events; it ends with `lease_moved` when the pod shuts down and
  with `cursor_invalid` when resumed past the newest event or past the
  retention. `WatchEventsResponse.position` (2) is the id of the last
  event the stream has passed, sent or withheld, which a client resumes
  from. `Event.type` includes `undeleted`, a database live again once its
  deleted generation is restored. `deleted` and `undeleted` are sent to a
  caller whose token was found to read the document before it was
  deleted, on the same stream since the document's ACL last changed or
  in the service's short-lived access cache, and otherwise when the
  document exists and is readable: after `DeleteDatabase`, or once
  restored. A token
  with the `eventlog_read` scope gets every event unfiltered, without
  `doc_read`.
- Out of sync: `AdminService`, for operators, needs the `tables_admin`
  scope. A repository event the service skipped after it failed to
  apply, a document's deletion or restore, leaves the document's
  database out of sync with the document;
  `ListOutOfSync` lists the skipped events (`SkippedEvent`), a page at a
  time, and `Reconcile` reads the document from the repository, applies
  what each would have done and clears them (`ReconciledEvent`). Until
  then every call naming the database, and `CreateDatabase` and `Fork`
  into the document, are refused with `failed_precondition` and the
  reason `out_of_sync`.

## [v0.30.0] - 2026-11-18

**Breaking (Comments):** `Comments.WaitForComments`, the interim wakeup poll
for comment changes, is removed together with `WaitForCommentsRequest` and
`WaitForCommentsResponse`. Nothing called it. The `Stream` of the new
`NotificationsService` replaces it.

Changes:

- New service `elephant.user.v1.NotificationsService`, the notification feed:
  `Stream` is a server stream of the caller's rows, replayed and then live,
  `ListNotifications` lists them, `Subscribe`, `Unsubscribe` and
  `ListSubscriptions` manage which documents a user hears about, and `Ingest`
  is where producers record an event about a document. `Ingest` needs the
  new `user_notify` scope, every other RPC the `user` scope.
- The service is Connect only, in the versioned layout like collab: messages
  in `github.com/ttab/elephant-api/elephant/user/v1` and connect-go's
  `NewNotificationsServiceClient` and `NewNotificationsServiceHandler` in
  `userv1connect`. There is no Twirp path.
- The `kind` comments on `CommentThread` and `CreateCommentRequest` no longer
  state a 128 byte limit, since the service no longer enforces one. The
  pattern is unchanged.

## [v0.29.5] - 2026-11-18

Changes:

- New RPC `Documents.BulkCheckPermissions`, which takes up to 200 document
  UUIDs and a permission and returns the UUIDs the caller holds that
  permission on, answered for the caller's own subject and units. A UUID
  with no document is left out like one the caller may not use, and
  elevated scopes grant the permission as they do in `GetPermissions`. New
  messages `BulkCheckPermissionsRequest` and `BulkCheckPermissionsResponse`.
- `EventlogItem` and `DocumentMeta` gain `restored_from_nonce` and
  `restored_from_delete_record_id`, naming the deleted generation and the
  delete record a restored document was restored from. On the eventlog they
  are set on every event a restore emits, `restore_finished` included;
  `delete_record_id` stays reserved for delete events. Both are empty for
  documents that weren't created by a restore.
- New packages `elephant.stream.v1` and `elephant.delegate.v1`, the APIs of
  elephant-stream and elephant-delegate, moved here from those repositories
  unchanged on the wire. The Go packages are now
  `github.com/ttab/elephant-api/elephant/stream/v1` (`streamv1`) and
  `github.com/ttab/elephant-api/elephant/delegate/v1` (`delegatev1`), with
  Connect clients and handlers in `streamv1connect` and `delegatev1connect`.

## [v0.29.4] - 2026-11-16

Changes:

- The `kind` of a comment thread, on `CommentThread` and
  `CreateCommentRequest`, is documented as reverse domain notation, such as
  `se.ecms.user.comments.factcheck`: lowercase labels that start with a
  letter, at least three joined by dots, at most 128 bytes. The service
  refuses any other non-empty kind with `invalid_argument`. Field names and
  numbers are unchanged.

## [v0.29.3] - 2026-11-16

**New messages (collab lifecycle events):** a `Collaborate` stream can watch
session and presence events for a set of documents without a Yjs
subscription to each. `CollaborateRequest` gains `watch` and `unwatch`, and
`CollaborateResponse` gains `lifecycle` and `watching`; all four are
connection-scoped and leave `doc` empty. The service sends the current state
of each watched document as ordinary events, then `watching`, then events as
they happen. There is no new RPC. Nothing serves these yet.

**Documented (subscription keys):** `CollaborateRequest.doc` is a
subscription key, `uuid | mode ":" uuid`: `o:<uuid>` is an observer's
subscription and `e<N>:<uuid>` one editor's per key. A bare UUID behaves as
before, so existing clients are unaffected.

Changes:

- New enum `LifecycleEventKind` (`SESSION_STARTED`, `SESSION_ENDED`,
  `PRESENCE`), and new messages `Watch`, `Unwatch`, `Watching`,
  `LifecycleEvent`, `SessionStarted`, `SessionEnded`, `PresenceJoined`,
  `PresenceLeft` and `WatchRefused`.

## [v0.29.2] - 2026-11-15

**New enum value (spell entities):** `CorrectionLevel` gains `LEVEL_ENTITY`,
for text that matches a known entity in the repository. Nothing produces it
yet; once spell does, `Check.Text` reports recognised entity names, correctly
spelled ones included, at that level. A client that renders every correction
as an error has to handle `LEVEL_ENTITY` as an "is this?" prompt instead.

Changes:

- `Suggestion` gains `uuid` and `type`, the entity document a suggestion
  refers to when it is an entity candidate, with `type` as the raw document
  type such as `core/person`. Both are empty for other suggestions. The
  `description` comment now says that for an entity candidate it is what tells
  two entities of the same name apart.
- `TextRequest` gains `accepted`, the words and phrases the caller has already
  accepted, which are then not reported and suppress shorter overlapping
  corrections. `SuggestionsRequest` deliberately has no equivalent: a client
  should not ask for suggestions on a span it has accepted.

## [v0.29.1] - 2026-11-13

Changes:

- New RPC `Documents.ListDocuments`, a keyset-paginated listing of the
  documents of a type, optionally narrowed to the documents whose head for a
  status points at a version, or to those at a workflow checkpoint. It
  returns the selected or the current version of each document, as the whole
  document or a subset, optionally with its meta, and is meant for building
  derived state from a whole set of documents before tailing the eventlog.
  New messages `ListDocumentsRequest`, `ListDocumentsSelector`,
  `ListDocumentsResponse` and `ListDocumentsItem`, and the enum
  `ListVersion`.

## [v0.29.0] - 2026-11-12

Changes:

- New service `elephant.user.Comments`, for threads of comments on repository
  documents: `CreateComment`, `UpdateComment` and `DeleteComment` write
  comments, `GetThread` and `ListThreads` read threads with their comments,
  `ResolveThread` and `ReopenThread` change a thread's state, `ListMentions`
  lists the comments that mention the caller, and `WaitForComments` is an
  interim wakeup poll for comment changes on a set of documents, to be
  replaced by a comment stream. Every RPC needs the `user` scope; the rest of
  access follows the caller's read or write permission on the document.
- Go consumers get `user.Comments` and, in `user/userconnect`,
  `NewCommentsServiceClient` and `NewCommentsServiceHandler`, alongside the
  Twirp `NewCommentsProtobufClient` and `NewCommentsJSONClient`.
- `SchemaUsage` gains `SCHEMA_USAGE_COMMENTS`, the usage the comment body
  schema is registered under through the `Configuration` service.

## [v0.28.3] - 2026-10-23

**Changed messages (mirror module owners):** a mirror module now declares an
application's block owners as a chain of the application's list fields, as
`["assignments"]`, rather than by block type, since a block type is reused
across the platform and only the path to a block decides whether it is an
application's owner. `DescribeMirror` reports each application's owners in
that shape and the document types it edits, and `RenderField` reports the
path from the document root to each block owner it renders, which is what
addresses the block in the document.

Changes:

- `MirrorOwnerSpec` loses `block_type` (field 2, now reserved) and gains
  `field_chain`, the list fields from the root down whose items are the
  owners. This removes a field from a released message, which nothing
  in production reads: Go code reading `BlockType` no longer compiles.
- `MirrorApp` gains `doc_types`.
- `MirrorOwner` gains `path`, one `MirrorPathStep` per block from the
  top-level block down.
- New message `MirrorPathStep`: the array a block sits in (`kind`) and its
  non-empty block attributes.

## [v0.28.2] - 2026-10-15

**New RPCs (mirror modules):** an editor application's reflect, compiled to a
WebAssembly module, is registered with the collab service under the
application ids it declares, and the service runs it to copy staging under
`_collab` into the NewsDoc tree. `RegisterMirror` stores a module from its
bytes, version and digest and never goes backwards per application id (a
rebuild of the same version under a new digest replaces it);
it requires the new `collab_mirror` scope rather than `collab_admin`, which
would also grant document access. `GetMirror` returns the registered module
(`collab_mirror` or `collab_admin`), and `DescribeMirror` what it declares —
applications with their owners, field maps and the application each stages
under, seeders, html-carrying data keys and marks (`doc_read` or
`doc_admin`). For peers that edit staging without a browser,
`RenderField` renders a staged field of the live document per owner
(repository `r` on the document), and `StageBlocks` returns the staging delta
for new blocks (`doc_read` or `doc_admin`). html-carrying data values travel as trees of
`TreeNode`s, or as html in the platform's subset where a request asks for it.

Changes:

- `elephant.collab.v1.CollaborationService` gains `RegisterMirror`,
  `GetMirror`, `DescribeMirror`, `RenderField` and `StageBlocks`, with their
  request and response messages.
- New messages `MirrorVersion`, `MirrorApp`, `MirrorOwnerSpec`,
  `MirrorSeeder`, `MirrorHtmlKey`, `MirrorMark`, `RenderedOwner`,
  `MirrorOwner`, `MirrorBlock`, `MirrorDataValue`, `Tree`, `TreeNode`,
  `DeltaOp` and `XmlTextView`, and the enum `MirrorRegistrationOutcome`.
- `elephant/collab/v1/service.proto` imports
  `google/protobuf/struct.proto`.
- `Subscribe` gains `app_ids`, the application ids the client stages
  under, so the service can tell a client on a superseded major.

## [v0.28.1] - 2026-10-12

**New fields and RPC (tags and metadata on sketches):** a sketch carries
`tags`, a list of strings that classify it, and `metadata`, a flat string
map of application facts about it, both stored outside the document.
`CreateSketchRequest` takes them, `SketchSummary` returns them, and
`ListSketchesRequest.tags` filters the listing to sketches carrying every
listed tag. `UpdateSketchMetadata` replaces both in full, the
`UpdateSketchACL` contract, and requires `w` on the sketch's ACL. Limits:
tags non-empty and at most 64 bytes, at most 32 per sketch; keys at most
64 bytes, values at most 1024 bytes, at most 32 entries. The service does
not interpret tag syntax.

**New RPC (read a sketch without subscribing):**
`elephant.collab.v1.CollaborationService.GetSketch` returns a sketch's
`SketchSummary` and its last saved content as a NewsDoc, the sketch analogue of
reading a repository document. Until now the only way to read a sketch's
content was to subscribe to it. The document is the last materialised copy of
the collaborative state: exact for a sketch with no open session, and up to
the auto-snapshot interval behind while one is being edited, so it is not a
substitute for subscribing. It requires `r` or `w` on the sketch's ACL, or the
`collab_admin` scope.

Changes:

- `elephant.collab.v1.CollaborationService` gains `GetSketch`, with the new
  `GetSketchRequest` (`doc_id`) and `GetSketchResponse` (`sketch`,
  `document`) messages.
- `elephant.collab.v1.CollaborationService` gains `UpdateSketchMetadata`,
  with the new `UpdateSketchMetadataRequest` (`doc_id`, `tags`, `metadata`)
  and `UpdateSketchMetadataResponse` messages.
- `CreateSketchRequest` gains `tags` and `metadata`; `SketchSummary` gains
  `tags` and `metadata`; `ListSketchesRequest` gains `tags`.

## [v0.28.0] - 2026-10-06

**New fields (inbox broadcast):** `elephant.user` gains three additive fields
for the inbox redesign in elephant-user, where messages become addressable to
a unit or an org and one id order spans everything a caller can read.
`PushInboxMessageResponse` gains `id`, the id of the stored message, or of the
message previously stored for the same recipient and payload uuid, since a
repeated push is answered with the existing message rather than a duplicate.
`PollInboxMessagesRequest` and `PollEventLogRequest` gain `size`, the maximum
number of items to return, defaulting to 10 and treated as 100 above that; the
same ceiling now applies to `ListInboxMessagesRequest.size`. No field is
renamed or renumbered, so a generated client built against v0.26.0 keeps
working; what changes on the wire is decided by the elephant-user release that
implements it, not by this declaration.

The comments on the inbox RPCs and messages describe the new semantics: a
recipient may be a user sub, `core://unit/<id>` or `core://org/<id>`; a poll or
list spans the caller's sub, org and units; `is_read`, `updated` and delete are
per caller, and a delete hides the message for the caller only.

Changes:

- `elephant.user.PushInboxMessageResponse` gains `id` (1).
- `elephant.user.PollInboxMessagesRequest` gains `size` (2).
- `elephant.user.PollEventLogRequest` gains `size` (2).

## [v0.27.0] - 2026-10-05

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
