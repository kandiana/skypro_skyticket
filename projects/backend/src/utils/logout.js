const fs = require('fs');
const deleteFile = require('./deleteFile');
const { usersFolder } = require('../config');

module.exports = async (db) => {
  const userPath = `${usersFolder}/login.txt`;

  if (!fs.existsSync(userPath)) {
    return;
  }

  try {
    const login = fs.readFileSync(userPath, 'utf8');

    const filter = { login: login };

    const user = await db.users.findOne(filter);

    if (!user || user.logged === false) {
      return;
    }

    await db.users.updateOne(filter, { $set: { logged: false } });

    deleteFile(usersFolder, 'login.txt');
  } catch (err) {
    console.log(err);
  }
};
