#!/bin/sh
set -e

# deploy-image REPOSITORY_NAME
. ./scripts/helpers.sh

IMAGE=$(get_image_name $REPOSITORY_NAME)

# execute login
aws --version
login=$(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
${login}

# push
echo "Pushing image $IMAGE for repository $REPOSITORY_NAME"
docker push "$IMAGE"
