@MetaMask_Mainnet
Feature: Storage

Background: Slates page
  Given I navigate to the "Slates" page

Scenario: Mainnet Beta warning modal is shown
  When The "Hello" modal dialog is displayed reading
  """
  Panvala is in Beta and on the Ethereum Mainnet. Use it wisely. Don't store more crypto than you need and only share data with people you trust. By using the app you assume full responsibility for all risks concerning your data and funds.
  """
  Then The session storage item "CLOSED_MAINNET_MODAL" does not exist
  When I accept the modal dialog
  Then The modal dialog is not displayed
  And The session storage item "CLOSED_MAINNET_MODAL" exists

Scenario: Mainnet Beta warning modal is not shown
  When I have the "CLOSED_MAINNET_MODAL" session storage item
  Then The modal dialog is not displayed
