'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

module.exports = {
    read: function databaseRead(dataLabel, readerCallback) {
       MongoClient.connect(url, function (err, db) {
            if (err) {
                logger('Unable to connect to the mongoDB server. Error:' + err);
            } else {
                logger('Connection established to ' + url);
                var collection = db.collection('SensorData');
                collection.find({ name: dataLabel }).toArray(function (err, result) {
                    if (err) {
                        logger(err);
                    } else if (result.length) {
                        logger("Passing data to server")
                        readerCallback(result);
                    } else {
                        logger('No such element: ' + dataLabel);
                    }
                    return result;
                });
                db.close();
            }
        });
    }
}

var logger = function (msg) {
    console.log("[DBreader] " + new Date().toLocaleString() + ": " + msg);
};
