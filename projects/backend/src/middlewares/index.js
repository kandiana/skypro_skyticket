const { json, urlencoded } = require('express');

module.exports = (app) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
};
