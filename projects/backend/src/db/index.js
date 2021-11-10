const MongoClient = require('mongodb').MongoClient;

const { PORT, DB_URL, DB_NAME } = require('../config');

module.exports = async (app) => {
  let client;
  console.log(process.env.NODE_ENV);

  try {
    client = await MongoClient.connect(DB_URL);

    if (process.env.NODE_ENV === 'development') {
      console.log(`MongoDB connected on ${DB_URL}`);
    }

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    const db = client.db(DB_NAME);

    db.events = db.collection('events');
    db.tickets = db.collection('tickets');

    return db;
  } catch (err) {
    console.log(err);
  }
};
