const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const { imagesFolder } = require('../../config');

module.exports = (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const details = { _id: new ObjectId(id) };

  db.events.findOneAndDelete(details, (_, item) => {
    const event = item.value;
    if (!event) {
      res.send({ status: 'warning', message: 'event not found' });
    } else {
      fs.unlinkSync(`${imagesFolder}/${event.imgPath}`);
      console.log(`file ${event.imgPath} was deleted`);
      res.send({ status: 'ok', eventId: id });
    }
  });
};
