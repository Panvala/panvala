'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 7, displayName: 'Hashing it Out', createdAt: new Date(), updatedAt: new Date() },
        { id: 8, displayName: 'Commons Stack', createdAt: new Date(), updatedAt: new Date() },
        { id: 9, displayName: 'DAppNode', createdAt: new Date(), updatedAt: new Date() },
        { id: 10, displayName: 'MetaCartel', createdAt: new Date(), updatedAt: new Date() },
        { id: 11, displayName: 'DXdao', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [7, 8, 9, 10, 11],
      },
      {}
    );
  },
};
