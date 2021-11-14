"use strict";

module.exports = function _callee(req, res) {
  var db, query, _req$query, eventId, checked, tickets;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db = req.db;
          query = {};
          _req$query = req.query, eventId = _req$query.eventId, checked = _req$query.checked;

          if (eventId && eventId !== '') {
            query.eventId = {
              $eq: eventId
            };
          }

          if (checked && checked !== '') {
            query.checked = {
              $eq: checked === 'true' ? true : false
            };
          }

          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(db.tickets.find(query).toArray());

        case 8:
          tickets = _context.sent;
          res.send({
            status: 'ok',
            ticket: tickets
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);
          res.send({
            status: 'error',
            message: 'reading from the database has failed'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
};