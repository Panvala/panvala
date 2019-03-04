const Sequelize = jest.genMockFromModule('sequelize');

Sequelize.prototype.import = path => {
  return { name: 'Proposal' };
};

module.exports = Sequelize;
