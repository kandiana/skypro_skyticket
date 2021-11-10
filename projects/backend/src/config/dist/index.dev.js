"use strict";

var path = require('path');

var PORT = process.env.PORT || 3000;
var DB_URL = process.env.NODE_ENV === 'production' ? process.env.DB_URL : process.env.DB_URL_LOCAL;
var DB_NAME = process.env.DB_NAME;
var imagesFolder = path.resolve(__dirname, '../../public/images');
module.exports = {
  PORT: PORT,
  DB_URL: DB_URL,
  DB_NAME: DB_NAME,
  imagesFolder: imagesFolder
};