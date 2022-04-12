const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ratio extends Model {}

Ratio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calendar_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    current_ratio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quick_ratio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    working_capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // company_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'company',
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ratio',
  }
);

module.exports = Ratio;