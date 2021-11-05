const { Router } = require('express');

const { imagesFolder } = require('./config');
const { nanoid } = require('nanoid');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolder);
  },
  filename: function (req, file, cb) {
    req.body.img = `${nanoid()}.${file.mimetype.split('/')[1]}`;
    cb(null, req.body.img);
  },
});

const upload = multer({ storage: storage });

// router controllers
const ping = require('./controllers/ping');
const test = require('./controllers/test');
const events = require('./controllers/events');
const tickets = require('./controllers/tickets');

// test router
const testRouter = new Router();

testRouter.post('/create', upload.single('image'), test.insertItem);
testRouter.get('/:id', test.readItem);
testRouter.get('/', test.readAllItems);

// events router
const eventsRouter = new Router();

eventsRouter.post('/create', events.createEvent);
eventsRouter.put('/:id/update', events.updateEvent);
eventsRouter.post('/:id/delete', events.deleteEvent);
eventsRouter.get('/:id', events.readOneEvent);
eventsRouter.get('/', events.readEvents);

// tickets router
const ticketsRouter = new Router();

ticketsRouter.post('/create', tickets.createTickets);
ticketsRouter.put('/:id/check', tickets.checkTicket);
ticketsRouter.get('/:id', tickets.readTicket);

// main router
const mainRouter = new Router();

mainRouter.get('/ping', ping);

module.exports = {
  mainRouter,
  testRouter,
  eventsRouter,
  ticketsRouter,
};
