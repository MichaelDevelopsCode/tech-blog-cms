const router = require('express').Router();

// grab routes from api folder
const apiRoutes = require('./api');
//route for hompage
//const homeRoutes = require('./home-routes.js');

//router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;