"use strict";

var MongoClient = require('mongodb').MongoClient;

var _require = require('../config'),
    PORT = _require.PORT,
    DB_URL = _require.DB_URL,
    DB_NAME = _require.DB_NAME;

module.exports = function _callee(app) {
  var client, db;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(MongoClient.connect(DB_URL));

        case 3:
          client = _context.sent;
          console.log("MongoDB connected on ".concat(DB_URL));
          app.listen(PORT, function () {
            console.log("Server started on port ".concat(PORT));
          });
          db = client.db(DB_NAME);
          db.events = db.collection('events');
          db.tickets = db.collection('tickets');
          return _context.abrupt("return", db);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};