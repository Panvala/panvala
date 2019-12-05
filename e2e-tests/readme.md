# Panvala test project

Tests for Panvala using selenium webdriver and cucumber-js

## Tools

- [Cucumber](https://github.com/cucumber/cucumber-js)
- [Selenium WebDriver](https://github.com/SeleniumHQ/selenium)
- [Chrome Driver](https://github.com/giggio/node-chromedriver)
- [Chai](https://github.com/chaijs/chai)
- [MetaMask](https://github.com/MetaMask/metamask-extension)

## Installation

```
npm install
```

## Prerequisite

### Create a MetaMask account
Once it's downloaded, you should be automatically directed to a welcome page.

Follow the get started wizard. Take note of your seed and password.

Once your MetaMask setup is complete, you should be redirected to your newly created Ethereum wallet.

### Configuring the tests
We recommend creating a `.env` file somewhere outside the repository with the required values, and sourcing it to set the environment variables.

Fill in the `SEED` of the MetaMask wallet you would like to import.

Fill in the `PASSWORD` to login the MetaMask wallet.

```shell
export BROWSER=chrome
export EXTENSION=MetaMask_v7.5.3.crx
export PANVALA_APP_URL=http://localhost:3000
export PANVALA_WEB_URL=http://localhost:8000
export PANVALA_ENV=local
export METAMASK_URL=chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn
export METAMASK_PASSWORD={PASSWORD}
export METAMASK_SEED={SEED}
export METAMASK_NETWORK_NAME=Panvala Test Network
export METAMASK_NETWORK_URL=http://localhost:7545
```

## Running the tests

```
npm test
```
