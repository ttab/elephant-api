proto_file := repository/service.proto
generated_files := repository/service.pb.go \
	repository/service.twirp.go \
	docs/repository-openapi.json
newsdoc_dir := $(shell go list -m -f '{{.Dir}}' github.com/ttab/newsdoc)

pwd := $(shell pwd)
UID := $(shell id -u)
GID := $(shell id -g)

.PHONY: proto
proto: $(generated_files)

$(generated_files): $(proto_file) Dockerfile Makefile docs
	docker build . -f Dockerfile -t docformat-generator:latest \
		--build-arg protoc_version=3.21.9-r0
	docker run --rm -v "${PWD}:/usr/src" -u $(UID):$(GID) \
		docformat-generator:latest \
		protoc --go_out=. --twirp_out=. \
		--openapi3_out=./docs --openapi3_opt=application=repository,version=v0.0.0 \
		$(proto_file)
	jq '. | del(.servers)' docs/repository-openapi.json \
		| sponge docs/repository-openapi.json

docs:
	mkdir docs

bin/newsdoc: go.mod
	GOBIN=$(pwd)/bin go install github.com/ttab/newsdoc/cmd/newsdoc

repository/conversion.go: bin/newsdoc $(newsdoc_dir)/doc.go
	./bin/newsdoc rpc-conversion \
		--source $(newsdoc_dir)/doc.go --package repository \
		> repository/conversion.go
