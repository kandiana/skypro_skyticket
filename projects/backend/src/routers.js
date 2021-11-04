const { Router } = require('express');

const { imagesFolder } = require('./config');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split('/')[1];
    req.body.img = `${uniqueSuffix}.${extension}`;
    cb(null, req.body.img);
  },
});

const upload = multer({ storage: storage });

const ping = require('./controllers/ping');
const test = require('./controllers/test');
// const events = require('./controllers/events');
// const tickets = require('./controllers/tickets');

const testRouter = new Router();

testRouter.get('/one/:id', test.readItem);
testRouter.get('/all', test.readAllItems);
testRouter.post('/new', upload.single('image'), test.insertItem);

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
