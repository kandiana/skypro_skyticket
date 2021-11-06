const ObjectId = require('mongodb').ObjectId;
const { imagesFolder } = require('../../config');
const { deleteFile } = require('../../utils');

module.exports = async (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const filter = { _id: new ObjectId(id) };
  let eventOld;

  // look for needed item in bd
  try {
    eventOld = await db.events.findOne(filter);

    // if not found, delete uploaded file if there was one and send error
    if (!eventOld) {
      if (req.body.img) {
        deleteFile(imagesFolder, req.body.img.name);
      }

      res.send({ status: 'error', message: 'event not found' });
      return;
    }
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'something went wrong' });
    return;
  }

  const update = {};
  const remove = {};
  req.body.updated = Date.now();

  for (const key of Object.keys(req.body)) {
    const value = req.body[key];

    switch (key) {
      case 'categoryOther':
        if (value === '') {
          remove[key] = value;
        } else {
          update[key] = value;
        }
        break;

      case 'startTimestamp':
      case 'endTimestamp':
        update[key] = Number(value) || new Date(value).getTime();
        break;

      case 'ticketsTotal':
        update.tickets = {
          ...eventOld.tickets,
          total: Number(value),
        };
        break;

      case 'img':
        deleteFile(imagesFolder, eventOld.img.name);
        update[key] = value;
        break;

      default:
        if (value !== '') {
          update[key] = value;
        }
        break;
    }
  }

  try {
    const result = await db.events.updateOne(filter, { $set: update, $unset: remove });

    if (result.modifiedCount === 0) {
      if (req.body.img) {
        deleteFile(imagesFolder, req.body.img.name);
      }

      res.send({ status: 'error', message: 'nothing was modified' });
      return;
    }

    const event = await db.events.findOne(filter);

    res.send({
      status: 'ok',
      modified: result.modifiedCount,
      event: event,
    });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'writing to the database has failed' });
  }
};