'use strict';
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define(
    'Donation',
    {
      // transaction info
      txHash: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
        unique: true,
      },
      metadataHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      donor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tokens: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      // IPFS metadata
      metadataVersion: {
        type: DataTypes.STRING,
      },
      memo: {
        type: DataTypes.STRING,
      },
      usdValue: {
        type: DataTypes.INTEGER,
      },
      ethValue: {
        type: DataTypes.STRING,
      },
      pledgeMonthlyUSD: {
        type: DataTypes.INTEGER,
      },
      pledgeTerm: {
        type: DataTypes.INTEGER,
      },
      // user info
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      company: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Donation.associate = function(models) {
    // associations can be defined here
  };
  return Donation;
};
