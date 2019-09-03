# Panvala

[![CircleCI](https://circleci.com/gh/ConsenSys/panvala/tree/develop.svg?style=shield)](https://circleci.com/gh/ConsenSys/panvala/tree/develop)

Built by ConsenSys, [Panvala](https://panvala.com) is a platform that helps fund the work that the whole Ethereum community depends on. This Panvala platform is used by PAN token holders to determine which grant applications should be funded using a process called slate governance.

## Documentation
Documentation is available at [https://panvala.gitbook.io/docs](https://panvala.gitbook.io/docs)

## Mainnet Contracts
- Gatekeeper: [0x21C3FAc9b5bF2738909C32ce8e086C2A5e6F5711](https://etherscan.io/address/0x21C3FAc9b5bF2738909C32ce8e086C2A5e6F5711)
- ParameterStore: [0x6a43334331dc689318Af551b0CFD624a8B11A70B](https://etherscan.io/address/0x6a43334331dc689318Af551b0CFD624a8B11A70B)
- TokenCapacitor: [0x9a7B675619d3633304134155c6c976E9b4c1cfB3](https://etherscan.io/address/0x9a7B675619d3633304134155c6c976E9b4c1cfB3)
- Token (PAN): [0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44](https://etherscan.io/address/0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44)


## Release Notes

### 0.5.0

The 0.5.0 release is a large release focused on getting our contracts in an auditable state. While there are quite a few additional features, the focus has the system's contracts and their security.

- Governance slates are now available and users can modify the system's parameters
- Token holders are now able to link hot an cold wallets in order to ensure that voting tokens are kept secure. This is accessible at the /wallet route for now, but will be available elsewhere throughout the user's journey in the near future.
- New logic has been added to handle various ballot edge cases
- Staked tokens on losing slates are now donated to the platforms token capacitor to fund teams doing the work that makes Ethereum safer.
- Incumbants are now tracked in the front-end, to help Panvala token holders identify the parties who are currently responsible for selecting proposals to support
- The system's solution for contract upgradability via decentralized governance has been implemented  (see whitepaper for more details)
- The token capacitor's exponential decay has been implemented, including how this decay changes when tokens are donated (again, see whitepaper for more details)
- Many bug fixes and UI improvements
- More details in changelog

### 0.4.0

- Grant recipients can now retrieve their tokens from the token capacitor
- Tokens staked on a slate can now be retrieved if the slate is approved by token holders. For slates that were not approved, the staked tokens are donated to the token capacitor to fund future grants.
- The staking period for slates is now extended by 50% of the remaining time when a slate is staked. This prevents the equivalent behavior of "ebay sniping" to manipulate the ballot.
- The ballot will now only display staked slates.
- If a slate enters the ballot period uncontested by a competing slate, it will now automatically win the ballot.
- Significant contract work has been added. See changelog for details

### 0.3.0

- *Slate staking* has been added to the application. PAN token holders can now use their PAN tokens to stake on a specific slate to add that slate to Panvala's quarterly ballot. This staking can be be done during the creation of a slate OR afterwards by a seperate third party. For instance, some individuals will want to do the work of recommending a slate, but may not have the requisite tokens to add their slate to the ballot. In that instance, another party can stake their slate.
- Users will now see a system of modals letting them know that their transaction is still processing.
- A new in-app notification system has been added to the application
- Users who have deposited their tokens for voting can now recieve a notification that they need to retrieve these tokens, and are able to retrieve the tokens from the voting contract.
- A bug labelling grant proposals as "undefined proposal" has been resolved.
- Core contracts have been updated and refactored. Full full details, see the changelog. 

### 0.2.0

- Users now have a *notification panel* where they can find important information after signing in with MetaMask.
- *Vote counting* logic and contracts have been implemented.
- Various UI improvements, dependency updates, and bug fixes (more details in Changelog).

### 0.1.0

- The *token capacitor*, a smart contract holding all available tokens for grant allocation, and releasing them on a quarterly schedule.
- Grant applicants are able to create a grant proposal. *Grant proposals* created on the platform are public and can be evaluated by the whole of the Panvala community.
- Grant proposals can be selected by the platform’s token holders who curate lists of grant proposals they recommend to be funded. These lists of grant proposals are called *slates*. 
- Slates themselves can be viewed by the platform’s token holders and evaluated as a part of the platform’s quarterly *ballot*. 
- The platform’s ballot includes a ranked choice voting system that empowers the platform’s token holders to *commit votes* they feel confident in.
- Token holders are able to connect their MetaMask wallet to complete all of the above.


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
