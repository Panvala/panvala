#!/bin/sh

. ./scripts/helpers.sh

IMAGE=$(get_image_name panvala/api)

docker run --rm --name built-image "$IMAGE" yarn test
