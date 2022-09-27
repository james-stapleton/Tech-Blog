const sequelize = require('../config/connection'); 
const { User } = require ('../models');

const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync( { force: true } );

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    if (users) {
        console.log("Users seeded!");
        process.exit(0);
    }
    else {
        process.exit(1);
    }

}

seedDatabase();