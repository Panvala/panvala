'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 67, displayName: 'IRL Art', createdAt: new Date(), updatedAt: new Date() },
        { id: 68, displayName: 'Crypto Kids Camp', createdAt: new Date(), updatedAt: new Date() },
        { id: 69, displayName: 'MANA VOX', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 70,
          displayName: 'Freedom in Tech Alliance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 71, displayName: 'The Bigger Pie', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [67, 68, 69, 70, 71],
      },
      {}
    );
  },
};
