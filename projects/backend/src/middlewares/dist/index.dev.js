"use strict";

var _require = require('express'),
    json = _require.json,
    urlencoded = _require.urlencoded;

var _require2 = require('./cors'),
    cors = _require2.cors;

module.exports = function (app) {
  app.use(json());
  app.use(urlencoded({
    extended: true
  }));
  app.use(cors);
};