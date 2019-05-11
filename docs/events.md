# Events

## Gatekeeper

```js
event PermissionRequested(uint requestID, bytes metadataHash);
event SlateCreated(uint slateID, address indexed recommender, bytes metadataHash);
event SlateStaked(uint slateID, address indexed staker, uint numTokens);
event VotingTokensDeposited(address indexed voter, uint numTokens);
event VotingTokensWithdrawn(address indexed voter, uint numTokens);
event BallotCommitted(uint indexed ballotID, address indexed voter, uint numTokens, bytes32 commitHash);
event BallotRevealed(uint indexed ballotID, address indexed voter, uint numTokens);
event ConfidenceVoteCounted(
    uint indexed ballotID,
    uint indexed categoryID,
    uint winningSlate,
    uint votes,
    uint totalVotes
);
event ConfidenceVoteFinalized(uint indexed ballotID, uint indexed categoryID, uint winningSlate);
event ConfidenceVoteFailed(uint indexed ballotID, uint categoryID);
event RunoffStarted(uint indexed ballotID, uint indexed categoryID, uint winningSlate, uint runnerUpSlate);
event RunoffCounted(
    uint indexed ballotID,
    uint indexed categoryID,
    uint winningSlate,
    uint winnerVotes,
    uint losingSlate,
    uint loserVotes
);
event RunoffFinalized(uint indexed ballotID, uint indexed category, uint winningSlate);
event StakeWithdrawn(uint slateID, address indexed staker, uint numTokens);
```

```js
// change
SlateCreated(uint slateID, address indexed recommender, bytes metadataHash, uint[] requestIDs);

ConfidenceVoteFailed(uint indexed ballotID, uint indexed categoryID, uint[] slateIDs)
RunoffStarted(uint indexed ballotID, uint indexed categoryID, uint leadingSlate, uint runnerUpSlate);

ConfidenceVoteFinalized(uint indexed ballotID, uint indexed categoryID, winningSlate, uint[] slateIDs, address staker, address recommender)
RunoffFinalized(uint indexed ballotID, uint indexed categoryID, winningSlate, uint[] slateIDs, address staker, address recommender)

// add
SlateRejected(ballotID, categoryID, slateID)
```

## TokenCapacitor

```js
event ProposalCreated(
    address indexed proposer,
    uint indexed requestID,
    address indexed to,
    uint tokens,
    bytes metadataHash
);
event TokensWithdrawn(uint proposalID, address indexed to, uint numTokens);
event Donation(address indexed payer, address indexed donor, uint numTokens, bytes metadataHash);
```

CHANGES / ADD:

```js
ProposalCreated(
    address indexed proposer,
    uint indexed requestID,
    address indexed recipient,
    uint tokens,
    bytes metadataHash
);
```
