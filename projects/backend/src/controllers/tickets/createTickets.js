const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const db = req.db;
  let number = 1;
  let event, filter;

  if (!req.body.eventId) {
    res.send({ status: 'error', message: 'cannot create ticket(s) for an uknown event' });
    return;
  }

  if (req.body.number) {
    number = Number(req.body.number);
  }
  delete req.body.number;

  try {
    filter = { _id: new ObjectId(req.body.eventId) };
    event = await db.events.findOne(filter);

    if (!event) {
      res.send({ status: 'error', message: 'event not found' });
      return;
    }

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

  req.body.data = Date.now();
  req.body.checked = false;

  try {
    // create new tickets
    const ticketsData = new Array(number)
      .fill(req.body)
      .map((el, i) => ({ ...el, number: event.tickets.sold + i + 1 }));
    await db.tickets.insertMany(ticketsData);

    // update number of sold tickets in events
    const ticketsSold = event.tickets.sold + number;
    const eventTickets = {
      ...event.tickets,
      sold: ticketsSold,
    };

    const result = await db.events.updateOne(filter, { $set: { tickets: eventTickets } });
    let message;

    if (result.modifiedCount === 0) {
      message = 'failed to update number of sold tickets';
    }

    // find all created tickets
    const query = {
      data: { $eq: req.body.data },
    };

    const tickets = await db.tickets.find(query).toArray();

    res.send({ status: 'ok', tickets: tickets, ticketsSold: message || ticketsSold });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'something went wrong' });
  }
};