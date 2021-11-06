const { Router } = require('express');

const { imagesFolder } = require('./config');
const { nanoid } = require('nanoid');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolder);
  },
  filename: function (req, file, cb) {
    const imgName = `${nanoid()}.${file.mimetype.split('/')[1]}`;

    req.body.img = {
      name: imgName,
      url: `${req.headers.host}/images/${imgName}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
    };
    cb(null, req.body.img.name);
  },
});

const upload = multer({ storage: storage });

// router controllers
const ping = require('./controllers/ping');
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
ticketsRouter.get('/', tickets.readEventTickets);

// main router
const mainRouter = new Router();

mainRouter.get('/ping', ping);

module.exports = {
  mainRouter,
  eventsRouter,
  ticketsRouter,
};
