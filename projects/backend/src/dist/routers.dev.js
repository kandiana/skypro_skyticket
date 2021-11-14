"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('./config'),
    imagesFolder = _require2.imagesFolder;

var _require3 = require('nanoid'),
    nanoid = _require3.nanoid;

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, imagesFolder);
  },
  filename: function filename(req, file, cb) {
    var imgName = "".concat(nanoid(), ".").concat(file.mimetype.split('/')[1]);
    req.body.img = {
      name: imgName,
      url: "".concat(req.protocol, "://").concat(req.headers.host, "/images/").concat(imgName),
      originalName: file.originalname,
      mimetype: file.mimetype
    };
    cb(null, req.body.img.name);
  }
});
var upload = multer({
  storage: storage
}); // router controllers

var ping = require('./controllers/ping');

var auth = require('./controllers/auth');

var events = require('./controllers/events');

var tickets = require('./controllers/tickets'); // events router


var eventsRouter = new Router();
eventsRouter.post('/create', upload.single('image'), events.createEvent);
eventsRouter.put('/:id/update', upload.single('image'), events.updateEvent);
eventsRouter["delete"]('/:id/delete', events.deleteEvent);
eventsRouter.get('/:id', events.readOneEvent);
eventsRouter.get('/', events.readEvents); // tickets router

var ticketsRouter = new Router();
ticketsRouter.post('/create', tickets.createTickets);
ticketsRouter.put('/:id/check', tickets.checkTicket);
ticketsRouter.get('/:id', tickets.readOneTicket);
ticketsRouter.get('/', tickets.readTickets); // main router

var mainRouter = new Router();
mainRouter.get('/ping', ping);
mainRouter.post('/auth', auth);
module.exports = {
  mainRouter: mainRouter,
  eventsRouter: eventsRouter,
  ticketsRouter: ticketsRouter
};