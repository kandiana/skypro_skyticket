const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const { imagesFolder } = require('../../config');

module.exports = (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const filter = { _id: new ObjectId(id) };

  db.events.findOneAndDelete(filter, (_, item) => {
    const event = item.value;
    if (!event) {
      res.send({ status: 'warning', message: 'event not found' });
      return;
    }

    const path = `${imagesFolder}/${event.img.name}`;
    try {
      fs.unlinkSync(path);
      console.log(`file ${path} was deleted`);
    } catch (err) {
      console.log(err);
    }

    res.send({ status: 'ok', eventId: id });
  });
};
