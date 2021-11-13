const { isLogged } = require('../../utils');

module.exports = async (req, res) => {
  const login = await isLogged(req);

  if (login) {
    const pageTitle = 'Создать мероприятие';
    return res.render('newEvent', { pageTitle });
  } else {
    res.redirect('/');
  }
};
