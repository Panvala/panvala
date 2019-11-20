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
Create a `e2e-tests/config/Environment.json` file.

```json
{
  "driver": {
    "browser": "chrome",
    "extension": "MetaMask_v7.5.3.crx"
  },
  "environment": {
    "web": {
      "url": "https://staging.panvala.com"
    }
  },
  "metamask": {
    "seed": "{SEED}",
    "password": "{PASSWORD}",
    "url": "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn"
  }
}
```

Fill in the `SEED` of the MetaMask wallet you would like to import.

Fill in the `PASSWORD` to login the MetaMask wallet.

## Running the tests

```
npm test
```
