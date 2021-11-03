const { Router } = require('express');

const ping = require('./controllers/ping');
const test = require('./controllers/test');
const events = require('./controllers/events');
const tickets = require('./controllers/tickets');

const testRouter = new Router();

testRouter.get('/one/:id', test.readItem);
testRouter.get('/all', test.readAllItems);
testRouter.post('/new', test.insertItem);

const eventsRouter = new Router();

const ticketsRouter = new Router();

const mainRouter = new Router();

mainRouter.get('/ping', ping);

module.exports = {
  mainRouter,
  testRouter,
  eventsRouter,
  ticketsRouter,
};
