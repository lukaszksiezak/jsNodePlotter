'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

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
  });  
};