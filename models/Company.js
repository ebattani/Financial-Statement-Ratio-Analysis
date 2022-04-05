const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Company extends Model {}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sic_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fiscalYearEnd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'company',
  }
);

module.exports = Company;
