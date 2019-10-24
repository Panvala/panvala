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

### Create a Chrome Profile
In Chrome, click on the Chrome three dots button icon in the upper-right hand corner and select Settings.

Under the People section, click Add person. 

Choose an avatar for yourself and then give your profile a name.

### Install MetaMask Extension
Open the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions).

Search and select the MetaMask extension.

Click Add to Chrome.

### Create a MetaMask account
Once it's downloaded, you should be automatically directed to a welcome page.

Follow the get started wizard.

Once your MetaMask setup is complete, you should be redirected to your newly created Ethereum wallet.

### Add a Custom network
Create a custom RPC network

Name: `Panvala Test Network` 

Url: `http://127.0.0.1:7545`

### Configuring the tests
Create a `e2e-tests/config/Environment.json` file.

```json
{
  "driver": {
    "browser": "chrome",
    "extension": "{METAMASK_EXTENSION_PATH}",
    "profile": "{CHROME_PROFILE_PATH}",
    "profileDir": "{PROFILE_DIRECTORY}"
  },
  "environment": {
    "api": {
      "url": "http://localhost:3001"
    },
    "web": {
      "url": "http://localhost:3000"
    }
  },
  "metamask": {
    "seed": "{SEED}",
    "password": "{PASSWORD}",
    "url": "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn",
    "network": {
      "name": "Panvala Test Network",
      "url": "http://localhost:7545"
    }
  }
}
```

Fill in the `METAMASK_EXTENSION_PATH` of the MetaMask extension.

Example MetaMask extension path: `/Users/peteryinusa/Desktop/Consensys/panvala/e2e-tests/lib/MetaMask_v7.3.1.crx`

Fill in the `CHROME_PROFILE_PATH` and the `PROFILE_DIRECTORY` of you Chrome profile with the MetaMask extension installed.

Example Chrome profile path: `/Users/{USERNAME}/Library/Application Support/Google/Chrome`

Example Chrome profile directory: `Profile 1`

Fill in the `SEED` of the MetaMask wallet you would like to import.

Fill in the `PASSWORD` to login the MetaMask wallet.

## Running the tests

```
npm test
```
