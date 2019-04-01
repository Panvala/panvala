# Panvala

[![CircleCI](https://circleci.com/gh/ConsenSys/panvala/tree/develop.svg?style=shield)](https://circleci.com/gh/ConsenSys/panvala/tree/develop)

Panvala wraps the existing ecosystem of grant funders, corporate open source projects and volunteers with a token that gives them all a shared incentive to find sustainable funding together.

## Documentation
Documentation is available at [https://panvala.gitbook.io/docs](https://panvala.gitbook.io/docs)

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
