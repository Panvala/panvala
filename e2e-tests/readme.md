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

## Configuring the tests
Create a `e2e-tests/config/Environment.json` file.

Fill in the `PASSWORD` and `SEED` of the metamask wallet you would like to import.

```json
{
  "browser": "chrome",
  "environment": {
    "api": {
      "url": "http://localhost:3001"
    },
    "web": {
      "url": "http://localhost:3000"
    }
  },
  "metamask": {
    "password": "{PASSWORD}",
    "url": "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn",
    "crx": "lib/MetaMask_7.0.1_0.crx",
    "seed" : "{SEED}",
    "network": {
      "name": "Panvala Test Network",
      "url": "http://127.0.0.1:7545"
    }
  }
}

```

## Running the tests

```
npm test
```
