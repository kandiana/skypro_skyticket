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

const ping = require('./controllers/ping');
const test = require('./controllers/test');
// const events = require('./controllers/events');
// const tickets = require('./controllers/tickets');

const testRouter = new Router();

testRouter.get('/:id', test.readItem);
testRouter.get('/', test.readAllItems);
testRouter.post('/', upload.single('image'), test.insertItem);

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
