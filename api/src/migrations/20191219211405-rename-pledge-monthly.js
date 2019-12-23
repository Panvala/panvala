'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Donations', 'pledgeMonthlyUSD', 'pledgeMonthlyUSDCents');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Donations', 'pledgeMonthlyUSDCents', 'pledgeMonthlyUSD');
  },
};
