"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ObjectId = require('mongodb').ObjectId;

module.exports = function _callee(req, res) {
  var db, number, event, filter, ticketsLeft, phrase, ticketsData, result, query, ticketsCreated, _ref, tickets;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db = req.db;
          number = 1;

          if (req.body.eventId) {
            _context.next = 5;
            break;
          }

          res.send({
            status: 'error',
            message: 'cannot create ticket(s) for an uknown event'
          });
          return _context.abrupt("return");

        case 5:
          // get number of tickets to create
          if (req.body.number) {
            number = Number(req.body.number);
          }

          delete req.body.number;
          _context.prev = 7;
          // find needed event
          filter = {
            _id: new ObjectId(req.body.eventId)
          };
          _context.next = 11;
          return regeneratorRuntime.awrap(db.events.findOne(filter));

        case 11:
          event = _context.sent;

          if (event) {
            _context.next = 15;
            break;
          }

          res.send({
            status: 'error',
            message: 'event not found'
          });
          return _context.abrupt("return");

        case 15:
          // check if there are enough tickets left
          ticketsLeft = event.tickets.total - event.tickets.sold;

          if (!(ticketsLeft < number)) {
            _context.next = 20;
            break;
          }

          phrase = ticketsLeft === 1 ? 'ticket is' : 'tickets are';
          res.send({
            status: 'error',
            message: "only ".concat(ticketsLeft, " ").concat(phrase, " left")
          });
          return _context.abrupt("return");

        case 20:
          _context.next = 27;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](7);
          console.log(_context.t0);
          res.send({
            status: 'error',
            message: 'something went wrong'
          });
          return _context.abrupt("return");

        case 27:
          // set other tickets parameters
          req.body.date = Date.now();
          req.body.checked = false;
          _context.prev = 29;
          // create new tickets
          ticketsData = new Array(number).fill(req.body).map(function (el, i) {
            return _objectSpread({}, el, {
              number: event.tickets.sold + i + 1
            });
          });
          _context.next = 33;
          return regeneratorRuntime.awrap(db.tickets.insertMany(ticketsData));

        case 33:
          _context.next = 35;
          return regeneratorRuntime.awrap(db.events.updateOne(filter, {
            $inc: {
              'tickets.sold': number
            }
          }));

        case 35:
          result = _context.sent;

          if (result.modifiedCount === 0) {
            console.log('failed to update number of sold tickets');
          } // find all created tickets


          query = {
            date: {
              $eq: req.body.date
            }
          };
          _context.next = 40;
          return regeneratorRuntime.awrap(db.tickets.find(query).toArray());

        case 40:
          ticketsCreated = _context.sent;
          _context.next = 43;
          return regeneratorRuntime.awrap(db.events.findOne(filter));

        case 43:
          _ref = _context.sent;
          tickets = _ref.tickets;
          res.send({
            status: 'ok',
            tickets: ticketsCreated,
            ticketsSold: tickets.sold
          });
          _context.next = 52;
          break;

        case 48:
          _context.prev = 48;
          _context.t1 = _context["catch"](29);
          console.log(_context.t1);
          res.send({
            status: 'error',
            message: 'something went wrong'
          });

        case 52:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 22], [29, 48]]);
};