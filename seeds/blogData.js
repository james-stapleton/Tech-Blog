const {Blog} = require('../models');

const blogData = [
    {
        "title": "First Blog!",
        "text": "This is the first of many blog entries",
        "user_id": 1 
    },
    {
        "title": "Second Blog!",
        "text": "This is the second blog entry, made by the same user as the first",
        "user_id": 1 
    },
    {
        "title": "Third Blog!",
        "text": "This is the third blog entry, made by user 2",
        "user_id": 2 
    },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;