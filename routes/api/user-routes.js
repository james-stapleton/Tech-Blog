const { Router } = require('express');
const {User} = require('../../models');

const router = Router();

router.get('/', async (req,res) => {
    try { 
    const userData = await User.findAll();
    console.log(userData);
    if (!userData) {
        res.status(404).json({message: "No users found"});
    }
    else {
    res.status(200).json(userData);
    }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;