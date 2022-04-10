const router = require('express').Router();
const { User, Portfolio } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/dashboard', async (req, res) => {
//   try {
//     const portfolioData = await Portfolio.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const portfolios = portfolioData.get({ plain: true });

//     res.render('dashboard', {
//       portfolios,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll(
      { where: { user_id: req.session.user_id } },
      { include: [{ model: User }] });

    const portfolios = portfolioData.get({ plain: true });

    res.render('dashboard', {
      portfolios,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/ratio', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll(
      { where: { user_id: req.session.user_id } },
      { include: [{ model: User }] 
    });

    const portfolios = portfolioData.get({ plain: true });

    res.render('ratio', {
      portfolios,
      logged_in: true,
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
