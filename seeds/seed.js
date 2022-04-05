const sequelize = require('../config/connection');
const { User, Portfolio } = require('../models');

const userData = require('./userData.json');
const portfolioData = require('./portfolioData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const portfolio of portfolioData) {
    await Portfolio.create({
      ...portfolio,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
