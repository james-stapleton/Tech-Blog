const {User} = require('../models');

const userData = 
[ {
        "name": "James",
        "email": "james@test.com",
        "password": "password"
    },
    {
        "name": "Bob",
        "email": "bob@test.com",
        "password": "password"
    },
    {
        "name": "Joe",
        "email": "joe@test.com",
        "password": "password"
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;