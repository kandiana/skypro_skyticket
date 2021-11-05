const cors = (req, res, next) => {
  const origins = process.env.FRONT_URLS;

  for (let i = 0; i < origins.length; i++) {
    const origin = origins[i];

    if (req.headers.origin?.indexOf(origin) > -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

module.exports = {
  cors,
};
