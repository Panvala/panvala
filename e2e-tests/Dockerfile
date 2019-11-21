FROM ubuntu:18.04

USER root

WORKDIR /e2e-tests

RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    nodejs \
    yarn \
    x11vnc \
    xvfb \
    fluxbox \
    wget

ARG CHROME_VERSION=78.0.3904.97
RUN wget https://www.slimjet.com/chrome/download-chrome.php?file=files%2F$CHROME_VERSION%2Fgoogle-chrome-stable_current_amd64.deb; \
	apt install -y ./*google-chrome*.deb;

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
COPY ./ .

EXPOSE 5900

CMD ["sh", "/e2e-tests/bootstrap.sh"]