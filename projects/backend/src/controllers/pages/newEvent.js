const { isLogged } = require('../../utils');

module.exports = async (req, res) => {
  const login = await isLogged(req.db);

  if (login) {
    const pageTitle = 'Создать мероприятие';
    return res.render('form', { pageTitle });
  } else {
    res.redirect('/');
  }
};
