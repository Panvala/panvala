'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 50, displayName: 'Gitcoin', createdAt: new Date(), updatedAt: new Date() },
        { id: 51, displayName: 'RaidGuild', createdAt: new Date(), updatedAt: new Date() },
        { id: 52, displayName: 'DAOhaus', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 53,
          displayName: 'Blockchain Education Network',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 54, displayName: 'DAOSquare', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [50, 51, 52, 53, 54],
      },
      {}
    );
  },
};
