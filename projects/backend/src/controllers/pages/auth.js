module.exports = (req, res) => {
  const pageTitle = 'Авторизация';
  return res.render('auth', { pageTitle });
};
