"use strict";

var fs = require('fs');

module.exports = function (folder, name) {
  var path = "".concat(folder, "/").concat(name);

  try {
    fs.unlinkSync(path);
    console.log("file ".concat(name, " was deleted"));
  } catch (err) {
    console.log(err);
  }
};