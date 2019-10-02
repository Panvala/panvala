@MetaMask_Local
Feature: Slates

Background: Background name
  Given I navigate to the slates page
  And I Time Travel to the "Slate Submission" stage in Panvala

Scenario: Create a Grant Slate
  When I click add slates on the Panvala slates page
  And I select the Grant Slate slate type on the Panvala Create a Slate page
  And I enter the slate details on the Panvala Create a Grant Slate page
  Then The "Slate submitted." modal dialog is displayed reading
  """
  Now that your slate has been created you and others have the ability to stake tokens on it to propose it to token holders. Once there are tokens staked on the slate it will be eligible for a vote.
  """

Scenario: Create a Governance Slate
  When I click add slates on the Panvala slates page
  And I select the Governance Slate slate type on the Panvala Create a Slate page
  And I enter the slate details on the Panvala Create a Governance Slate page
  Then The "Slate submitted." modal dialog is displayed reading
  """
  Now that your slate has been created you and others have the ability to stake tokens on it to propose it to token holders. Once there are tokens staked on the slate it will be eligible for a vote.
  """

@Ignore
Scenario: View a Grant Slate
  When I click add slates on the Panvala slates page
  And I select the Grant Slate slate type on the Panvala Create a Slate page
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Create Grant Slate page
  And I enter the first name "Peter" on the Panvala Create Grant Slate page
  And I enter the description "Description" on the Panvala Create Grant Slate page
  And I click the Recommend no action option on the Panvala Create Grant Slate page
  And I click the Stake no option on the Panvala Create Grant Slate page
  And I click the Create Slate button on the Panvala Create Grant Slate page
  Then The "Slate submitted." modal dialog is displayed reading
  """
  Now that your slate has been created you and others have the ability to stake tokens on it to propose it to token holders. Once there are tokens staked on the slate it will be eligible for a vote.
  """
  When I accept the modal dialog
  And I click the last grant slate card on the Panvala slates page
  Then The Panvala "Slate" page is displayed
  And The first name is displayed on the Panvala Slate page
  And The description is displayed on the Panvala Slate page

Scenario: View a Governance Slate
  When I click add slates on the Panvala slates page
  And I select the Governance Slate slate type on the Panvala Create a Slate page
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Create Governance Slate page
  And I enter the first name "Peter" on the Panvala Create Governance Slate page
  And I enter the description "Description" on the Panvala Create Governance Slate page
  And I click the Recommend no action option on the Panvala Create Governance Slate page
  And I click the Stake no option on the Panvala Create Governance Slate page
  And I click the Create Slate button on the Panvala Create Governance Slate page
  Then The "Slate submitted." modal dialog is displayed reading
  """
  Now that your slate has been created you and others have the ability to stake tokens on it to propose it to token holders. Once there are tokens staked on the slate it will be eligible for a vote.
  """
  When I accept the modal dialog
  And I click the last governance slate card on the Panvala slates page
  Then The Panvala "Slate" page is displayed
  And The first name is displayed on the Panvala Slate page
  And The description is displayed on the Panvala Slate page