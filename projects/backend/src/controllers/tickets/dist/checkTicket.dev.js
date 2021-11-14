"use strict";

var ObjectId = require('mongodb').ObjectId;

module.exports = function _callee(req, res) {
  var db, id, eventId, ticketFilter, ticketOld, eventFilter, event, ticketCheckResult, eventUpdateResult, ticketUpdated, _ref, tickets;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          db = req.db;
          id = req.params.id;
          eventId = req.body.eventId;

          if (eventId) {
            _context.next = 6;
            break;
          }

          res.send({
            status: 'error',
            message: 'unknown event',
            messageRus: 'Не указано мероприятие'
          });
          return _context.abrupt("return");

        case 6:
          _context.prev = 6;
          ticketFilter = {
            _id: new ObjectId(id)
          }; // look fot ticket to check

          _context.next = 10;
          return regeneratorRuntime.awrap(db.tickets.findOne(ticketFilter));

        case 10:
          ticketOld = _context.sent;

          if (ticketOld) {
            _context.next = 14;
            break;
          }

          res.send({
            status: 'error',
            message: 'ticket not found',
            messageRus: 'Билет не найден'
          });
          return _context.abrupt("return");

        case 14:
          if (!(ticketOld.eventId !== eventId)) {
            _context.next = 17;
            break;
          }

          res.send({
            status: 'error',
            message: 'wrong event',
            messageRus: 'Билет на другое мероприятие'
          });
          return _context.abrupt("return");

        case 17:
          if (!ticketOld.checked) {
            _context.next = 20;
            break;
          }

          res.send({
            status: 'error',
            message: 'ticket is already checked',
            messageRus: 'Билет уже отмечен'
          });
          return _context.abrupt("return");

        case 20:
          // look for corresponding event
          eventFilter = {
            _id: new ObjectId(ticketOld.eventId)
          };
          _context.next = 23;
          return regeneratorRuntime.awrap(db.events.findOne(eventFilter));

        case 23:
          event = _context.sent;

          if (event) {
            _context.next = 27;
            break;
          }

          res.send({
            status: 'error',
            message: 'event not found',
            messageRus: 'Мероприятие не найдено'
          });
          return _context.abrupt("return");

        case 27:
          _context.next = 29;
          return regeneratorRuntime.awrap(db.tickets.updateOne(ticketFilter, {
            $set: {
              checked: true
            }
          }));

        case 29:
          ticketCheckResult = _context.sent;

          if (!(ticketCheckResult.modifiedCount === 0)) {
            _context.next = 33;
            break;
          }

          res.send({
            status: 'error',
            message: 'failed to check ticket',
            messageRus: 'Ошибка проверки билета'
          });
          return _context.abrupt("return");

        case 33:
          _context.next = 35;
          return regeneratorRuntime.awrap(db.events.updateOne(eventFilter, {
            $inc: {
              'tickets.checked': 1
            }
          }));

        case 35:
          eventUpdateResult = _context.sent;

          if (eventUpdateResult.modifiedCount === 0) {
            console.log('failed to update number of checked tickets');
          } // get updated ticket


          _context.next = 39;
          return regeneratorRuntime.awrap(db.tickets.findOne(ticketFilter));

        case 39:
          ticketUpdated = _context.sent;
          _context.next = 42;
          return regeneratorRuntime.awrap(db.events.findOne(eventFilter));

        case 42:
          _ref = _context.sent;
          tickets = _ref.tickets;
          res.send({
            status: 'ok',
            ticket: ticketUpdated,
            ticketsChecked: tickets.checked,
            ticketsSold: tickets.sold
          });
          _context.next = 51;
          break;

        case 47:
          _context.prev = 47;
          _context.t0 = _context["catch"](6);
          console.log(_context.t0);
          res.send({
            status: 'error',
            message: 'reading from the database has failed',
            messageRus: 'Ошибка чтения из БД'
          });

        case 51:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 47]]);
};