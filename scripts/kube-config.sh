#!/bin/sh

set -e
set -u

aws --version
login=$(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
${login}

aws eks update-kubeconfig --name $EKS_CLUSTER_NAME
