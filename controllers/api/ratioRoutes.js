const router = require('express').Router();
const { Ratio } = require('../../models');
const withAuth = require('../../utils/auth');

// Route: /api/ratios

// Create a new ratio
router.post('/', withAuth, async (req, res) => {
  try {
    const newRatio = await Ratio.create({
      company_symbol: req.body.symbol,
      calendar_year: req.body.calendarYear,
      current_ratio: req.body.currentRatio,
      quick_ratio: req.body.quickRatio,
      working_capital: req.body.workingCapital,
    });

    res.status(200).json(newRatio);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Read all ratios
router.get('/', async (req, res) => {
  try {
    const ratioData = await Ratio.findAll();
    res.status(200).json(ratioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a ratio
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const ratioData = await Ratio.destroy({
      where: { id: req.params.id } 
    });

    if (!ratioData) {
      res.status(404).json({ message: 'No company found with this id!' });
      return;
    }

    res.status(200).json(ratioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
