generated_files = repository/service.pb.go \
	repository/service.twirp.go \
	docs/repository-openapi.json

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
		repository/service.proto
	jq '. | del(.servers)' docs/repository-openapi.json \
		| sponge docs/repository-openapi.json

docs:
	mkdir docs
