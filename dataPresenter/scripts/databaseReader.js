'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

module.exports = {
    read: function databaseRead(dataLabel) {
        var dataFromDB = MongoClient.connect(url, function (err, db) {
            var dataRaw;
            if (err) {
                logger('Unable to connect to the mongoDB server. Error:' + err);
            } else {
                logger('Connection established to ' + url);
                var collection = db.collection('SensorData');
                dataRaw = collection.find({ name: dataLabel }).toArray(function (err, result) {
                    if (err) {
                        logger(err);
                    } else if (result.length) {
                        logger('Found:' + result);
                    } else {
                        logger('No such element: ' + dataLabel);
                    }
                    return result;
                });
                db.close();
            }
            return dataRaw;
        });
        return dataFromDB;
    }
};

var logger = function logger(msg) {
    console.log(new Date().toLocaleString() + ": " + msg);
};