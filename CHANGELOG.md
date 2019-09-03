# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
### Changed

## [1.0.0]

This release includes contract changes in response to audit findings, as well as frontend and API changes for compatibility with these contract changes.

The most significant system change is that the first week of the epoch is now a "quiet period" during which no slates can be created. This allows end-of-epoch business such as finalizing contests and executing proposals to happen at a defined time, and for slate creators to have a clearer sense of the state of the system when creating their slates.

In addition, the system is now live on mainnet, with contracts at the following addresses:
- Gatekeeper: [0x21C3FAc9b5bF2738909C32ce8e086C2A5e6F5711](https://etherscan.io/address/0x21C3FAc9b5bF2738909C32ce8e086C2A5e6F5711)
- ParameterStore: [0x6a43334331dc689318Af551b0CFD624a8B11A70B](https://etherscan.io/address/0x6a43334331dc689318Af551b0CFD624a8B11A70B)
- TokenCapacitor: [0x9a7B675619d3633304134155c6c976E9b4c1cfB3](https://etherscan.io/address/0x9a7B675619d3633304134155c6c976E9b4c1cfB3)
- Token (PAN): [0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44](https://etherscan.io/address/0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44)

### Added
- Add support for multiple resources (currently grant and governance)
  - Display grant and governance slates on the `/slates` view
  - Add support for voting on multiple resources at once
    - Store the resource along with vote choices
    - Fix calculation of signature on API
  - Add `/slates/create` route with drop-down to choose the type of slate to create
  - Save the mapping of `Proposal` to `Request` for each resource in the database to make it possible to execute the proposals
- Cache IPFS data in the database for faster access
- Enable "Back" buttons throughout the frontend
- There's a new [panvala.com](https://panvala.com), with its code in the repository
- A new `TimeTraveler` component makes it easier to adjust the current period and epoch in development
- There are now several admin scripts for manipulating the system and checking its status
  - `reveal.js` - reveal ballots stored in the database
  - `setValue.js` - execute governance proposals
  - `finalize.js` - finalize all contests in an epoch
  - `contract-info.js` - print information about the deployed mainnet contracts
  - `epoch-timing.js` - print epoch schedule for many epochs
  - `nukedb.js` - delete database tables
- Add `PANVALA_ENV` environment variable
- Add `/liveness` route to frontend

### Changed
- Many styling improvements in the frontend
- Adjusted liveness and readiness probe parameters to reduce the number of pings
- Indicators for pending transactions and other operations are much improved. They are displayed in more cases, and the stepper shows the number of transactions that will be sent.
- When creating a grant slate, the user can see an estimate of the number of tokens available
- Split slates view into "current" and "past"
- New and improved utilities for timing and voting
- Improved `time-travel.js` script
- Updated token address, name, and symbol. It is now `Panvala pan (PAN)`.
- Updated initial unlocked balance for token capacitor
- Split API tests into separate files

Contract changes (they deserve their own section, see [#184](https://github.com/ConsenSys/panvala/pull/184) for details)

- Initialization
  - Make it harder to do anything before the system is ready
    - Block getters for an uninitialized `ParameterStore` and add a public `initialized` getter
    - Pass the `Gatekeeper` address as an argument to the `TokenCapacitor`
    - Revert in `ParameterStore.init()` if the `gatekeeperAddress` parameter is not set
  - Do not allow the following actions when the gatekeeper is not current:
    - `requestPermission()`
    - `recommendSlate()`
    - `stakeTokens()`
    - `depositVoteTokens()`
    - `finalizeContest()`
- Slate creation
  - Disallow creation of requests in the Gatekeeper outside of the slate submission period
  - Do not allow slates to be created with old requests (from a previous epoch)
- TokenCapacitor balance unlocking
  - Fix bug where someone could cause tokens never to be unlocked by repeatedly calling updateBalances() before 24 hours had passed
  - Set the lastLockedTime in intervals of 24 hours, relative to the system start
- Finalization
  - Only allow finalization after the epoch is over
  - Add a quiet period before slate submission period (for finalization)
  - Do not explicitly reject slates -- remove `SlateStatus.Rejected`
  - Keep a running tally of voting results as users reveal, so that finalization can happen in a single step. This removes the public `finalizeRunoff()` and `ContestStatus.RunoffPending`.
  - Incrementally donate slate stakes
- Other contract improvements
  - Rename `tokenCapacitorAddress` parameter to `stakeDonationAddress` and add a generic `IDonationReceiver` interface to define contracts that implement the `donate()` function.
  - Pin Solidity version
  - Replace mappings with arrays
  - Make `TokenCapacitor.scale` constant
  - Added various checks on user input
  - Some refactoring for efficiency


## [0.5.0] 2019-07-09

### Added
- Users can assign an address as a delegate to commit ballots on behalf of a token-holding account at `/wallet`
- Slates cards indicate if they were created by the incumbent
- Current system parameters are displayed at `/parameters`
- Contracts:
  - Allow a user to delegate their voting rights, and allow a delegate to vote on behalf of the voter
  - Store the incumbent for each resource
  - Users can create proposals to change governance parameters
  - Token capacitor releases tokens into the unlocked pool for withdrawal according to an exponential decay
  - Requests made to the gatekeeper expire after an epoch (if created in epoch `n`, they expire at the start of epoch `n + 2`)

### Changed
- Only recommenders that have been verified have their organization name shown on slate cards
- Improve loading of the initial slate
  - Decouple unrelated sets of state
  - Allow users to view the slates without having MetaMask installed
- Many improvements to styling and component organization
- Increase the initial staking requirement to 50,000 PAN
- Contracts:
  - Replace `category` concept with `resource` (the address of the contract requesting permission)
  - Modify the [permissions API](docs/permissions-api.md) to allow for multiple parallel contests and upgrading of the gatekeeper
  - Include IPFS hash for [metadata for losing stake donations](governance-contracts/data/losingSlateDonation.json)
  - In the case where a contest has a vote but no one commits, reject all the slates in the contest
  - Add integration tests
    - Running multiple parallel contests
    - "Clean break" and data-migrating gatekeeper upgrades
    - Finalization of a contest with many slates
  - Fix: calculation of slate deadline extension
  - Fix: bug in triggering runoff
  - Fix: bug in runoff tiebreaker count
  - General cleanup: rename functions, events, and fields for clarity, and consolidate finalization events
  - Improvements to tests, particularly event checking
    - Use base token amounts in tests


## [0.4.0] 2019-06-06

### Added
- Recommenders can stake on their slates as they are creating them instead of waiting for someone to do it later
- Add admin scripts to reveal ballots and tally votes
- Greatly expanded notifications to include the following types
  - Proposal Recommended
  - Grant Proposal Not Funded
  - Slate Adopted
  - Slate Not Adopted
  - Ballot Opened
  - Ballot Concluded
  - Action Required: Withdraw Voting Tokens
  - Action Required: Withdraw Staked Tokens
  - Action Required: Withdraw Grant Proposal Tokens
- Add Typescript types for the contracts using typechain
- Add form for creating governance slates
  - `/slates/create` now lets you choose the type of slate you want to create
  - `/slates/create/grant` and `/slates/create/governance` point to the forms
- Contracts: unopposed slates automatically win
- Contracts: enforce slate submission and voting (commit, reveal) periods
  - Extend the slate submission period each time someone stakes on a slate. Extension is half the time until voting starts.
- Contracts: temporarily add an owner who can shift the start time (and therefore the current position in the timeline). This feature is to be removed in the final version.

### Changed
- Only display staked slates on the ballot
- Make more fields optional when creating grant proposals -- `totalBudget` and `otherFunding`
- Fix: do not display email addresses, and do not return them from the API
- Fix: do not allow a slate to be stake multiple times
- Improve the pending transaction flow
- Improve error handling in IPFS fetching
- Many improvements to state updating in the frontend
- Add/update routes, splitting `/withdraw/{id}` into separate routes
  - `/slates/{slateID}/stake` - stake on a slate
  - `/withdraw/stake/{slateID}` - withdraw stake for a slate
  - `/withdraw/grant/{proposalID}` - withdraw tokens for a grant
  - `/withdraw/voting` - withdraw voting tokens
- Upgrade Sequelize and Axios to address security issues
- Improved definition of styles using styled-system
- Contracts: only include staked slates when determining the state of a contest, and only count votes for staked slates

## [0.3.0] 2019-05-17

### Changed
- Fix `UNDEFINED PROPOSAL` label on proposals when creating a slate
- Make sure the stake amount is consistent throughout the interface
- Refactor contract deployment and initialization
  - The Gatekeeper and the TokenCapacitor now look for the addresses of other contracts they need to read from in the ParameterStore
  - Allow values in the ParameterStore to be set by its creator until it is initialized
  - Split migrations into multiple files
- Update contracts (Rinkeby)
  - Gatekeeper: [0xCd292291B7FcC3589836e5EAaFe85Ac72A59c07C](https://rinkeby.etherscan.io/address/0xCd292291B7FcC3589836e5EAaFe85Ac72A59c07C)
  - ParameterStore: [0x8699127464fd6188eCc776c3ca522f3CF21C4976](https://rinkeby.etherscan.io/address/0x8699127464fd6188eCc776c3ca522f3CF21C4976)
  - TokenCapacitor: [0x261d6b23711E1a7450e415AA522AEf6979B360A0](https://rinkeby.etherscan.io/address/0x261d6b23711E1a7450e415AA522AEf6979B360A0)

### Added
- Notification panel that alerts the user about events and actions they need to take
- Slate staking interface is now active
- A stepper component to guide the user through transactions
- Indicator for pending transaction so the user knows something is happening
- Contracts: allow users to withdraw their grants from the token capacitor
- Contracts: allow users to withdraw their voting tokens
- Contracts: allow donations to the token capacitor
- Contracts: allow stakers of winning slates to withdraw their stakes when the contest is finalized
- Contracts: donate losing stakes to the token capacitor

## [0.2.0] 2019-04-26

### Changed
- Fix `ipfs-mini` was using wrong URL format - switched to `ipfs-http-client`
- Forcing use of Node 10 for API
- Fix incorrect display of slate submitter address on main page ([#40](https://github.com/ConsenSys/panvala/issues/40))
- Fix saving of proposal multihashes in slate metadata
- Slates viewed on ballot now open in new window.

### Added
- Direct links to slates and proposals
- Contracts: implement ballot reveal
- Contracts: implement vote counting
- Contracts: implement slate staking

## [0.1.0] - 2019-04-02

[Unreleased]: https://github.com/ConsenSys/panvala/compare/v1.0.0...develop
[1.0.0]: https://github.com/ConsenSys/panvala/releases/tag/v1.0.0
[0.5.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.5.0
[0.4.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.4.0
[0.3.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.3.0
[0.2.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.2.0
[0.1.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.1.0
