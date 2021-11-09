module.exports = (req, res) => {
  const { login, password } = req.body;

  if (login === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD) {
    res.send({ status: 'ok' });
  } else {
    res.send({ status: 'error', message: 'authorization denied' });
  }
};
