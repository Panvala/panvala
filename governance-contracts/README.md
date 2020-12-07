# Panvala Governance Contracts

A set of contracts for Panvala governance.

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

# Usage SubGraph

Compile SubGraph
```
yarn codegen
```

Build Subgraph

```
yarn build
```

Deploy Panvala Subgraph

```
graph deploy \              
    --debug \
    --node https://api.thegraph.com/deploy/ \
    --ipfs https://api.thegraph.com/ipfs/ \
    panvala/panvala-subgraph --access-token <access-token>
```