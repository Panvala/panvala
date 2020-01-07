@MetaMask_Local @Ignore
Feature: Pledge

Background: Pledge page
  Given I navigate to the "Pledge" webpage
  And The Panvala "Pledge" webpage is displayed

Scenario: Pledge
  When I click the Pledge Now button on the Panvala Pledge webpage
  And I enter the first name "Peter" on the Panvala Pledge webpage
  And I enter the last name "Yinusa" on the Panvala Pledge webpage
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Pledge webpage
  And I select the tier "Student — $5/month" on the Panvala Pledge webpage
  And I click the Pledge button on the Panvala Pledge webpage
  Then The follwing text is displayed on the webpage
  """
  Thank you. We'll be in touch!
  """