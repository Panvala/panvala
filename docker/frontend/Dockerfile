FROM mhart/alpine-node

# application will be installed here
WORKDIR /srv

# install curl
RUN apk add --update curl && rm -rf /var/cache/apk/*

# install dependencies
COPY ./client/package.json .
RUN yarn

# copy shared libs
COPY ./packages/panvala-utils/ ../packages/panvala-utils

# copy our code to the server
COPY ./client .

# build
RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]
