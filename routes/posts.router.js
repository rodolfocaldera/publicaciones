const express = require('express');
const PostsService = require("./../services/posts.service");

const router = express.Router();
const service = new PostsService();

router.post('/', async (req, res,next) => {
    try {
        const body = req.body;
        let id = await service.create(req.uid,body);
        res.status(201).json({
            message: 'Post created successfully',
            id
        });
    } catch (error) {
       next(error);
    }
});

router.put('/:id', async (req, res,next) => {
    try {
        const idPost = req.params.id;
        const body = req.body;
        let id = await service.update(idPost,body);
        res.status(201).json({
            message: 'Post updated successfully',
            id
        });
    } catch (error) {
       next(error);
    }
});

router.delete('/:id', async (req, res,next) => {
    try {
        const idPost = req.params.id;
        const body = req.body;
        let id = await service.delete(idPost);
        res.status(201).json({
            message: 'Post deleted successfully',
            id
        });
    } catch (error) {
       next(error);
    }
});

router.get('/', async (req, res,next) => {
    try {
        const body = req.body;
        let posts = await service.list();
        res.status(201).json({
            posts
        });
    } catch (error) {
       next(error);
    }
});

module.exports = router;