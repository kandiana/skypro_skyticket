const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const db = req.db;
  let number = 1;
  let event, filter;

  // if no eventId, send error
  if (!req.body.eventId) {
    res.send({ status: 'error', message: 'cannot create ticket(s) for an uknown event' });
    return;
  }

  // get number of tickets to create
  if (req.body.number) {
    number = Number(req.body.number);
  }
  delete req.body.number;

  try {
    // find needed event
    filter = { _id: new ObjectId(req.body.eventId) };
    event = await db.events.findOne(filter);

    // send error if event not found
    if (!event) {
      res.send({ status: 'error', message: 'event not found' });
      return;
    }

    // check if there are enough tickets left
    const ticketsLeft = event.tickets.total - event.tickets.sold;

    if (ticketsLeft < number) {
      const phrase = ticketsLeft === 1 ? 'ticket is' : 'tickets are';
      res.send({ status: 'error', message: `only ${ticketsLeft} ${phrase} left` });
      return;
    }
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'something went wrong' });
    return;
  }

  // set other tickets parameters
  req.body.date = Date.now();
  req.body.checked = false;

  try {
    // create new tickets
    const ticketsData = new Array(number)
      .fill(req.body)
      .map((el, i) => ({ ...el, number: event.tickets.sold + i + 1 }));
    await db.tickets.insertMany(ticketsData);

    const result = await db.events.updateOne(filter, { $inc: { 'tickets.sold': number } });
    let message;

    if (result.modifiedCount === 0) {
      message = 'failed to update number of sold tickets';
    }

    // find all created tickets
    const query = {
      date: { $eq: req.body.date },
    };

    const ticketsCreated = await db.tickets.find(query).toArray();
    const { tickets } = await db.events.findOne(filter);

    res.send({
      status: 'ok',
      tickets: ticketsCreated,
      ticketsSold: message || tickets.sold,
    });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'something went wrong' });
  }
};
