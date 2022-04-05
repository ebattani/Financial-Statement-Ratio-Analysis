// const User = require('./User');
const Company = require('./Company');
const BalanceSheet = require('./BalanceSheet');
const IncomeStatement = require('./IncomeStatement');
const CashFlowStatement = require('./CashFlowStatement');

Company.hasMany(BalanceSheet, {
  foreignKey: 'company_id',
  onDelete: 'CASCADE'
});

BalanceSheet.belongsTo(Company, {
  foreignKey: 'company_id'
});

Company.hasMany(IncomeStatement, {
  foreignKey: 'company_id',
  onDelete: 'CASCADE'
});

IncomeStatement.belongsTo(Company, {
  foreignKey: 'company_id'
});

Company.hasMany(CashFlowStatement, {
  foreignKey: 'company_id',
  onDelete: 'CASCADE'
});

CashFlowStatement.belongsTo(Company, {
  foreignKey: 'company_id'
});

module.exports = { Company, BalanceSheet, IncomeStatement, CashFlowStatement };
