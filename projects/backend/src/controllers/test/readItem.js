const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const details = { _id: new ObjectId(id) };

  db.collection('test').findOne(details, (err, item) => {
    console.log(item);
    if (err) {
      res.send({ error: 'An error has occurred' });
    } else {
      res.send(item);
    }
  });
};
