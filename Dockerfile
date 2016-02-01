FROM timeinc.artifactoryonline.com/timeinc/ape-dev-docker-node-service
MAINTAINER Time Inc <schoonover@timeinc.com>

COPY ./ /app

# everything below this line is because current node module selection mutates
# the local file system
RUN chown -R express /app && \
    chmod -R 755 /app

# copy .npmrc so that npm install will work
COPY ./.npmrc /root/.npmrc

# git required by npm install
RUN apt-get update -y && \
    apt-get install -y git

# run npm install in container
RUN cd /app && \
    rm -rf ./node_modules

USER express
RUN npm install
USER root

# remove .npmrc
RUN rm /root/.npmrc
