const {Comment} = require('../models');

const commentData = [
    {
        "text": "Test comment in seeds",
        "user_id": 1,
        "blog_id": 1
    }
]

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;