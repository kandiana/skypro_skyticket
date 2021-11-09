const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const db = req.db;
  const { id } = req.params;
  const { eventId } = req.body;

  if (!eventId) {
    res.send({ status: 'error', message: 'unknown event', messageRus: 'Не указано мероприятие' });
    return;
  }

  try {
    const ticketFilter = { _id: new ObjectId(id) };

    // look fot ticket to check
    const ticketOld = await db.tickets.findOne(ticketFilter);
    // if not found or checked send eror
    if (!ticketOld) {
      res.send({ status: 'error', message: 'ticket not found', messageRus: 'Билет не найден' });
      return;
    }

    if (ticketOld.eventId !== eventId) {
      res.send({
        status: 'error',
        message: 'wrong event',
        messageRus: 'Билет на другое мероприятие',
      });
      return;
    }

    if (ticketOld.checked) {
      res.send({
        status: 'error',
        message: 'ticket is already checked',
        messageRus: 'Билет уже отмечен',
      });
      return;
    }

    // look for corresponding event
    const eventFilter = { _id: new ObjectId(ticketOld.eventId) };
    const event = await db.events.findOne(eventFilter);

    if (!event) {
      res.send({
        status: 'error',
        message: 'event not found',
        messageRus: 'Мероприятие не найдено',
      });
      return;
    }

    // check ticket
    const ticketCheckResult = await db.tickets.updateOne(ticketFilter, { $set: { checked: true } });

    if (ticketCheckResult.modifiedCount === 0) {
      res.send({
        status: 'error',
        message: 'failed to check ticket',
        messageRus: 'Ошибка проверки билета',
      });
      return;
    }

    const eventUpdateResult = await db.events.updateOne(eventFilter, {
      $inc: { 'tickets.checked': 1 },
    });

    if (eventUpdateResult.modifiedCount === 0) {
      console.log('failed to update number of checked tickets');
    }

    // get updated ticket
    const ticketUpdated = await db.tickets.findOne(ticketFilter);
    const { tickets } = await db.events.findOne(eventFilter);

    res.send({
      status: 'ok',
      ticket: ticketUpdated,
      ticketsChecked: tickets.checked,
      ticketsSold: tickets.sold,
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 'error',
      message: 'reading from the database has failed',
      messageRus: 'Ошибка чтения из БД',
    });
  }
};
