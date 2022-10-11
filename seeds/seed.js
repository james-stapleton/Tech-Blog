const sequelize = require('../config/connection'); 
const seedUsers = require('./userData');
const seedBlogs = require('./blogData')
const seedDatabase = async () => {
    await sequelize.sync( { force: true } );

    const users = await seedUsers();

    const blogs = await seedBlogs();

    if (users && blogs) {
        console.log("Users and blogs seeded!");
        process.exit(0);
    }
    else {
        process.exit(1);
    }

}

seedDatabase();