# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

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

[Unreleased]: https://github.com/ConsenSys/panvala/compare/v0.3.0...develop
[0.3.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.3.0
[0.2.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.2.0
[0.1.0]: https://github.com/ConsenSys/panvala/releases/tag/v0.1.0
