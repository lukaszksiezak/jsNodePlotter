var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  logger("DataProvider connected");

  socket.on('dataReady', function (data) {
    logger("Data from provider received");
    //TODO: Store data to mongo database.
    logger("Received data: " + receivedData);
    socket.emit('dataWritten'); //Ack for dataProvider. 
  });
});

http.listen(1337, function(){
  logger('Listening on localhost:1337');
});

var logger = function(msg){
  console.log(new Date().toLocaleString() + ": " + msg);
};
