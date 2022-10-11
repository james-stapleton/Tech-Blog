const {User} = require('../models');

const userData = 
[ {
        "name": "James",
        "email": "james@test.com",
        "password": "password"
    },
    {
        "name": "test",
        "email": "james2@test.com",
        "password": "password"
    },
    {
        "name": "tfdsft",
        "email": "jamsadf@test.com",
        "password": "password"
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;