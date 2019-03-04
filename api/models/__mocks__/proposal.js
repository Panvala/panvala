const { Proposal } = jest.requireActual('..');

// Fake database
let db = [];

// Override functions
Proposal.findAll = jest.fn(() => {
  return Promise.resolve(db);
});

Proposal.create = jest.fn(data => {
  const proposal = data;
  proposal.createdAt = new Date();
  proposal.updatedAt = proposal.createdAt;
  db.push(proposal);
  return Promise.resolve(proposal);
});

Proposal.truncate = () => {
  db = [];
  return Promise.resolve();
};

module.exports = {
  Proposal,
};
