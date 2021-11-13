const { isLogged } = require('../../utils');

module.exports = async (req, res) => {
  const login = await isLogged(req.db);

  if (login) {
    const pageTitle = 'Главная страница';
    return res.render('home', { pageTitle });
  } else {
    res.redirect('/');
  }
};
