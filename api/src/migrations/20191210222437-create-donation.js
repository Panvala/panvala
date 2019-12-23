'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // transaction info
      txHash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      metadataHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      donor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokens: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // IPFS metadata
      metadataVersion: {
        type: Sequelize.STRING,
      },
      memo: {
        type: Sequelize.STRING,
      },
      usdValue: {
        type: Sequelize.INTEGER,
      },
      ethValue: {
        type: Sequelize.STRING,
      },
      pledgeMonthlyUSD: {
        type: Sequelize.INTEGER,
      },
      pledgeTerm: {
        type: Sequelize.INTEGER,
      },
      // user info
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      company: {
        type: Sequelize.STRING,
      },
      //
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Donations');
  },
};
