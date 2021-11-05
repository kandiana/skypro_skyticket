const { json, urlencoded } = require('express');
const { cors } = require('./cors');

module.exports = (app) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors);
};
