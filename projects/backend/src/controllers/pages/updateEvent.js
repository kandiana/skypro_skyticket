const { isLogged } = require('../../utils');
const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const login = await isLogged(req.db);

  if (!login) {
    res.redirect('/');
    return;
  }

  const db = req.db;
  const { id } = req.params;

  try {
    const filter = { _id: new ObjectId(id) };

    const event = await db.events.findOne(filter);
    const pageTitle = 'Редактировать мероприятие';

    const tzoffset = new Date().getTimezoneOffset() * 60000;
    event.startTimestamp = new Date(event.startTimestamp - tzoffset).toISOString().split('.')[0];
    event.endTimestamp = new Date(event.endTimestamp - tzoffset).toISOString().split('.')[0];

    return res.render('form', { pageTitle, event });
  } catch (err) {
    console.log(err);
  }
};
