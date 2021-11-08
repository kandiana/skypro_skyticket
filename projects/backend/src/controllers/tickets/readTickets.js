module.exports = async (req, res) => {
  const db = req.db;
  const query = {};
  const { eventId, checked } = req.query;

  if (eventId && eventId !== '') {
    query.eventId = { $eq: eventId };
  }

  if (checked && checked !== '') {
    query.checked = { $eq: checked === 'true' ? true : false };
  }

  try {
    const tickets = await db.tickets.find(query).toArray();
    res.send({ status: 'ok', ticket: tickets });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
