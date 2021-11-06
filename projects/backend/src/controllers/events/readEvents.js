module.exports = async (req, res) => {
  const db = req.db;
  const query = {};
  const sort = {};
  let { type, start, size } = req.query;

  // set query and sort parameters
  switch (type) {
    case 'actual':
      query.endTimestamp = { $gt: Date.now() };
      sort.startTimeStamp = 1;
      sort.endTimestamp = 1;
      sort.created = 1;
      break;

    case 'old':
      query.endTimestamp = { $lte: Date.now() };
      sort.startTimeStamp = -1;
      sort.endTimestamp = -1;
      sort.created = -1;
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
    const events = await db.events.find(query).sort(sort).skip(start).limit(size).toArray();
    res.send({ status: 'ok', events: events });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
    return;
  }
};
