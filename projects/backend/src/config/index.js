const path = require('path');

const PORT = process.env.PORT || 3000;

const DB_URL =
  process.env.NODE_ENV === 'production' ? process.env.DB_URL : process.env.DB_URL_LOCAL;

const DB_NAME = process.env.DB_NAME;

const imagesFolder = path.resolve(__dirname, '../../public/images');

module.exports = {
  PORT,
  DB_URL,
  DB_NAME,
  imagesFolder,
};
