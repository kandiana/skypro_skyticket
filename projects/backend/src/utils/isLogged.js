const fs = require('fs');
const { usersFolder, LOGOUT_TIMEOUT, timers } = require('../config');
const logout = require('./logout');

module.exports = async (db) => {
  const userPath = `${usersFolder}/login.txt`;

  if (!fs.existsSync(userPath)) {
    return;
  }

  try {
    const login = fs.readFileSync(userPath, 'utf8');

    const filter = { login: login };

    const user = await db.users.findOne(filter);

    if (!user?.logged) {
      return;
    }

    clearTimeout(timers.pop());

    const timer = setTimeout(() => {
      console.log('1');
      logout(db);
    }, LOGOUT_TIMEOUT);

    timers.push(timer);

    return login;
  } catch (err) {
    console.log(err);
    return;
  }
};
