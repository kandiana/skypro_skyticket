const ObjectId = require('mongodb').ObjectId;
const { imagesFolder } = require('../../config');
const { deleteFile } = require('../../utils');

module.exports = async (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const filter = { _id: new ObjectId(id) };

  try {
    const item = await db.events.findOneAndDelete(filter);
    const event = item.value;

    if (!event) {
      res.send({ status: 'warning', message: 'event not found' });
      return;
    }

    // delete event image
    deleteFile(imagesFolder, event.img.name);

    res.send({ status: 'ok', eventId: id });
  } catch (err) {
    console.log(err);
    res.send({ status: 'error', message: 'something went wrong' });
  }
};
