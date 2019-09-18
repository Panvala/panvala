@MetaMask_Local
Feature: Time Travel

Scenario: Slate Submission
  When I navigate to the slates page
  And I enter the epoch "1" on the Panvala Time Travel page
  And I enter the stage "0" on the Panvala Time Travel page
  And I click Time Travel on the Panvala Time Travel page
  Then The current epoch reads "current epoch: 1" on the Panvala Time Travel page
  And The current stage reads "current stage: 0 (SlateSubmission)" on the Panvala Time Travel page
  And The deadline reads "SLATE STAKING DEADLINE" on the slates page

Scenario: Intermission
  When I navigate to the slates page
  And I enter the epoch "2" on the Panvala Time Travel page
  And I enter the stage "1" on the Panvala Time Travel page
  And I click Time Travel on the Panvala Time Travel page
  Then The current epoch reads "current epoch: 2" on the Panvala Time Travel page
  And The current stage reads "current stage: 1 (Intermission)" on the Panvala Time Travel page
  And The deadline reads "SLATE STAKING DEADLINE" on the slates page

Scenario: Commit Voting
  When I navigate to the slates page
  And I enter the epoch "3" on the Panvala Time Travel page
  And I enter the stage "2" on the Panvala Time Travel page
  And I click Time Travel on the Panvala Time Travel page
  Then The current epoch reads "current epoch: 3" on the Panvala Time Travel page
  And The current stage reads "current stage: 2 (CommitVoting)" on the Panvala Time Travel page
  And The deadline reads "VOTE UNTIL" on the slates page

Scenario: Reveal Voting
  When I navigate to the slates page
  And I enter the epoch "4" on the Panvala Time Travel page
  And I enter the stage "3" on the Panvala Time Travel page
  And I click Time Travel on the Panvala Time Travel page
  Then The current epoch reads "current epoch: 4" on the Panvala Time Travel page
  And The current stage reads "current stage: 3 (RevealVoting)" on the Panvala Time Travel page
  And The deadline reads "VOTING CLOSED" on the slates page

