'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [{ id: 83, displayName: 'AYOWECCA Uganda', createdAt: new Date(), updatedAt: new Date() }],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [83],
      },
      {}
    );
  },
};
