#!/bin/sh
set -e
set -u

. scripts/helpers.sh

export REPOSITORY_NAME="panvala/frontend"
export DOCKERFILE=docker/frontend/Dockerfile
# Control the build context by only sending dependencies
export BUILD_DEPENDENCIES="./client ./packages ./${DOCKERFILE}"



# export image name for later steps
export FULL_IMAGE_NAME=$(get_image_name "$REPOSITORY_NAME")


# echo "building image $FULL_IMAGE_NAME"

# tar --exclude=node_modules -czf - ${dependencies} | docker build -t ${FULL_IMAGE_NAME} --file ${DOCKERFILE} -

scripts/build-image.sh
