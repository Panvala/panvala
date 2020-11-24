'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 18, displayName: 'Matic Mitra', createdAt: new Date(), updatedAt: new Date() },
        { id: 19, displayName: 'FightPandemics', createdAt: new Date(), updatedAt: new Date() },
        { id: 20, displayName: 'lab10 collective', createdAt: new Date(), updatedAt: new Date() },
        { id: 21, displayName: 'DeFi Safety', createdAt: new Date(), updatedAt: new Date() },
        { id: 22, displayName: 'Web3Bridge', createdAt: new Date(), updatedAt: new Date() },
        { id: 23, displayName: 'Mol LeArt', createdAt: new Date(), updatedAt: new Date() },
        { id: 24, displayName: 'Rotki', createdAt: new Date(), updatedAt: new Date() },
        { id: 25, displayName: 'BrightID', createdAt: new Date(), updatedAt: new Date() },
        { id: 26, displayName: 'Ethereum France', createdAt: new Date(), updatedAt: new Date() },
        { id: 27, displayName: 'Abridged', createdAt: new Date(), updatedAt: new Date() },
        { id: 28, displayName: 'NFThub', createdAt: new Date(), updatedAt: new Date() },
        { id: 29, displayName: 'MetaGame', createdAt: new Date(), updatedAt: new Date() },
        { id: 30, displayName: 'MetaSpace', createdAt: new Date(), updatedAt: new Date() },
        { id: 31, displayName: 'Trips Community', createdAt: new Date(), updatedAt: new Date() },
        { id: 32, displayName: 'Upala', createdAt: new Date(), updatedAt: new Date() },
        { id: 33, displayName: 'Bloom Network', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 34,
          displayName: 'Handshake Development Fund',
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
        id: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      },
      {}
    );
  },
};
