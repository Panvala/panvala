FROM mhart/alpine-node

# application will be installed here
WORKDIR /srv

# install curl
RUN apk add --update curl && rm -rf /var/cache/apk/*

# copy shared libs and run install
COPY ./packages/panvala-utils/ ../packages/panvala-utils
RUN cd ../packages/panvala-utils && yarn

# install dependencies
COPY ./client/package.json .
COPY ./client/yarn.lock .
RUN yarn

# copy our code to the server
COPY ./client .

# build
RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]
