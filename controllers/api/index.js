const router = require('express').Router();
const userRoutes = require('./userRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const ratioRoutes = require('./ratioRoutes');

router.use('/users', userRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/ratios', ratioRoutes);

module.exports = router;
