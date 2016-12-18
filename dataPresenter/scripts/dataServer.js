'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
  console.log("DataProvider connected");

  socket.on('dataReady', function (data) {
    console.log("Data from provider received");

    socket.emit('dataWritten');
  });
});

http.listen(1337, function () {
  console.log('listening on localhost:1337');
});

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// io.on('connection', function(socket){
//   socket.on('CH01', function (from, msg) {
//     console.log('MSG', from, ' saying ', msg);
//   });
// });

// http.listen(1337, function () {
//   console.log('listening on localhost:1337');
// });
// const dataEmitter = new DataEmitter();

// dataEmitter.on('dataCollected', () => {
//   insertToDatabase(); //write to database 
// });

//     onlineCollectedData = sampleDataSource.getCurrentData(); //online data needs to be mapped to antoher array
//     dataEmitter.emit('dataCollected');
//     sampleDataSource.ereaseCurrentData();