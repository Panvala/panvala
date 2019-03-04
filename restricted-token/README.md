# Restricted Panvala Token

A token that can only be sent to approved accounts.

## Introduction

This is a [Solidity](https://solidity.readthedocs.io/en/latest/) project using [Truffle](https://truffleframework.com/truffle). It also uses:

* [SolHint](https://protofire.github.io/solhint/) to lint Solidity code
* [ESLint](https://eslint.org) with [Airbnb style](https://github.com/airbnb/javascript) to lint JavaScript tests
* [solidity-coverage](https://github.com/sc-forks/solidity-coverage) for test coverage
* [EthPM](https://www.ethpm.com/registry) for Solidity package management
* [Travis CI](https://travis-ci.com/) for continuous integration

## Usage
Install the dependencies.
```
yarn install
```

Compile contracts and run tests (you must have an Ethereum node running).
```
yarn test
```

### Deployment
To deploy, edit `conf/config.json` with the details of your token. `initialTokens` is the number of tokens you want to be available (e.g. 50 million) -- the total supply will be calculated as `initalTokens * 10 ^ decimals`.

Then, deploy to the network of your choice:
```shell
truffle migrate --network rinkeby
```
