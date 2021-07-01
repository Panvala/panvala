'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 55, displayName: 'MyCrypto', createdAt: new Date(), updatedAt: new Date() },
        { id: 56, displayName: 'nfDAO', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 57,
          displayName: 'Njombe Innovation Academy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 58, displayName: 'ThinkBetter', createdAt: new Date(), updatedAt: new Date() },
        { id: 59, displayName: 'Guerrilla Music', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 60,
          displayName: 'Akasha Hub Barcelona',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 61, displayName: 'ethers.js', createdAt: new Date(), updatedAt: new Date() },
        { id: 62, displayName: 'rekt.news', createdAt: new Date(), updatedAt: new Date() },
        { id: 63, displayName: 'Umbra', createdAt: new Date(), updatedAt: new Date() },
        { id: 64, displayName: 'Civichub', createdAt: new Date(), updatedAt: new Date() },
        { id: 65, displayName: 'Web3 Designers', createdAt: new Date(), updatedAt: new Date() },
        { id: 66, displayName: 'Jovian Network', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66],
      },
      {}
    );
  },
};
