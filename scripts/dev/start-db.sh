#!/bin/sh
# start the database container

set -e
set -u

cd docker || exit

IMAGE=postgres:10

wd=$(pwd)

docker run --rm \
    --name pg-docker \
    -p 5432:5432 \
    -v ${wd}/postgres/data:/var/lib/postgresql/data \
    --env-file ${wd}/postgres/postgres.env \
    "${IMAGE}"
