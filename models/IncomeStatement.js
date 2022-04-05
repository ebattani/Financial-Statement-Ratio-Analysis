const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class IncomeStatement extends Model {}

IncomeStatement.init(
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
    statement_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    calendar_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    revenue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    costOfRevenue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    grossProfit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    ebitda: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    incomeBeforeTax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    netIncome: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    eps: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    epsdiluted: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    weighted_average_shs_out: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    weighted_average_shs_out_dil: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'company',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'incomestatement',
  }
);

module.exports = IncomeStatement;
