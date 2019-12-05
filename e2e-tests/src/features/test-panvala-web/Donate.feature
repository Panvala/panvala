@MetaMask_Rinkeby @Ignore
Feature: Donate

Background: Donate page
  Given I navigate to the "Donate" webpage
  And The Panvala "Donate" webpage is displayed

Scenario: Donate
  When I click the Donate Now button on the Panvala Donate webpage
  And I enter the first name "Peter" on the Panvala Donate webpage
  And I enter the last name "Yinusa" on the Panvala Donate webpage
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Donate webpage
  And I select the tier "Student — $5/month" on the Panvala Donate webpage
  And I select the duration "1 month" on the Panvala Donate webpage
  And I click the Donate button on the Panvala Donate webpage
  Then The follwing text is displayed on the webpage
  """
  Thank you for donating to Panvala. Each and every Panvala patron plays a key role in moving Ethereum forward. You can share your support on Twitter!
  """