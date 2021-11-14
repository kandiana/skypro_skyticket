"use strict";

var createEvent = require('./createEvent');

var readOneEvent = require('./readOneEvent');

var readEvents = require('./readEvents');

var updateEvent = require('./updateEvent');

var deleteEvent = require('./deleteEvent');

module.exports = {
  createEvent: createEvent,
  readOneEvent: readOneEvent,
  readEvents: readEvents,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent
};