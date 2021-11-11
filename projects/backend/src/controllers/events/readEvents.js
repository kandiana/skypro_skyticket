module.exports = async (req, res) => {
  const db = req.db;
  const query = {};
  const projection = {
    img: { url: 1 },
    title: 1,
    city: 1,
    category: 1,
    startTimestamp: 1,
    endTimestamp: 1,
    tickets: {
      total: 1,
      sold: 1,
    },
  };
  const sort = {};
  let { type, start, size } = req.query;
  const today = Date.now();
  const twoHoursLater = today + 2 * 60 * 60 * 1000;
  const tomorrow = new Date().setHours(24, 0, 0, 0);

  // set query and sort parameters
  switch (type) {
    case 'actual':
      query.endTimestamp = { $gt: today };
      sort.startTimeStamp = 1;
      sort.endTimestamp = 1;
      sort.created = 1;
      break;

    case 'old':
      query.endTimestamp = { $lte: today };
      sort.startTimeStamp = -1;
      sort.endTimestamp = -1;
      sort.created = -1;
      break;

    case 'today':
      query.endTimestamp = { $gt: today };
      query.startTimestamp = { $lt: Math.max(twoHoursLater, tomorrow) };
      sort.startTimeStamp = 1;
      sort.endTimestamp = 1;
      sort.created = 1;
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
    const events = await db.events
      .find(query)
      .project(projection)
      .sort(sort)
      .skip(start)
      .limit(size)
      .toArray();
    res.send({ status: 'ok', events: events });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
    return;
  }
};
