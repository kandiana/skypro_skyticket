module.exports = async (req, res) => {
  const db = req.db;
  const query = {};
  let { type, start, size } = req.query;

  switch (type) {
    case 'actual':
      query.endTimestamp = { $gt: Date.now() };
      break;
    case 'old':
      query.endTimestamp = { $lte: Date.now() };
      break;
  }

  if (!start) {
    start = 0;
  } else {
    start = Number(start);
  }

  if (!size) {
    size = 0;
  } else {
    size = Number(size);
  }

  try {
    const events = await db.events.find(query).skip(start).limit(size).toArray();
    res.send({ status: 'ok', events: events });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
    return;
  }
};
