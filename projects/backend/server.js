const express = require('express');

const MongoClient = require('mongodb').MongoClient;

const URL = process.env.DB_URL || 'mongodb://localhost:27017';
MongoClient.connect(url).then(() => {
  console.log(`MongoDB connected on ${url}`);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`);
});
