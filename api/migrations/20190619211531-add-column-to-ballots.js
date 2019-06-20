'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('SubmittedBallots', 'delegate', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('SubmittedBallots', 'delegate');
  },
};
