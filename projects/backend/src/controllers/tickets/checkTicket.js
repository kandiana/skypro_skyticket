const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const ticketFilter = { _id: new ObjectId(id) };

  try {
    const ticketOld = await db.tickets.findOne(ticketFilter);
    if (!ticketOld) {
      res.send({ status: 'error', message: 'ticket not found' });
      return;
    }

    if (ticketOld.checked) {
      res.send({ status: 'error', message: 'ticket is already checked' });
      return;
    }

    // look for corresponding event
    const eventFilter = { _id: new ObjectId(ticketOld.eventId) };
    const event = await db.events.findOne(eventFilter);

    if (!event) {
      res.send({ status: 'error', message: 'event not found' });
      return;
    }

    // check ticket
    const ticketCheckResult = await db.tickets.updateOne(ticketFilter, { $set: { checked: true } });

    if (ticketCheckResult.modifiedCount === 0) {
      res.send({ status: 'error', message: 'failed to check ticket' });
      return;
    }

    // update number of sold tickets in events
    const ticketsChecked = event.tickets.checked + 1;
    const eventTickets = {
      ...event.tickets,
      checked: ticketsChecked,
    };

    const eventUpdateResult = await db.events.updateOne(eventFilter, {
      $set: { tickets: eventTickets },
    });
    let message;

    if (eventUpdateResult.modifiedCount === 0) {
      message = 'failed to update number of checked tickets';
    }

    // get updated ticket
    const ticketNew = await db.tickets.findOne(ticketFilter);

    res.send({ status: 'ok', ticket: ticketNew, ticketsChecked: message || ticketsChecked });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'reading from the database has failed' });
  }
};
