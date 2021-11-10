"use strict";

var ObjectId = require('mongodb').ObjectId;

module.exports = function _callee(req, res) {
  var db, id, filter, ticket;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db = req.db;
          id = req.params.id;
          _context.prev = 2;
          filter = {
            _id: new ObjectId(id)
          };
          _context.next = 6;
          return regeneratorRuntime.awrap(db.tickets.findOne(filter));

        case 6:
          ticket = _context.sent;

          if (ticket) {
            _context.next = 10;
            break;
          }

          res.send({
            status: 'error',
            message: 'ticket not found'
          });
          return _context.abrupt("return");

        case 10:
          res.send({
            status: 'ok',
            ticket: ticket
          });
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.send({
            status: 'error',
            message: 'reading from the database has failed'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 13]]);
};