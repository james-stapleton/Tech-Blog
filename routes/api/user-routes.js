const { Router } = require('express');
const {User, Blog} = require('../../models');

const router = Router();

router.get('/', async (req,res) => {
    try { 
    const userData = await User.findAll( {include: Blog});
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

router.get('/:id', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;