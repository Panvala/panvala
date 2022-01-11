'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 72, displayName: '1Hive', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 73,
          displayName: 'Breadchain Cooperative',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 74, displayName: 'ArtFan', createdAt: new Date(), updatedAt: new Date() },
        { id: 75, displayName: 'Microsolidarity', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 76,
          displayName: 'Humanetics Workshop',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 77, displayName: 'Geo Web', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 78,
          displayName: 'GenerousAF Foundation',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 79, displayName: 'Socialstack', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 80,
          displayName: 'Delicious Democracy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 81, displayName: 'Akorn', createdAt: new Date(), updatedAt: new Date() },
        { id: 82, displayName: 'PizzaDAO', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82],
      },
      {}
    );
  },
};
