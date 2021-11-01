module.exports = (req, res) => {
  const db = req.db;

  db.collection('test')
    .find()
    .toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(JSON.stringify(result));
      }
    });
};
