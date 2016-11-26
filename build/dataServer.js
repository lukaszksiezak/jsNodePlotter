'use strict';

var mongodb = require('mongodb');
var dataProvider = require('./dataProvider');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

var sampleDataSource = new dataProvider("First Signal");
sampleDataSource.generateData(); //start generating data 
var onlineCollectedData = [];

setInterval(function () {
    onlineCollectedData.push(sampleDataSource.getCurrentData()); //collect data
    console.log(onlineCollectedData);
    sampleDataSource.ereaseCurrentData();
}, 1000);

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);

        var collection = db.collection('SensorData');

        db.close();
    }
});