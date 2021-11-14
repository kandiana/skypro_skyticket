const fs = require('fs');
const { usersFolder, LOGOUT_TIMEOUT, timers } = require('../config');
const { logout } = require('../utils');

module.exports = async (req, res) => {
  const db = req.db;
  const { login, password } = req.body;

  if (!login) {
    res.send({ status: 'error', message: 'authorization denied' });
    return;
  }

  try {
    const filter = { login: login };

    const user = await db.users.findOne(filter);

    if (!user || user.password !== password) {
      res.send({ status: 'error', message: 'authorization denied' });
      return;
    }

    await db.users.updateOne(filter, { $set: { logged: true } });

    const timer = setTimeout(() => {
      console.log('2');
      logout(db);
    }, LOGOUT_TIMEOUT);

    timers.push(timer);

    fs.writeFileSync(`${usersFolder}/login.txt`, login);

    res.send({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
