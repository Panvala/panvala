#!/bin/sh

. ./scripts/helpers.sh

IMAGE=$(get_image_name panvala/frontend)

docker run --rm --name built-image "$IMAGE" yarn test
