const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);


router.use((req,res) => {
    res.send("<h1>No route specified</h1>");
});

module.exports = router;