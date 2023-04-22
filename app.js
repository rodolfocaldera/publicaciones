const express = require('express');
const routerApi = require('./routes');
const {logErrors,errorHandler,boomErrorHandler} = require("./middlewares/error.handler")
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the api');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Mi port' +  port);
});