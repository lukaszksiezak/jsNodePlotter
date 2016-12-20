var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbWriter = require('./databaseWriter');
var dbReader = require('./databaseReader');

io.on('connection', function(socket){
  logger("DataProvider connected");

  socket.on('dataReady', function (data) {
    logger("Data from provider received");
    dbWriter.create(data);
    logger("Data stored in database.");
    socket.emit('dataWritten'); //Ack for dataProvider. 
  });

  socket.on('getData',function(dataLabel){
    logger("Reading data from mongo database");
    var dataFromDB = dbReader.read(dataLabel);
    if(dataFromDB!==undefined){
      socket.emit('dataReady',dataFromDB);
    }
    else{
      socket.emit('noData');
    }
  });
});

http.listen(1337, function(){
  logger('Listening on localhost:1337');
});

var logger = function(msg){
  console.log(new Date().toLocaleString() + ": " + msg);
};
