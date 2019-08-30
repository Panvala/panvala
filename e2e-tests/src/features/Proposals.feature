@MetaMask_Local
Feature: Proposals

Scenario: Create a grant proposal
  When I navigate to the proposals page
  And I click add a proposal on the Panvala Proposal page
  And I enter the proposal details on the Panvala Create Proposals page
  Then The "Grant proposal created." modal dialog is displayed reading
  """
  You have successfully created a Panvala Grant Proposal. Now groups that are creating slates can attach your grant to their slate.
  """
