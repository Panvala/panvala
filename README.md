# Panvala

[![CircleCI](https://circleci.com/gh/ConsenSys/panvala/tree/develop.svg?style=shield)](https://circleci.com/gh/ConsenSys/panvala/tree/develop)

Initiated by ConsenSys, [Panvala](https://panvala.com) is a decentralized foundation that funds the work the Ethereum ecosystem depends on. This app is used by PAN token holders to determine which grant applications should be funded using a process called slate governance.

Version 1 of the application contains four object types: proposals, grant slates, governance slates, and ballots. For those looking to receive a grant, proposals can be added directly into the application to be displayed publicly, or they can be sent directly to a slate creator (the later option affords the grant proposer more privacy in the consideration of their proposal). 

After proposals are added to the system, a slate creator selects the proposals they wish to add to their slate. During (or after) the creation of a slate, that slate must be staked to be added to the ballot. An unstaked slate can also be created, but that slate won't appear on the ballot during the voting period.

Governance slates are added in the same way, but adjust a specific parameter that token holders might want to see adjusted. For example, the required number of tokens to stake a slate is a parameter that can be adjusted via a token holder vote.

The system will progress through four stages: Slate Submission, Intermission, Commit Voting, and Vote Reveal. These stages are repeated across each epoch. At the time of writing, Panvala is in its fourth epoch. During the commit voting stage, the token holders can vote using their tokens for one slate or porposals or another. Only one grant slate and one governance slate will win per quarter. The system also uses a first choice, second choice run-off voting system that enables the token holders to support a favorite slate without wasting their vote.

To learn more, read Panvala's wihtepaper here: https://www.panvala.com/img/docs/Panvala%20Whitepaper%20(June%2026).pdf

## Documentation
Documentation is available at [https://panvala.gitbook.io/docs](https://panvala.gitbook.io/docs)

## Mainnet Contracts
- Gatekeeper: [0x21C3FAc9b5bF2738909C32ce8e086C2A5e6F5711](https://etherscan.io/address/0x21C3FAc9b5bF2738909C32ce8e086C2A5e6F5711)
- ParameterStore: [0x6a43334331dc689318Af551b0CFD624a8B11A70B](https://etherscan.io/address/0x6a43334331dc689318Af551b0CFD624a8B11A70B)
- TokenCapacitor: [0x9a7B675619d3633304134155c6c976E9b4c1cfB3](https://etherscan.io/address/0x9a7B675619d3633304134155c6c976E9b4c1cfB3)
- Token (PAN): [0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44](https://etherscan.io/address/0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44)


## Quickstart
Set up your environment for local development.

First, install the following prerequisites:
- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

If you're on MacOS, you can get both of these from Homebrew
```shell
brew install node yarn
```

### Local blockchain and contracts
Install [Ganache](https://truffleframework.com/ganache) (recommended) or [ganache-cli](https://github.com/trufflesuite/ganache-cli). Start Ganache.

Install [Truffle](https://github.com/trufflesuite/truffle) for deploying contracts and running tests.

```shell
npm install -g truffle
```

Install dependencies, compile, and deploy the governance contracts to Ganache.
```shell
cd governance-contracts
yarn install
truffle migrate --network ganache
```
You should see output with the contract addresses for the `Gatekeeper` and the `TokenCapacitor`. Save these values for later configuration steps.

### Set up the database
The Panvala API uses [PostgreSQL](https://www.postgresql.org/) for its database, so you'll need to run an instance to use it.

#### Run with Docker
The easiest way to run PostgreSQL is to use [Docker](https://www.docker.com/products/docker-desktop). You'll need to install it separately. 

Create a file `docker/postgres/postgres.env` with the following environment variables:

```
# docker/postgres/postgres.env
POSTGRES_USER=panvala_devel
POSTGRES_PASSWORD=panvala
POSTGRES_DB=panvala_api
```
You can set the `POSTGRES_PASSWORD` and `POSTGRES_DB` to anything, but `POSTGRES_USER` must be `panvala_devel`.

Now, you can start the database by running the included script from the root of the repository.

```shell
scripts/dev/start-db.sh
```

#### Standalone
Alternatively, if you have a PostgreSQL server running on your machine, you can use it. You will need to create a user `panvala_devel` and set a password.

### Configure the applications
We recommend creating a `.env` file somewhere outside the repository with the required values, and sourcing it to set the environment variables. Note that `DB_PASSWORD` must equal `POSTGRES_PASSWORD` from the previous step.

Fill in the `GATEKEEPER_ADDRESS` and `TOKEN_CAPACITOR_ADDRESS` with the values you got from deploying to Ganache.

```shell
# panvala.env

## API
DB_PASSWORD=panvala
DB_NAME=panvala_api

## Frontend
API_HOST=http://localhost:5000

## Ethereum
RPC_ENDPOINT=http://localhost:7545  # default Ganache endpoint
GATEKEEPER_ADDRESS={your-deployed-gatekeeper}
TOKEN_CAPACITOR_ADDRESS={your-deployed-capacitor}

## IPFS (optional)
IPFS_HOST=ipfs.infura.io
IPFS_PORT=5001
```

Set the environment by sourcing the file:
```shell
source <path-to-panvala.env>
```
You will need to do this each time you start the API or the frontend in a new terminal, or add this line to your shell startup script (e.g. `.bashrc`).

## Start the API
Install dependencies and set up the database tables. Remember to source the `.env` file first.

```shell
cd api/
source <path-to-panvala.env>
yarn install
# yarn db:create (if it does not already exist)
yarn migrate
yarn start
```

You should be able to reach the API in your browser at http://localhost:5000. To verify that it is properly connected to your database and blockchain, visit http://localhost:5000/ready. You should see the response `ok` if everything is fine. Otherwise, any errors should be printed to the terminal.


## Set up MetaMask
To interact with your contracts through the web application, install the [MetaMask](https://metamask.io/) browser extension.

First, you'll need to add your local Ganache network by clicking the network dropdown (it says something like "Mainnet") and selecting "Custom RPC". Scroll down to "New Network", put `http://127.0.0.1:7545` (or whatever your Ganache instance is running on) into the "New RPC URL" field, and save.

Next, you need to import a private key from your network into MetaMask. In Ganache, select the accounts tab, click the key icon next to the first address, and copy the private key. In MetaMask, click the account icon in the upper right and select "Import account". Paste the private key into the field. Give the account a recognizable name.


## Start the frontend
```shell
cd client/
source <path-to-panvala.env>
yarn install
yarn dev
```

You should be able to visit the application in your browser at http://localhost:3000 and receive a prompt to let the application connect to MetaMask.
