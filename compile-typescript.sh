#!/usr/bin/env zsh

set -euxo pipefail

# Build the docker image, just temporary, should live in a separate repo.
docker buildx build \
       -t node-protobuf --load \
       --build-arg="protoc_version=24.4-r1" ./typescript

node_modules=$(mktemp -d -t)

function cleanup {
    rm -fr $node_modules
    rmdir node_modules
}

trap cleanup EXIT

docker run --rm \
       -v "$(pwd):/usr/src" \
       -v "${node_modules}:/usr/src/node_modules" \
       -u "$(id -u):$(id -u)" \
       -w "/usr/src" \
       node-protobuf sh -c "npm install"

for api in repository index; do
    docker run --rm \
           -v "$(pwd):/usr/src" \
           -v "${node_modules}:/usr/src/node_modules" \
           -u "$(id -u):$(id -u)" \
           -w "/usr/src" \
           node-protobuf protoc \
           --ts_out typescript/ \
           --ts_opt generate_dependencies \
           --ts_opt ts_nocheck \
           --ts_opt eslint_disable \
           --proto_path /usr/src \
           --twirp_ts_out typescript/ \
           ${api}/service.proto
done
