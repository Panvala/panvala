FROM ubuntu:18.04
# mhart/alpine-node

# application will be installed here
WORKDIR /srv

# Install Postgres, Node


RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list


# RUN apt-get update && apt remove -y cmdtest && apt-get install -y \
RUN apt-get update && apt-get install -y \
    postgresql-client \
    nodejs \
    yarn

# Install node dependencies
COPY package.json .
RUN ls
RUN yarn

# copy our code to the server
COPY . .


EXPOSE 5000

CMD ["yarn", "start"]
