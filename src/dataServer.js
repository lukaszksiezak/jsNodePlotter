'use strict';

var http = require('http');
var nowjs = require('now');


var onlineCollectedData = [];

class DataEmitter extends EventEmitter {}



// const dataEmitter = new DataEmitter();

// dataEmitter.on('dataCollected', () => {
//   insertToDatabase(); //write to database 
// });

//     onlineCollectedData = sampleDataSource.getCurrentData(); //online data needs to be mapped to antoher array
//     dataEmitter.emit('dataCollected');
//     sampleDataSource.ereaseCurrentData();

