#!/bin/sh
set -e


export REPOSITORY_NAME="panvala/api"
export DOCKERFILE=docker/api/Dockerfile
# Control the build context
export BUILD_DEPENDENCIES="./api ./packages ./docker/api/Dockerfile"


# build-image REPOSITORY_NAME CONTEXT DOCKERFILE
scripts/build-image.sh
