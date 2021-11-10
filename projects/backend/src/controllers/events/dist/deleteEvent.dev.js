"use strict";

var ObjectId = require('mongodb').ObjectId;

var _require = require('../../config'),
    imagesFolder = _require.imagesFolder;

var _require2 = require('../../utils'),
    deleteFile = _require2.deleteFile;

module.exports = function _callee(req, res) {
  var db, id, filter, item, event;
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
          return regeneratorRuntime.awrap(db.events.findOneAndDelete(filter));

        case 6:
          item = _context.sent;
          event = item.value;

          if (event) {
            _context.next = 11;
            break;
          }

          res.send({
            status: 'warning',
            message: 'event not found'
          });
          return _context.abrupt("return");

        case 11:
          // delete event image
          deleteFile(imagesFolder, event.img.name);
          res.send({
            status: 'ok',
            eventId: id
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.send({
            status: 'error',
            message: 'something went wrong'
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 15]]);
};