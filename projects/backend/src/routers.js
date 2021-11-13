const { Router } = require('express');
const { multerConfig } = require('./utils');

// router controllers
const ping = require('./controllers/ping');
const auth = require('./controllers/auth');
const exit = require('./controllers/exit');
const events = require('./controllers/events');
const tickets = require('./controllers/tickets');
const pages = require('./controllers/pages');

// events router
const eventsRouter = new Router();

eventsRouter.post('/create', multerConfig.upload.single('image'), events.createEvent);
eventsRouter.put('/:id/update', multerConfig.upload.single('image'), events.updateEvent);
eventsRouter.delete('/:id/delete', events.deleteEvent);
eventsRouter.get('/:id', events.readOneEvent);
eventsRouter.get('/', events.readEvents);

// tickets router
const ticketsRouter = new Router();

ticketsRouter.post('/create', tickets.createTickets);
ticketsRouter.put('/:id/check', tickets.checkTicket);
ticketsRouter.get('/:id', tickets.readOneTicket);
ticketsRouter.get('/', tickets.readTickets);

// main router
const mainRouter = new Router();

mainRouter.get('/ping', ping);
mainRouter.post('/auth', auth);
mainRouter.post('/exit', exit);

mainRouter.get('/home', pages.home);
mainRouter.get('/new', pages.newEvent);
mainRouter.get('/:id', pages.updateEvent);
mainRouter.get('/404', pages.notFound);
mainRouter.get('/', pages.auth);

module.exports = {
  mainRouter,
  eventsRouter,
  ticketsRouter,
};
