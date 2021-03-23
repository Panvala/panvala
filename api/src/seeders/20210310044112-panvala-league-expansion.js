'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FundingCategories',
      [
        { id: 37, displayName: 'Circles UBI', createdAt: new Date(), updatedAt: new Date() },
        { id: 38, displayName: 'Giveth', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 39,
          displayName: 'Women of Crypto Art',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 40,
          displayName: 'Dandelion Collective',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 41, displayName: 'Shenanigan', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 42,
          displayName: "Peoples' Cooperative",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 43, displayName: 'Marma J Foundation', createdAt: new Date(), updatedAt: new Date() },
        { id: 44, displayName: 'Hackervilla', createdAt: new Date(), updatedAt: new Date() },
        { id: 45, displayName: 'PrimeDAO', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 46,
          displayName: 'Senary Commonwealth',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 47, displayName: 'Kolektivo Labs', createdAt: new Date(), updatedAt: new Date() },
        {
          id: 48,
          displayName: 'Austin Meetups Fund',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 49, displayName: 'DoinGud', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'FundingCategories',
      {
        id: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      },
      {}
    );
  },
};
