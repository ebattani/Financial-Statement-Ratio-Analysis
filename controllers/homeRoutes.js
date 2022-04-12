const router = require('express').Router();
const { User, Portfolio } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/ratio');
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
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Portfolio }]
    });

    // const users = userData.map((user) => user.get({ plain: true }));
    const user = userData.get({ plain: true });

    res.render('ratio', {

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
