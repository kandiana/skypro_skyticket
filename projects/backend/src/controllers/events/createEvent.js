module.exports = async (req, res) => {
  const db = req.db;

  if (req.body.categoryOther === '') {
    delete req.body.categoryOther;
  }

  req.body.startTimestamp =
    Number(req.body.startTimestamp) || new Date(req.body.startTimestamp).getTime();
  req.body.endTimestamp =
    Number(req.body.endTimestamp) || new Date(req.body.endTimestamp).getTime();

  req.body.tickets = {
    total: Number(req.body.ticketsTotal),
    sold: 0,
    checked: 0,
  };

  delete req.body.ticketsTotal;

  req.body.created = Date.now();
  req.body.updated = req.body.created;

  try {
    const event = await db.events.insertOne(req.body);
    res.send({ status: 'ok', eventId: event.insertedId });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'writing to the database has failed' });
  }
};
