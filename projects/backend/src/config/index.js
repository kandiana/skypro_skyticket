const path = require('path');

const PORT = process.env.PORT || 3000;

const DB_URL =
  process.env.NODE_ENV === 'production' ? process.env.DB_URL : process.env.DB_URL_LOCAL;

const DB_NAME = process.env.DB_NAME;

const imagesFolder = path.resolve(__dirname, '../../public/images');

const usersFolder = path.resolve(__dirname, '../../private/users');
const timers = [];

const LOGOUT_TIMEOUT = 1800000; // 30 minutes

module.exports = {
  PORT,
  DB_URL,
  DB_NAME,
  LOGOUT_TIMEOUT,
  imagesFolder,
  usersFolder,
  timers,
};
