const MongoClient = require('mongodb').MongoClient;

const { PORT, DB_URL, DB_NAME } = require('../config');

module.exports = async (app) => {
  let client;

  try {
    client = await MongoClient.connect(DB_URL);

    console.log(`MongoDB connected on ${DB_URL}`);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    return client.db(DB_NAME);
    
  } catch (err) {
    console.log(err);
  }
};
