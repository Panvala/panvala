const { utils } = require('ethers');
const flatten = require('lodash/flatten');
const ipfs = require('./ipfs');

const notifications = {
  PROPOSAL_INCLUDED_IN_SLATE: {
    type: 'PROPOSAL_INCLUDED_IN_SLATE',
    // proposalID: 1,
    // slateID: 1,
  },
  PROPOSAL_REJECTED: {
    type: 'PROPOSAL_REJECTED',
    // proposalID: 1,
  },
  SLATE_ACCEPTED: {
    type: 'SLATE_ACCEPTED',
    // slateID: 1,
  },
  SLATE_REJECTED: {
    type: 'SLATE_REJECTED',
    // slateID: 1,
  },
  BALLOT_OPEN: {
    type: 'BALLOT_OPEN',
    // epochNumber: 1,
  },
  BALLOT_CLOSED: {
    type: 'BALLOT_CLOSED',
    // epochNumber: 1,
  },
  WITHDRAW_VOTING_RIGHTS: {
    type: 'WITHDRAW_VOTING_RIGHTS',
  },
  WITHDRAW_STAKE: {
    type: 'WITHDRAW_STAKE',
    // slateID: 1,
  },
  WITHDRAW_GRANT: {
    type: 'WITHDRAW_GRANT',
    // proposalID: 1,
  },
};

async function getNormalizedNotificationByEvents(events, address) {
  // this would be useful for saving in the db
  // const eventsByName = groupBy(events, 'name');

  // get all events for 'Slate Accepted'
  const slateAcceptedEvents = events.filter(
    e => e.name === 'ConfidenceVoteFinalized' || e.name === 'RunoffFinalized'
  );
  const slateAcceptedNotifications = flatten(
    slateAcceptedEvents.map(event => {
      const { winningSlate, ballotID, categoryID, category } = event.values;
      // TODO: filter for staker === address
      return [
        {
          ...notifications.WITHDRAW_STAKE,
          event,
          slateID: utils.bigNumberify(winningSlate).toString(),
        },
        {
          ...notifications.SLATE_ACCEPTED,
          event,
          slateID: utils.bigNumberify(winningSlate).toString(),
          ballotID,
          categoryID: category ? category : categoryID,
          // recommender,
        },
      ];
    })
  );

  // this is hacky. should compare against SlateCreated events
  const proposalCreatedEvents = events.filter(
    event => event.name === 'ProposalCreated' && event.values.to === address
  );
  const proposalIncludedInSlateNotifications = await Promise.all(
    proposalCreatedEvents.map(async event => {
      const { proposer, to, metadataHash } = event.values;
      const proposalMetadata = await ipfs.get(utils.toUtf8String(metadataHash), {
        json: true,
      });
      return {
        ...notifications.PROPOSAL_INCLUDED_IN_SLATE,
        proposalID: proposalMetadata.id,
        event,
        proposer,
        recipient: to,
        slateID: '0', // TEMPORARY HACK
      };
    })
  );

  // return stakingNotifications
  return slateAcceptedNotifications.concat(proposalIncludedInSlateNotifications);
}

module.exports = {
  getNormalizedNotificationByEvents,
};
