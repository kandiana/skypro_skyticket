const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const details = { _id: new ObjectId(id) };

  db.collection('tickets').findOne(details, (err, item) => {
    console.log(item);
    if (err) {
      res.send({ status: 'error', message: 'ticket not found' });
    } else {
      res.send({ status: 'error', event: item });
    }
  });
};
