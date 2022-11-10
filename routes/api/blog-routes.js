const router = require('express').Router();
const {User, Blog, Comment} = require('../../models');

router.get('/', async (req,res) => {
    try {
        const blogData = await Blog.findAll( {include: Comment} );
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {include: Comment});
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/one/:id', async (req,res) => {
    try {
        const blogData = await Blog.findAll({where: {user_id: req.params.id}}); 
        if (blogData){
            res.status(200).json(blogData);
        }
        else {
            res.status(400).json({message: "No blogs for this user"});
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req,res) => {
    const newBlog = Blog.create(req.body);
    res.status(200).json(newBlog);
});

router.put('/:id', async (req,res) => {
    try {
        const updateBlog = Blog.update(req.body, {where: {id: req.params.id}});
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const deleteBlog = await Blog.destroy({where: {id: req.params.id}});
        res.status(200).json(deleteBlog);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;