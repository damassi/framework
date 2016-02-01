#!/bin/bash

set -e

cat <<EOF> ~/.dockercfg
{
  "https://timeinc.artifactoryonline.com" : {
    "auth" : "$ARTIFACTORY_DOCKER_AUTH",
    "email" : "noreply@timeinc.com"
  }
}
EOF
