'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
// const dataEmitter = new DataEmitter();

// dataEmitter.on('dataCollected', () => {
//   insertToDatabase(); //write to database 
// });

//     onlineCollectedData = sampleDataSource.getCurrentData(); //online data needs to be mapped to antoher array
//     dataEmitter.emit('dataCollected');
//     sampleDataSource.ereaseCurrentData();