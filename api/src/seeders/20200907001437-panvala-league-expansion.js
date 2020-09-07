'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 12, displayName: 'Meta Gamma Delta', createdAt: new Date(), updatedAt: new Date() },
        { id: 13, displayName: 'KERNEL', createdAt: new Date(), updatedAt: new Date() },
        { id: 14, displayName: 'future modern', createdAt: new Date(), updatedAt: new Date() },
        { id: 15, displayName: 'SheFi', createdAt: new Date(), updatedAt: new Date() },
        { id: 16, displayName: 'DePo DAO', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [12, 13, 14, 15, 16],
      },
      {}
    );
  },
};
