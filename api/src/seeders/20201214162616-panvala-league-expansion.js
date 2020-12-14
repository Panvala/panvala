'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [{ id: 35, displayName: 'LexDAO', createdAt: new Date(), updatedAt: new Date() }],
      [
        {
          id: 36,
          displayName: 'Grassroots Economics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [35, 36],
      },
      {}
    );
  },
};
