const sequelize = require('../config/connection'); 
const seedUsers = require('./userData');
const seedBlogs = require('./blogData')
const seedComments = require('./commentData');

const seedDatabase = async () => {
    await sequelize.sync( { force: true } );

    const users = await seedUsers();

    const blogs = await seedBlogs();

    const comments = await seedComments();

    if (users && blogs && comments) {
        console.log("Users, comments and blogs seeded!");
        process.exit(0);
    }
    else {
        process.exit(1);
    }

}

seedDatabase();