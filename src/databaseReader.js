
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

function databaseRead(){
    MongoClient.connect(url, function (err, db) {
        if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
        console.log('Connection established to', url);

        var collection = db.collection('SensorData');
        
        collection.find({name: 'First Signal'}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                } else {
                    console.log('No elements!');
                }
            });
        db.close();      
        }
    });
};

databaseRead();