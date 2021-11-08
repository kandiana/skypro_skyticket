const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const filter = { _id: new ObjectId(id) };

  try {
    const ticket = await db.tickets.findOne(filter);
    if (!ticket) {
      res.send({ status: 'error', message: 'ticket not found' });
      return;
    }

    res.send({ status: 'ok', ticket: ticket });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
