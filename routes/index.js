const router = require('express').Router();
router.use((req,res) => {
    res.send("<h1>No route specified</h1>");
});

module.exports = router;