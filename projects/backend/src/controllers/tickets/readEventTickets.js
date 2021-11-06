module.exports = async (req, res) => {
  const db = req.db;
  const { eventId } = req.params;
  const query = { eventId: { $eq: eventId } };

  try {
    const tickets = await db.tickets.find(query).toArray();
    res.send({ status: 'ok', ticket: tickets });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
