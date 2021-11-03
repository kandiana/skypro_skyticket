const path = require('path');

const PORT = process.env.PORT || 3000;

const DB_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URL || 'mongodb://localhost:27017'
    : process.env.DB_URL_LOCAL || 'mongodb://localhost:27017';

const DB_NAME = process.env.DB_NAME || 'skyTicket';

const imagesFolder = path.resolve(__dirname, '../files/images');

module.exports = {
  PORT,
  DB_URL,
  DB_NAME,
  imagesFolder,
};
