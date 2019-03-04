#!/bin/sh
set -e


export REPOSITORY_NAME="panvala/api"
# relative to root
export CONTEXT=api
export DOCKERFILE=docker/api/Dockerfile


# build-image REPOSITORY_NAME CONTEXT DOCKERFILE
scripts/build-image.sh
