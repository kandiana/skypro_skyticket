module.exports = (req, res) => {
  const db = req.db;

  db.events.find().toArray(function (err, result) {
    if (err) {
      console.log(err);
      res.send({ error: 'An error has occurred' });
    } else {
      res.send(JSON.stringify(result));
    }
  });
};
