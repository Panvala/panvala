const notifications = [
  {
    type: 'WITHDRAW_VOTING_RIGHTS',
  },
  {
    type: 'WITHDRAW_STAKE',
    slateID: 1,
  },
  {
    type: 'WITHDRAW_GRANT',
    proposalID: 1,
  },
  {
    type: 'PROPOSAL_REJECTED',
    proposalID: 1,
    // blockTimestamp: 547328147,
  },
  {
    type: 'PROPOSAL_INCLUDED_IN_SLATE',
    proposalID: 1,
    slateID: 1,
  },
  {
    type: 'SLATE_ACCEPTED',
    slateID: 1,
  },
  {
    type: 'SLATE_REJECTED',
    slateID: 1,
  },
  {
    type: 'BALLOT_OPEN',
    epochNumber: 1,
  },
  {
    type: 'BALLOT_CLOSED',
    epochNumber: 1,
  },
];

function normalizedNotificationByEvent(event) {
  return notifications;
}

module.exports = {
  notifications,
  normalizedNotificationByEvent,
};
