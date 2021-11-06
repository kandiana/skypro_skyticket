const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const filter = { _id: new ObjectId(id) };

  db.events.findOne(filter, (_, item) => {
    if (!item) {
      res.send({ status: 'error', message: 'event not found' });
      return;
    }

    res.send({ status: 'ok', event: item });
  });
};
