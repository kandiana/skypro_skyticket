require('dotenv').config();

const express = require('express');
const setupMiddlewares = require('./middlewares');
const mongoClient = require('./db');
const { mainRouter, testRouter, eventsRouter, ticketsRouter } = require('./routers');
const app = express();

// connecting to database and if we succeeded start listening to port (see config)
let db;
mongoClient(app).then((database) => {
  db = database;
});

// setting up middlewares
setupMiddlewares(app);

app.use((req, _, next) => {
  req.db = db;
  next();
});

// setting up routes
app.use('/test', testRouter);
app.use('/events', eventsRouter);
app.use('/tickets', ticketsRouter);
app.use('/', mainRouter);

// what happens after you press Ctrl+C
process.on('SIGINT', () => {
  db.close();
  process.exit();
});
