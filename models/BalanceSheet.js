const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BalanceSheet extends Model {}

BalanceSheet.init(
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
    cash_and_cash_equivalents: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    net_receivables: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    inventory: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_current_assets: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_assets: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_current_liabilities: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_liabilities: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_stockholders_equity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_liabilities_and_stockholders_equity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    preferred_stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    common_stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_debt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    net_debt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    long_term_debt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    cash_and_cash_equivalents: {
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
    modelName: 'balancesheet',
  }
);

module.exports = BalanceSheet;
