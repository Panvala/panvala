#!/bin/sh
set -e
set -u

# build-image REPOSITORY_NAME CONTEXT DOCKERFILE

. scripts/helpers.sh

# export image name for later steps
export FULL_IMAGE_NAME=$(get_image_name "$REPOSITORY_NAME")

echo "building image $FULL_IMAGE_NAME"

tar --exclude=node_modules -czf - ${BUILD_DEPENDENCIES} | docker build -t ${FULL_IMAGE_NAME} --file ${DOCKERFILE} -
