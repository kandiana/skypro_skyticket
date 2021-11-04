module.exports = (req, res) => {
  const db = req.db;

  // console.log(req);

  db.collection('test').insertOne(req.body, (err, result) => {
    if (err) {
      res.send({ error: 'An error has occurred' });
    } else {
      res.send(result);
    }
  });
};
