'use strict';

var mongodb = require('mongodb');
var dataProvider = require('./dataProvider');
const EventEmitter = require('events');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

var sampleDataSource = new dataProvider("First Signal");
sampleDataSource.generateData();  //start generating data 
var onlineCollectedData = [];


class DataEmitter extends EventEmitter {}

const dataEmitter = new DataEmitter();
dataEmitter.on('dataCollected', () => {
  insertToDatabase(); //write to database 
});

setInterval(function(){
    onlineCollectedData = sampleDataSource.getCurrentData(); //collect data
    dataEmitter.emit('dataCollected');
    sampleDataSource.ereaseCurrentData();
    },2000);

function insertToDatabase(){
    MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('SensorData');
      
      if(onlineCollectedData.length !== 0){
        onlineCollectedData.forEach(function(dataElem){
            collection.insert(dataElem, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log('Inserted %s ', dataElem);
            }
          });
        });
      }

      db.close();
      onlineCollectedData = []; //erease data from local collection
    }
  })  
};