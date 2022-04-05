const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPortfolio = await Portfolio.create(req.body);
    res.status(200).json(newPortfolio);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Get Previous Searches
router.get('/', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll();
    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
