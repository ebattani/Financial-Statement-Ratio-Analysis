const router = require('express').Router();
const { Portfolio } = require('../../models');
const withAuth = require('../../utils/auth');


// Create a new Portfolio
router.post('/', withAuth, async (req, res) => {
  try {
    const newPortfolio = await Portfolio.create(req.body);
    res.status(200).json(newPortfolio);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Get Portfolios
router.get('/', async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll();
    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!portfolioData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;