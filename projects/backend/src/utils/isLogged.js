const fs = require('fs');
const { usersFolder } = require('../config');

module.exports = async (req) => {
  const db = req.db;
  const path = `${usersFolder}/login.txt`;

  if (!fs.existsSync(path)) {
    return;
  }

  try {
    const login = fs.readFileSync(`${usersFolder}/login.txt`, 'utf8');

    const filter = { login: login };

    const user = await db.users.findOne(filter);

    if (!user?.logged) {
      return;
    }

    return login;
  } catch (err) {
    console.log(err);
    return;
  }
};
