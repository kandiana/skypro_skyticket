const fs = require('fs');
const { usersFolder } = require('../config');

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

    fs.writeFileSync(`${usersFolder}/login.txt`, login);

    res.send({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
