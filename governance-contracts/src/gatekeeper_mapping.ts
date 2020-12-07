import { BigInt, BigDecimal } from '@graphprotocol/graph-ts';
import { ByteArray } from '@graphprotocol/graph-ts';

import {
  BallotCommitted as BallotCommittedEvent,
  BallotRevealed as BallotRevealedEvent,
  ContestAutomaticallyFinalized as ContestAutomaticallyFinalizedEvent,
  ContestFinalizedWithoutWinner as ContestFinalizedWithoutWinnerEvent,
  PermissionRequested as PermissionRequestedEvent,
  RunoffFinalized as RunoffFinalizedEvent,
  SlateCreated as SlateCreatedEvent,
  SlateStaked as SlateStakedEvent,
  StakeWithdrawn as StakeWithdrawnEvent,
  VoteFailed as VoteFailedEvent,
  VoteFinalized as VoteFinalizedEvent,
  VotingRightsDelegated as VotingRightsDelegatedEvent,
  VotingTokensDeposited as VotingTokensDepositedEvent,
  VotingTokensWithdrawn as VotingTokensWithdrawnEvent,
} from '../generated/Gatekeeper/Gatekeeper';

import {
  BallotCommitted,
  BallotRevealed,
  ContestAutomaticallyFinalized,
  ContestFinalizedWithoutWinner,
  PermissionRequested,
  RunoffFinalized,
  SlateCreated,
  SlateStaked,
  StakeWithdrawn,
  VoteFailed,
  VoteFinalized,
  VotingRightsDelegated,
  VotingTokensDeposited,
  VotingTokensWithdrawn,
} from '../generated/schema'; 


export function handleBallotCommitted(event: BallotCommittedEvent): void {
  let ballot = new BallotCommitted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  ballot.epochNumber = event.params.epochNumber;
  ballot.committer = event.params.committer;
  ballot.voter = event.params.voter;
  ballot.numTokens = event.params.numTokens;
  ballot.commitHash = event.params.commitHash;
  ballot.save();
}

export function handleBallotRevealed(event: BallotRevealedEvent): void {
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
  let ballot = new BallotRevealed(id);

  ballot.epochNumber = event.params.epochNumber;
  ballot.voter = event.params.voter;
  ballot.numTokens = event.params.numTokens;
  ballot.save();
}


export function handleContestAutomaticallyFinalized(
  event: ContestAutomaticallyFinalizedEvent
): void {
  let contest = new ContestAutomaticallyFinalized(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  contest.epochNumber = event.params.epochNumber;
  contest.resource = event.params.resource;
  contest.winningSlate = event.params.winningSlate;
  contest.save();
}

export function handleContestFinalizedWithoutWinner(
  event: ContestFinalizedWithoutWinnerEvent
): void {
  let contest = new ContestFinalizedWithoutWinner(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  contest.epochNumber = event.params.epochNumber;
  contest.resource = event.params.resource;
  contest.save();
}

export function handlePermissionRequested(event: PermissionRequestedEvent): void {
  let permission = new PermissionRequested(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  permission.epochNumber = event.params.epochNumber;
  permission.resource = event.params.resource;
  permission.requestID = event.params.requestID;
  permission.metadataHash = event.params.metadataHash;
  permission.save();
}

export function handleRunoffFinalized(event: RunoffFinalizedEvent): void {
  let runoff = new RunoffFinalized(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  runoff.epochNumber = event.params.epochNumber;
  runoff.resource = event.params.resource;
  runoff.winningSlate = event.params.winningSlate;
  runoff.losingSlate = event.params.losingSlate;
  runoff.loserVotes = event.params.loserVotes;
  runoff.save();
}

export function handleSlateCreated(call: SlateCreatedEvent): void {
  let id = call.transaction.hash.toHex();
  let slate = new SlateCreated(id)
  slate.slateID = call.params.slateID;
  slate.recommender = call.params.recommender;
  slate.requestIDs = call.params.requestIDs;
  slate.save()
}

export function handleStakeWithdrawn(event: StakeWithdrawnEvent): void {
  let stake = new StakeWithdrawn(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  stake.slateID = event.params.slateID;
  stake.staker = event.params.staker;
  stake.numTokens = event.params.numTokens;
  stake.save();
}

export function handleVoteFailed(event: VoteFailedEvent): void {
  let vote = new VoteFailed(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  vote.epochNumber = event.params.epochNumber;
  vote.resource = event.params.resource;
  vote.leadingSlate = event.params.leadingSlate;
  vote.leaderVotes = event.params.leaderVotes;
  vote.runnerUpSlate = event.params.runnerUpSlate;
  vote.runnerUpVotes = event.params.runnerUpVotes;
  vote.totalVotes = event.params.totalVotes;
  vote.save();
}

export function handleVoteFinalized(event: VoteFinalizedEvent): void {
  let vote = new VoteFinalized(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  vote.epochNumber = event.params.epochNumber;
  vote.resource = event.params.resource;
  vote.winningSlate = event.params.winningSlate;
  vote.winnerVotes = event.params.winnerVotes;
  vote.totalVotes = event.params.totalVotes;
  vote.save();
}

export function handleVotingRightsDelegated(event: VotingRightsDelegatedEvent): void {
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
  let vote = new VotingRightsDelegated(id);

  vote.voter = event.params.voter;
  vote.delegate = event.params.delegate;
  vote.save();
}

export function handleVotingTokensDeposited(event: VotingTokensDepositedEvent): void {
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
  let vote = new VotingTokensDeposited(id);

  vote.voter = event.params.voter;
  vote.numTokens = event.params.numTokens;
  vote.save();
}

export function handleVotingTokensWithdrawn(event: VotingTokensWithdrawnEvent): void {
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
  let vote = new VotingTokensWithdrawn(id);

  vote.voter = event.params.voter;
  vote.numTokens = event.params.numTokens;
  vote.save();
}


export function handleSlateStaked(event: SlateStakedEvent): void {
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
  let slate = new SlateStaked(id);

  slate.slateID = event.params.slateID;
  slate.numTokens = event.params.numTokens;
  slate.save();
}