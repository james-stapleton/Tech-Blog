const router = require('express').Router();

router.get('/', async (req,res) => {
    try {
        if (!req.session.logged_in) {
        res.render('login');
        }
        else {
            res.render('homepage');
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', (req,res) => {
    if (!req.session.logged_in) {
        res.render('login', );
    }
    else {
        res.render('dashboard', {user_id: req.session.user_id, name: req.session.username } );
    }
})

router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.render('homepage');
    }
    else {
        res.render('login');
    }
})

router.get('/id', (req,res) => {
    const id = req.session.user_id;
    res.status(200).json(id);
}) 

module.exports = router;