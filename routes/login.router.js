const LoginService = require("./../services/login.service");
const express = require('express');

const router = express.Router();
const service = new LoginService();

router.post("/", async (req,res,next) =>{
    const body = req.body;
    try {
        const token = await service.login(body)
        res.status(200).json({
            message: 'Welcome!',
            token
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;