const { Router } = require('express');

const ping = require('./controllers/ping');
const test = require('./controllers/test');

const mainRouter = new Router();

mainRouter.get('/ping', ping);
mainRouter.get('/test/one/:id', test.readItem);
mainRouter.get('/test/all', test.readAllItems);
mainRouter.post('/test', test.insertItem);

module.exports = {
  mainRouter,
};
