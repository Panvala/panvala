Feature: Storage

Background: MetaMask Wallet
  Given I have a MetaMask wallet
  And I have connected my wallet with Panvala

Scenario: Mainnet Beta warning modal is shown
  When I navigate to the slates page
  Then The "Hello" modal dialog is displayed reading
  """
  Panvala is in Beta and on the Ethereum Mainnet. Use it wisely. Don't store more crypto than you need and only share data with people you trust. By using the app you assume full responsibility for all risks concerning your data and funds.
  """
  Then The session storage item "CLOSED_MAINNET_MODAL" does not exist

  When I accept the modal dialog
  Then The modal dialog is not displayed
  And The session storage item "CLOSED_MAINNET_MODAL" exists

Scenario: Mainnet Beta warning modal is not shown
  When I navigate to the slates page
  And I have the "CLOSED_MAINNET_MODAL" session storage item
  Then The modal dialog is not displayed
