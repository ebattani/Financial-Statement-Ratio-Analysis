const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CashFlowStatement extends Model {}

CashFlowStatement.init(
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
    net_income: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    net_cash_provided_by_operating_activities: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    net_cash_used_for_investing_activities: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    net_cash_provided_by_financing_activities: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    cash_at_end_of_period: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    cash_at_beginning_of_period: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    operating_cash_flow: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    free_cash_flow: {
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
    modelName: 'cashflowstatement',
  }
);

module.exports = CashFlowStatement;
