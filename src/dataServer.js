'use strict';

var mongodb = require('mongodb');
var dataProvider = require('./dataProvider');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

var sampleDataSource = new dataProvider("First Signal");
sampleDataSource.generateData();

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.
    db.close();
  }
});