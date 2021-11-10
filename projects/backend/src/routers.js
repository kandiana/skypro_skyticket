const { Router } = require('express');
const { upload } = require('./utils');

// router controllers
const ping = require('./controllers/ping');
const auth = require('./controllers/auth');
const events = require('./controllers/events');
const tickets = require('./controllers/tickets');

// events router
const eventsRouter = new Router();

eventsRouter.post('/create', upload.single('image'), events.createEvent);
eventsRouter.put('/:id/update', upload.single('image'), events.updateEvent);
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

module.exports = {
  mainRouter,
  eventsRouter,
  ticketsRouter,
};
