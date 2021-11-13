const { isLogged, deleteFile } = require('../utils');
const { usersFolder } = require('../config');

module.exports = async (req, res) => {
  const db = req.db;

  const login = await isLogged(req);

  if (!login) {
    res.send({ status: 'error', message: 'user is not logged' });
    return;
  }

  try {
    const filter = { login: login };

    const user = await db.users.findOne(filter);

    if (!user || user.logged === false) {
      res.send({ status: 'error', message: 'user is not logged' });
      return;
    }

    await db.users.updateOne(filter, { $set: { logged: false } });

    deleteFile(usersFolder, 'login.txt');

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
