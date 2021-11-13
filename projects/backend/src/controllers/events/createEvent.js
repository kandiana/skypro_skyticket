const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const db = req.db;

  if (!req.body.img) {
    req.body.img = {};
  }

  // categoryOther is saved only when not empty
  if (req.body.categoryOther === '') {
    delete req.body.categoryOther;
  }

  // if dates are not numbers, change them to numbers
  req.body.startTimestamp =
    Number(req.body.startTimestamp) || new Date(req.body.startTimestamp).getTime();
  req.body.endTimestamp =
    Number(req.body.endTimestamp) || new Date(req.body.endTimestamp).getTime();

  // set tickets object
  req.body.tickets = {
    total: Number(req.body.ticketsTotal) || 0,
    sold: 0,
    checked: 0,
  };

  delete req.body.ticketsTotal;

  // set create/update dates
  req.body.created = Date.now();
  req.body.updated = req.body.created;

  try {
    const result = await db.events.insertOne(req.body);

    const filter = { _id: new ObjectId(result.insertedId) };
    const event = await db.events.findOne(filter);

    res.send({ status: 'ok', event: event });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'writing to the database has failed' });
  }
};
