const auth = require('./auth');
const notFound = require('./404');
const home = require('./home');
const newEvent = require('./newEvent');
const updateEvent = require('./updateEvent');

module.exports = {
  auth,
  notFound,
  home,
  newEvent,
  updateEvent,
};
