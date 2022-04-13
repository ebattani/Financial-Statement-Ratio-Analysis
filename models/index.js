const User = require('./User');
const Portfolio = require('./Portfolio');

User.hasMany(Portfolio, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Portfolio.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Portfolio };