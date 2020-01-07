@MetaMask_Local @Ignore
Feature: Team

Background: Team page
  Given I navigate to the "Team" webpage
  And The Panvala "Team" webpage is displayed

Scenario: Team
  When I enter the first name "Peter Yinusa" on the Panvala Team webpage
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Team webpage
  And I enter the message "Hello" on the Panvala Team webpage
  And I click the Get in touch button on the Panvala Team webpage
  Then The follwing text is displayed on the webpage
  """
  Thank you. We'll be in touch!
  """