require('dotenv').config();

const path = require('path');
const express = require('express');
const setupMiddlewares = require('./middlewares');
const mongoClient = require('./db');
const { multerConfig } = require('./utils');
const { imagesFolder } = require('./config');
const { mainRouter, eventsRouter, ticketsRouter } = require('./routers');
const app = express();

// connect to database and (if succeeded) start listening to port (see config)
let db;
mongoClient(app).then((database) => {
  db = database;
});

// setup view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'pages'));

// set up middlewares
setupMiddlewares(app);

app.use((req, _, next) => {
  req.db = db;
  req.s3 = multerConfig.s3;
  next();
});

// for static assets
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/images', express.static(imagesFolder));

// set up routes
app.use('/events', eventsRouter);
app.use('/tickets', ticketsRouter);
app.use('/', mainRouter);

// what happens after you press Ctrl+C
process.on('SIGINT', () => {
  db.close();
  process.exit();
});
