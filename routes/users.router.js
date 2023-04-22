
const express = require('express');
const UsersService = require("./../services/users.service");

const router = express.Router();
const service = new UsersService();

router.post('/', async (req, res,next) => {
    try {
        const body = req.body;
        let id = await service.create(body);
        res.status(201).json({
            message: 'User created successfully',
            id
        });
    } catch (error) {
       next(error);
    }
});


module.exports = router;