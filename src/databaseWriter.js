'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

module.exports = {
  create: function insertToDatabase(data) {
    MongoClient.connect(url, function (err, db) {
      if (err) {
        logger('Unable to connect to the mongoDB server. Error:', err);
      } else {
        logger('Connection established to', url);

        var collection = db.collection('SensorData');

        if (data.length !== 0) {
          data.forEach(function (dataElem) {
            collection.insert(dataElem, function (err, result) {
              if (err) {
                logger(err);
              } else {
                logger('Inserted new data');
              }
            });
          });
        }
        db.close();
      }
    });
  }
}

var logger = function (msg) {
  console.log("[DBwriter] " + new Date().toLocaleString() + ": " + msg);
};
