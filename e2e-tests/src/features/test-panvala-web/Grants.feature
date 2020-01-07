@MetaMask_Local @Ignore
Feature: Grants

Background: Grants page
  Given I navigate to the "Grants" webpage
  And The Panvala "Grants" webpage is displayed

Scenario: Apply for a Grant
  When I click the Apply for a grant button on the Panvala Grants webpage
  And I enter the full name "Peter yinusa" on the Panvala Grants webpage
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Grants webpage
  And I click the Get in touch button on the Panvala Grants webpage
  Then The follwing text is displayed on the webpage
  """
  Thank you. We'll be in touch!
  """