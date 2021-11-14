"use strict";

var createTickets = require('./createTickets');

var readOneTicket = require('./readOneTicket');

var readTickets = require('./readTickets');

var checkTicket = require('./checkTicket');

module.exports = {
  createTickets: createTickets,
  readOneTicket: readOneTicket,
  readTickets: readTickets,
  checkTicket: checkTicket
};