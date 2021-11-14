const { logout } = require('../utils');
const { timers } = require('../config');

module.exports = async (req, res) => {
  logout(req.db);
  clearTimeout(timers.pop());
  res.redirect('/');
};
