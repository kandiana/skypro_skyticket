const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const details = { _id: new ObjectId(id) };

  db.events.findOne(details, (_, item) => {
    if (!item) {
      res.send({ status: 'error', message: 'event not found' });
    } else {
      res.send({ status: 'ok', event: item });
    }
  });
};
