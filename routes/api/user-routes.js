const { Router } = require('express');
const {User, Blog} = require('../../models');

const router = Router();

//get all users and their associated blogs
router.get('/', async (req,res) => {
    try { 
    const userData = await User.findAll( {include: Blog});
    console.log(userData);
    if (!userData) {
        res.status(404).json({message: "No  found"});
    }
    else {
    res.status(200).json(userData);
    }
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a specific user by their id
router.get('/:id', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// create a new user and log them in
router.post('/', async (req, res) => {
    try {
      const userData = await Users.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // log in an existing user
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      else {
        console.log(userData);
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // log the current user out
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(200).json({message: "Logged out"}).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;