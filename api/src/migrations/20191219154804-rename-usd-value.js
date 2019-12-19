'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Donations', 'usdValue', 'usdValueCents');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Donations', 'usdValueCents', 'usdValue');
  },
};
