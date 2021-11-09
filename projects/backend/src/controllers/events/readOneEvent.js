const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const db = req.db;
  const { id } = req.params;

  try {
    const filter = { _id: new ObjectId(id) };

    const event = await db.events.findOne(filter);

    if (!event) {
      res.send({ status: 'error', message: 'event not found' });
      return;
    }

    res.send({ status: 'ok', event: event });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
