repo_proto_file := repository/service.proto
repo_generated_files := repository/service.pb.go \
	repository/service.twirp.go \
	docs/repository-openapi.json

index_proto_file := index/service.proto index/search_v1.proto
index_generated_files := index/service.pb.go \
	index/search_v1.pb.go \
	index/service.twirp.go \
	docs/index-openapi.json

module := $(shell go list -m)
newsdoc_dir := $(shell go list -m -f '{{.Dir}}' github.com/ttab/newsdoc)

TOOL := docker run --rm \
	-v "$(shell pwd):/usr/src" \
	-u $(shell id -u):$(shell id -g) \
	ghcr.io/ttab/elephant-twirptools:v8.1.3-3

.PHONY: build
build: proto newsdoc/conversion.go

.PHONY: clean
clean:
	rm $(repo_generated_files) $(index_generated_files)

.PHONY: proto
proto: newsdoc/conversion.go $(repo_generated_files) $(index_generated_files)

newsdoc/newsdoc.pb.go: newsdoc/newsdoc.proto
	$(TOOL) protoc --go_out=. \
		--go_opt=module=$(module) \
		newsdoc/newsdoc.proto

$(repo_generated_files): $(repo_proto_file) newsdoc/newsdoc.pb.go Makefile docs
	$(TOOL) protoc --go_out=. --twirp_out=. \
		--openapi3_out=./docs --openapi3_opt=application=repository,version=v0.0.0 \
		$(repo_proto_file)

	$(eval TMP := $(shell mktemp -d))

	$(TOOL) jq '. | del(.servers)' docs/repository-openapi.json > $(TMP)/repo.json
	cp $(TMP)/repo.json docs/repository-openapi.json

	rm -rf $(TMP)

$(index_generated_files): $(index_proto_file) Makefile docs
	$(TOOL) protoc --go_out=. --twirp_out=. \
		--openapi3_out=./docs --openapi3_opt=application=index,version=v0.0.0 \
		$(index_proto_file)

	$(eval TMP := $(shell mktemp -d))

	$(TOOL) jq '. | del(.servers)' docs/index-openapi.json > $(TMP)/index.json
	cp $(TMP)/index.json docs/index-openapi.json

	rm -rf $(TMP)

docs:
	mkdir docs

bin/newsdoc: go.mod
	GOBIN=$(shell pwd)/bin go install github.com/ttab/newsdoc/cmd/newsdoc

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
