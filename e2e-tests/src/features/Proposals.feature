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

Scenario: View a grant proposal
  When I navigate to the proposals page
  Then The Panvala "Proposals" page is displayed
  When I click add a proposal on the Panvala Proposal page
  And I enter the first name "Peter" on the Panvala Create Proposals page
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Create Proposals page
  And I enter the project name "Automation Project" on the Panvala Create Proposals page
  And I enter the project summary "Automation project summary" on the Panvala Create Proposals page
  And I enter the tokens requested "600000" on the Panvala Create Proposals page
  And I enter the award address "0xB8c77482e45F1F44dE1745F52C74426C631bDD52" on the Panvala Create Proposals page
  And I click Confirm and Submit button on the Panvala Create Proposals page
  Then The "Grant proposal created." modal dialog is displayed reading
  """
  You have successfully created a Panvala Grant Proposal. Now groups that are creating slates can attach your grant to their slate.
  """
  When I accept the modal dialog
  And I click the last proposal card on the Panvala Proposal page
  Then The Panvala "Proposal" page is displayed
  And The first name is displayed on the Panvala Proposal page
  And The project name is displayed on the Panvala Proposal page
  And The project summary is displayed on the Panvala Proposal page
  And The tokens requested is displayed on the Panvala Proposal page
