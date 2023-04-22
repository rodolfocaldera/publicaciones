const JWT = require("jsonwebtoken");
const {request,response} = require("express");
const boom = require("@hapi/boom");
require("dotenv").config();

validateJWT = (req = request,res = response,next) =>{
    const token = req.header("x-token");
    if(!token) throw boom.unauthorized("The request doesn't have a validate token");
    try {
        const {uid,uidRol} = JWT.verify(token,process.env.SECRET_KEY);
        req.uid = uid;
        req.uidRol = uidRol;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = validateJWT;