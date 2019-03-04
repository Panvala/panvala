#!/bin/sh
set -e


export REPOSITORY_NAME="panvala/frontend"
# relative to root
export CONTEXT=client
export DOCKERFILE=docker/frontend/Dockerfile


# build-image REPOSITORY_NAME CONTEXT DOCKERFILE
scripts/build-image.sh
