'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [{ id: 84, displayName: 'Body Gallery', createdAt: new Date(), updatedAt: new Date() }],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [84],
      },
      {}
    );
  },
};
