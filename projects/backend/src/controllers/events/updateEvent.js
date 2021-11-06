const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const { imagesFolder } = require('../../config');

module.exports = async (req, res) => {
  const db = req.db;
  const { id } = req.params;

  const filter = { _id: new ObjectId(id) };
  const update = {};

  req.body.updated = new Date();

  for (const key of Object.keys(req.body)) {
    let res;
    switch (key) {
      case '':
        break;

      case 'ticketsTotal':
        res = await db.events.findOne(filter);
        console.log('tickets2', res);
        break;

      case 'img':
        db.events.findOne(filter, (_, item) => {
          if (!item) {
            try {
              const path = `${imagesFolder}/${req.body.img.name}`;
              fs.unlinkSync(path);
              console.log(`file ${path} was deleted`);
            } catch (err) {
              console.log(err);
            }

            res.send({ status: 'error', message: 'event not found' });
            return;
          } else {
            try {
              const path = `${imagesFolder}/${item.img.name}`;
              fs.unlinkSync(path);
              console.log(`file ${path} was deleted`);
            } catch (err) {
              console.log(err);
            }
          }
        });
        console.log('image');
        update[key] = req.body[key];
        break;

      default:
        update[key] = req.body[key];
        break;
    }
  }

  db.events.updateOne(filter, { $set: update }, (err, result) => {
    console.log('here');
    if (err) {
      console.log(err);

      if (req.body.img) {
        try {
          const path = `${imagesFolder}/${req.body.img.name}`;
          fs.unlinkSync(path);
          console.log(`file ${path} was deleted`);
        } catch (err) {
          console.log(err);
        }
      }

      res.send({ status: 'error', message: 'writing to the database has failed' });
      return;
    }

    if (result.modifiedCount === 0) {
      if (req.body.img) {
        try {
          const path = `${imagesFolder}/${req.body.img.name}`;
          fs.unlinkSync(path);
          console.log(`file ${path} was deleted`);
        } catch (err) {
          console.log(err);
        }
      }

      res.send({ status: 'error', message: 'event not found' });
      return;
    }

    res.send({
      status: 'ok',
      modified: {
        count: result.modifiedCount,
        id: id,
      },
    });
  });
};
