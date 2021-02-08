const router = require('express').Router();

// grab routes from api folder
const apiRoutes = require('./api');
//route for hompage
const homeRoutes = require('./home-routes.js');
// route for dashboard
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;