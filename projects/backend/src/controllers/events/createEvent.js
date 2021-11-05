module.exports = (req, res) => {
  const db = req.db;

  if (req.body.categoryOther === '') {
    delete req.body.categoryOther;
  }

  req.body.tickets = {
    total: req.body.ticketsTotal,
    sold: 0,
    checked: 0,
  };

  delete req.body.ticketsTotal;

  req.body.created = new Date();
  req.body.updated = req.body.created;

  db.events.insertOne(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: 'error', message: 'writing to the database has failed' });
    } else {
      res.send({ status: 'ok', eventId: result.insertedId });
    }
  });
};
