#!/bin/sh
set -e
set -u

get_image_registry() {
    REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
    echo "${REGISTRY}"
}

get_image_tag() {
    TAG=${CIRCLE_SHA1:-$(git rev-parse HEAD)}
    echo "${TAG}"
}

get_image_name() {
    REPOSITORY_NAME=$1
    TAG=${CIRCLE_SHA1:-$(git rev-parse HEAD)}

    # calculate the image name for AWS
    REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
    IMAGE_NAME="${REGISTRY}/${REPOSITORY_NAME}"

    # export for later steps
    export FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"
    echo "$FULL_IMAGE_NAME"
}

# deploy_api ENVIRONMENT
# Environment is staging or production
# Creates service panvala-api-${ENVIRONMENT}
deploy_api() {
    ENVIRONMENT=$1
    TAG=$(get_image_tag panvala/api)
    REPO="$(get_image_registry)/panvala/api"
    APP="panvala-api"

    helm upgrade --install \
        --set environment=${ENVIRONMENT} \
        --set image.tag=${TAG} \
        --set image.repository=${REPO} \
        --set databasePassword=${DATABASE_PASSWORD} \
        --set databaseUser=${DATABASE_USER} \
        --namespace ${ENVIRONMENT} \
        ${APP}-${ENVIRONMENT} \
        ./charts/${APP}
}

# deploy_frontend ENVIRONMENT
# Environment is staging or production
# Creates service panvala-api-${ENVIRONMENT}
deploy_frontend() {
    ENVIRONMENT=$1
    REPO="$(get_image_registry)/panvala/frontend"
    TAG=$(get_image_tag panvala/frontend)
    APP="panvala-frontend"

    helm upgrade --install \
        --set environment=${ENVIRONMENT} \
        --set apiHost=${API_HOST} \
        --set image.tag=${TAG} \
        --set image.repository=${REPO} \
        --set service.type=LoadBalancer \
        --namespace ${ENVIRONMENT} \
        ${APP}-${ENVIRONMENT} \
        ./charts/${APP}
}

install_helm() {
    HELM_URL=https://storage.googleapis.com/kubernetes-helm/helm-v2.12.3-linux-amd64.tar.gz
    HELM_ARCHIVE=helm-v2.12.3-linux-amd64.tar.gz
    curl -o $HELM_ARCHIVE $HELM_URL
    curl -o $HELM_ARCHIVE.sha256 ${HELM_URL}.sha256
    openssl sha1 -sha256 $HELM_ARCHIVE
    tar -zxf $HELM_ARCHIVE
    cd linux-amd64
    chmod +x helm
    sudo mv ./helm /usr/local/bin/helm

    helm init --client-only
    sleep 3
    helm version
}

kube_config() {
    aws --version
    login=$(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
    ${login}

    aws eks update-kubeconfig --name $EKS_CLUSTER_NAME
}

