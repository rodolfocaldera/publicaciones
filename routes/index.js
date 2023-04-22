const usersRouter = require('./users.router');
const loginRouter = require("./login.router");
const postsRouter = require("./posts.router");
const validateJWT = require("./../middlewares/validateJWT");
const validateRole = require("./../middlewares/validateRole");

const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users',[validateJWT,validateRole] ,usersRouter);
  router.use("/login",loginRouter);
  router.use("/posts",[validateJWT,validateRole],postsRouter);
}

module.exports = routerApi;
