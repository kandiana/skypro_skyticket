"use strict";

var ObjectId = require('mongodb').ObjectId;

var _require = require('../../config'),
    imagesFolder = _require.imagesFolder;

var _require2 = require('../../utils'),
    deleteFile = _require2.deleteFile;

module.exports = function _callee(req, res) {
  var db, id, eventOld, filter, update, remove, _i, _Object$keys, key, value, result, event;

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
          return regeneratorRuntime.awrap(db.events.findOne(filter));

        case 6:
          eventOld = _context.sent;

          if (eventOld) {
            _context.next = 11;
            break;
          }

          if (req.body.img) {
            deleteFile(imagesFolder, req.body.img.name);
          }

          res.send({
            status: 'error',
            message: 'event not found'
          });
          return _context.abrupt("return");

        case 11:
          _context.next = 18;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.send({
            status: 'error',
            message: 'something went wrong'
          });
          return _context.abrupt("return");

        case 18:
          // set fields to update and to remove (categoryOther if not needed)
          update = {};
          remove = {};
          req.body.updated = Date.now();
          _i = 0, _Object$keys = Object.keys(req.body);

        case 22:
          if (!(_i < _Object$keys.length)) {
            _context.next = 42;
            break;
          }

          key = _Object$keys[_i];
          value = req.body[key];
          _context.t1 = key;
          _context.next = _context.t1 === 'categoryOther' ? 28 : _context.t1 === 'startTimestamp' ? 30 : _context.t1 === 'endTimestamp' ? 30 : _context.t1 === 'ticketsTotal' ? 32 : _context.t1 === 'img' ? 34 : 37;
          break;

        case 28:
          if (value === '') {
            remove[key] = value;
          } else {
            update[key] = value;
          }

          return _context.abrupt("break", 39);

        case 30:
          update[key] = Number(value) || new Date(value).getTime();
          return _context.abrupt("break", 39);

        case 32:
          update['tickets.total'] = Number(value);
          return _context.abrupt("break", 39);

        case 34:
          deleteFile(imagesFolder, eventOld.img.name);
          update[key] = value;
          return _context.abrupt("break", 39);

        case 37:
          if (value !== '') {
            update[key] = value;
          }

          return _context.abrupt("break", 39);

        case 39:
          _i++;
          _context.next = 22;
          break;

        case 42:
          _context.prev = 42;
          _context.next = 45;
          return regeneratorRuntime.awrap(db.events.updateOne(filter, {
            $set: update,
            $unset: remove
          }));

        case 45:
          result = _context.sent;

          if (!(result.modifiedCount === 0)) {
            _context.next = 50;
            break;
          }

          if (req.body.img) {
            deleteFile(imagesFolder, req.body.img.name);
          }

          res.send({
            status: 'error',
            message: 'nothing was modified'
          });
          return _context.abrupt("return");

        case 50:
          _context.next = 52;
          return regeneratorRuntime.awrap(db.events.findOne(filter));

        case 52:
          event = _context.sent;
          res.send({
            status: 'ok',
            modified: result.modifiedCount,
            event: event
          });
          _context.next = 60;
          break;

        case 56:
          _context.prev = 56;
          _context.t2 = _context["catch"](42);
          console.log(_context.t2);
          res.send({
            status: 'error',
            message: 'writing to the database has failed'
          });

        case 60:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 13], [42, 56]]);
};