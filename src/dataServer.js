var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbWriter = require('./databaseWriter');
var dbReader = require('./databaseReader');

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dataPresenter.html');
  logger("WebPage was requested by a browser /get")
});

io.on('connection', function (socket) {
  logger("Client connected");
  socket.on('dataReady', function (data) {
    logger("Data from provider received");
    dbWriter.create(data);
    logger("Data stored in database.");
    socket.emit('dataWritten'); //Ack for dataProvider. 
  });

  socket.on('getData', function (dataLabel) {
    logger("Reading data from mongo database");
    var dataFromDB = dbReader.read(dataLabel, function (result) {
      if (result !== undefined) {
        logger("Data on server: ");
        result.forEach(function(element) {
          console.log(element.name+ " "+element.timestamp + " " + element.value);
        }, this); 
      }
      else {
        socket.emit('noData');
      }
    });
  });
});

http.listen(1337, function () {
  logger('Listening on localhost:1337');
});

var logger = function (msg) {
  console.log("[Server] " + new Date().toLocaleString() + ": " + msg);
};
