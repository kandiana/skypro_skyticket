"use strict";

require('dotenv').config();

var path = require('path');

var express = require('express');

var setupMiddlewares = require('./middlewares');

var mongoClient = require('./db');

var _require = require('./config'),
    imagesFolder = _require.imagesFolder;

var _require2 = require('./routers'),
    mainRouter = _require2.mainRouter,
    eventsRouter = _require2.eventsRouter,
    ticketsRouter = _require2.ticketsRouter;

var app = express(); // connecting to database and if we succeeded start listening to port (see config)

var db;
mongoClient(app).then(function (database) {
  db = database;
}); // setting up middlewares

setupMiddlewares(app);
app.use(function (req, _, next) {
  req.db = db;
  next();
}); // for static assets

app.use(express["static"](path.resolve(__dirname, 'static')));
app.use('/images', express["static"](imagesFolder)); // setting up routes

app.use('/events', eventsRouter);
app.use('/tickets', ticketsRouter);
app.use('/', mainRouter); // what happens after you press Ctrl+C

process.on('SIGINT', function () {
  db.close();
  process.exit();
});