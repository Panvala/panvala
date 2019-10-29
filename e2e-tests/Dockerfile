FROM ubuntu:18.04

USER root

WORKDIR /e2e-tests

RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y \
    nodejs \
    yarn

ARG CHROME_VERSION=76.0.3809.100
RUN apt-get install -y wget
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add \
      && wget https://www.slimjet.com/chrome/download-chrome.php?file=files%2F$CHROME_VERSION%2Fgoogle-chrome-stable_current_amd64.deb \
      && dpkg -i download-chrome*.deb || true
RUN apt-get install -y -f \
      && rm -rf /var/lib/apt/lists/*

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y x11vnc \
    xvfb \
    fluxbox

COPY ./package.json .
RUN npm install
COPY ./ .

EXPOSE 5900

CMD ["sh", "/e2e-tests/bootstrap.sh"]