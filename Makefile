proto_file := repository/service.proto
generated_files := repository/service.pb.go \
	repository/service.twirp.go \
	docs/repository-openapi.json

module := $(shell go list -m)
newsdoc_dir := $(shell go list -m -f '{{.Dir}}' github.com/ttab/newsdoc)

TOOL := docker run --rm \
	-v "$(shell pwd):/usr/src" \
	-u $(shell id -u):$(shell id -g) \
	ghcr.io/ttab/elephant-twirptools:v8.1.3-0

.PHONY: build
build: proto newsdoc/conversion.go

.PHONY: proto
proto: $(generated_files)

$(generated_files): $(proto_file) newsdoc/newsdoc.proto Makefile docs
	$(TOOL) protoc --go_out=. \
		--go_opt=module=$(module) \
		newsdoc/newsdoc.proto
	$(TOOL) protoc --go_out=. --twirp_out=. \
		--openapi3_out=./docs --openapi3_opt=application=repository,version=v0.0.0 \
		$(proto_file)

	$(eval TMP := $(shell mktemp -d))

	$(TOOL) jq '. | del(.servers)' docs/repository-openapi.json > $(TMP)/repo.json
	cp $(TMP)/repo.json docs/repository-openapi.json

	rm -rf $(TMP)

docs:
	mkdir docs

bin/newsdoc: go.mod
	GOBIN=$(pwd)/bin go install github.com/ttab/newsdoc/cmd/newsdoc

newsdoc/newsdoc.proto: bin/newsdoc
	./bin/newsdoc protobuf \
		--source $(newsdoc_dir)/doc.go \
		--package newsdoc \
		-o go_package=$(module)/newsdoc \
		> newsdoc/newsdoc.proto

newsdoc/conversion.go: bin/newsdoc $(newsdoc_dir)/doc.go
	./bin/newsdoc rpc-conversion \
		--source $(newsdoc_dir)/doc.go --package newsdoc \
		> newsdoc/conversion.go
