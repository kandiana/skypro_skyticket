"use strict";

module.exports = function (req, res) {
  var _req$body = req.body,
      login = _req$body.login,
      password = _req$body.password;

  if (login === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD) {
    res.send({
      status: 'ok'
    });
  } else {
    res.send({
      status: 'error',
      message: 'authorization denied'
    });
  }
};