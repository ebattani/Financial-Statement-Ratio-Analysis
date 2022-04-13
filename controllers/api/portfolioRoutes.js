const router = require('express').Router();
const { Portfolio } = require('../../models');
const withAuth = require('../../utils/auth');


// Create a new Portfolio
router.post('/', withAuth, async (req, res) => {
  try {
    const newPortfolio = await Portfolio.create({
      company_symbol: req.body.ticker,
      user_id: req.session.user_id
    });

    res.status(200).json(newPortfolio);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Read all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll();
    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read a user's portfolios
router.get('/:id', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll({
      where: { user_id: req.params.id } 
    });

    if (!portfolioData) {
      res.status(404).json({ message: 'No company found with this id!' });
      return;
    }

    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a portfolio
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.destroy({
      where: { id: req.params.id } 
    });

    if (!portfolioData) {
      res.status(404).json({ message: 'No company found with this id!' });
      return;
    }

    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
