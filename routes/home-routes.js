const router = require('express').Router();

router.get('/', async (req,res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', (req,res) => {
    res.render('dashboard');
})

router.get('/login', (req,res) => {
    res.render('login');
})

module.exports = router;