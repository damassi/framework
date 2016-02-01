#!/bin/bash

set -e

cat <<EOF> ~/.npmrc
registry=http://timeinc.artifactoryonline.com/timeinc/api/npm/npm
_auth = $ARTIFACTORY_NPM_AUTH
email = noreply@timeinc.com
always-auth = true
EOF

# so we have a path relative to Dockerfile that is consistent
# need this for apps that need to npm install during docker build execution
ln ~/.npmrc ./.npmrc
