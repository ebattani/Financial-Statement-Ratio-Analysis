const router = require('express').Router();
const { User, Portfolio } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('ratio');
      return;
    }
    else {
      res.render('homepage');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/ratio', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({ where: { id: req.session.user_id } });

    const portfolioData = await Portfolio.findAll(
      { where: { user_id: req.session.user_id } },
      { include: [{ model: User }] 
    });

    const user = userData.get({ plain: true });
    const portfolios = portfolioData.get({ plain: true });

    res.render('ratio', {
      portfolios,
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/ratio');
    return;
  }

  res.render('login');
});

module.exports = router;
