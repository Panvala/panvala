FROM mhart/alpine-node

# application will be installed here
WORKDIR /srv


# install dependencies
COPY package.json .
RUN yarn

# copy our code to the server
COPY . .

# build
RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]
