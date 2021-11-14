"use strict";

module.exports = function _callee(req, res) {
  var db, query, projection, sort, _req$query, type, start, size, today, tomorrow, events;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db = req.db;
          query = {};
          projection = {
            img: {
              url: 1
            },
            title: 1,
            city: 1,
            category: 1,
            startTimestamp: 1,
            endTimestamp: 1,
            tickets: {
              total: 1,
              sold: 1
            }
          };
          sort = {};
          _req$query = req.query, type = _req$query.type, start = _req$query.start, size = _req$query.size;
          today = Date.now();
          tomorrow = new Date().setHours(24, 0, 0, 0); // set query and sort parameters

          _context.t0 = type;
          _context.next = _context.t0 === 'actual' ? 10 : _context.t0 === 'old' ? 15 : _context.t0 === 'today' ? 20 : 26;
          break;

        case 10:
          query.endTimestamp = {
            $gt: today
          };
          sort.startTimeStamp = 1;
          sort.endTimestamp = 1;
          sort.created = 1;
          return _context.abrupt("break", 26);

        case 15:
          query.endTimestamp = {
            $lte: today
          };
          sort.startTimeStamp = -1;
          sort.endTimestamp = -1;
          sort.created = -1;
          return _context.abrupt("break", 26);

        case 20:
          query.endTimestamp = {
            $gt: today
          };
          query.startTimestamp = {
            $lt: tomorrow
          };
          sort.startTimeStamp = 1;
          sort.endTimestamp = 1;
          sort.created = 1;
          return _context.abrupt("break", 26);

        case 26:
          if (!start) {
            start = 0;
          } else {
            start = Number(start);
          }

          if (!size) {
            size = 0;
          } else {
            size = Number(size);
          }

          _context.prev = 28;
          _context.next = 31;
          return regeneratorRuntime.awrap(db.events.find(query).project(projection).sort(sort).skip(start).limit(size).toArray());

        case 31:
          events = _context.sent;
          res.send({
            status: 'ok',
            events: events
          });
          _context.next = 40;
          break;

        case 35:
          _context.prev = 35;
          _context.t1 = _context["catch"](28);
          console.log(_context.t1);
          res.send({
            status: 'error',
            message: 'reading from the database has failed'
          });
          return _context.abrupt("return");

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[28, 35]]);
};