const User = require('./User');
const Portfolio = require('./Portfolio');
const Ratio = require('./Ratio');

User.hasMany(Portfolio, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Portfolio.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Portfolio, Ratio };