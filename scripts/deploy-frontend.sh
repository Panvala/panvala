#!/bin/sh

# deploy frontend
# deploy-frontend.sh ENVIRONMENT
# Environment is staging or production
# Creates service panvala-frontend-${ENVIRONMENT}
set -u
set -e

. scripts/helpers.sh


# Deploy
deploy() {
    ENVIRONMENT=$1
    TAG=$(get_image_tag panvala/frontend)
    REPO="$(get_image_registry)/panvala/frontend"
    APP="panvala-frontend"

    HOST=${API_HOST}

    # HACK: if staging, use a different variable
    if [ "${ENVIRONMENT}" = "staging" ]
    then
       HOST=${STAGING_API_HOST}
    fi


    helm upgrade --install \
        --namespace ${ENVIRONMENT} \
        --set environment=${ENVIRONMENT} \
        --set image.tag=${TAG} \
        --set image.repository=${REPO} \
        --set service.type=LoadBalancer \
        --set apiHost=${HOST} \
        --set nameOverride="${APP}" \
        --set fullnameOverride="${APP}" \
        "${APP}-${ENVIRONMENT}" \
        ./charts/${APP}
}

deploy $1
