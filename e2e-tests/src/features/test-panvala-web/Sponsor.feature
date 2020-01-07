@MetaMask_Rinkeby @Ignore
Feature: Sponsor

Background: Sponsor page
  Given I navigate to the "Sponsor" webpage
  And The Panvala "Sponsor" webpage is displayed

Scenario: Sponsor
  When I click the Sponsor Now button on the Panvala Sponsor webpage
  And I enter the company "Consensys" on the Panvala Sponsor webpage
  And I enter the first name "Peter" on the Panvala Sponsor webpage
  And I enter the last name "Yinusa" on the Panvala Sponsor webpage
  And I enter the email "peter.yinusa+sponsor@gmail.com" on the Panvala Sponsor webpage
  And I enter the amount "1" on the Panvala Sponsor webpage
  And I select the duration "1 month" on the Panvala Sponsor webpage
  And I click the Donate button on the Panvala Sponsor webpage
  Then The follwing text is displayed on the webpage
  """
  Thank you for sponsoring Panvala. Panvala Sponsors play a key role in moving Ethereum forward. You can share your support on Twitter!
  """
  And The contact is saved to Autopilot