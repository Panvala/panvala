@MetaMask_Local @Ignore
Feature: Poll

Background: Poll page
  Given I navigate to the "Poll" webpage
  And The Panvala "Poll" webpage is displayed

Scenario: Poll
  When I click the View Poll button on the Panvala Poll webpage
  And I enter the percentage points "30" for category one on the Panvala Poll webpage
  And I enter the percentage points "5" for category two on the Panvala Poll webpage
  And I enter the percentage points "15" for category three on the Panvala Poll webpage
  And I enter the percentage points "30" for category four on the Panvala Poll webpage
  And I enter the percentage points "5" for category five on the Panvala Poll webpage
  And I enter the percentage points "15" for category six on the Panvala Poll webpage
  And I enter the first name "Peter" on the Panvala Poll webpage
  And I enter the last name "Yinusa" on the Panvala Poll webpage
  And I enter the email "peter.yinusa@gmail.com" on the Panvala Poll webpage
  And I click the Submit Vote button on the Panvala Poll webpage