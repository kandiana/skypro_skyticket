"use strict";

var ObjectId = require('mongodb').ObjectId;

module.exports = function _callee(req, res) {
  var db, result, filter, event;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db = req.db; // categoryOther is saved only when not empty

          if (req.body.categoryOther === '') {
            delete req.body.categoryOther;
          } // if dates are not numbers, change them to numbers


          req.body.startTimestamp = Number(req.body.startTimestamp) || new Date(req.body.startTimestamp).getTime();
          req.body.endTimestamp = Number(req.body.endTimestamp) || new Date(req.body.endTimestamp).getTime(); // set tickets object

          req.body.tickets = {
            total: Number(req.body.ticketsTotal),
            sold: 0,
            checked: 0
          };
          delete req.body.ticketsTotal; // set create/update dates

          req.body.created = Date.now();
          req.body.updated = req.body.created;
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(db.events.insertOne(req.body));

        case 11:
          result = _context.sent;
          filter = {
            _id: new ObjectId(result.insertedId)
          };
          _context.next = 15;
          return regeneratorRuntime.awrap(db.events.findOne(filter));

        case 15:
          event = _context.sent;
          res.send({
            status: 'ok',
            event: event
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](8);
          console.log(_context.t0);
          res.send({
            status: 'error',
            message: 'writing to the database has failed'
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 19]]);
};