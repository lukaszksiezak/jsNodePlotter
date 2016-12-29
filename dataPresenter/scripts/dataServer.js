'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbWriter = require('./databaseWriter');
var dbReader = require('./databaseReader');

var providerSocket; //should be array
var presenterSocket; //should be array

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dataPresenter.html');
  logger("WebPage was requested by a browser /get");
});

io.on('connection', function (socket) {
  logger("Client connected");

  socket.on('Intro_DataProvider', function () {
    logger("Provider present!");
    providerSocket = socket;
  });

  socket.on('Intro_DataPresenter', function () {
    logger("Presenter present!");
    presenterSocket = socket;
  });
  socket.on('dataReady', function (data) {
    logger("Data from provider received");
    dbWriter.create(data);
    logger("Data stored in database.");
    socket.emit('dataWritten'); //Ack for dataProvider.   

    if (presenterSocket !== undefined) {
      //send data only if presenter exists!
      pushDataToPresenter(presenterSocket, data); //Should be broadcast to all connected presenters
    }

    logger("Data pushed to presenter");
  });

  socket.on('getData', function (dataLabel) {
    logger("Reading data from mongo database");
    dbReader.readAllData(dataLabel, function (result) {
      if (result !== undefined) {
        result.forEach(function (element) {
          socket.emit('DataForPlot', element);
        }, this);
      } else {
        socket.emit('noData');
      }
    });
  });

  socket.on('getDataQueryTimestamp', function (dataLabel, queryTimestamp) {
    dbReader.queryByDate(dataLabel, queryTimestamp, function (result) {
      if (result !== undefined) {
        result.forEach(function (element) {
          socket.emit('DataForPlot', element);
        }, this);
      } else {
        socket.emit('noData');
      }
    });
  });
});

var pushDataToPresenter = function pushDataToPresenter(socket, data) {
  data.forEach(function (element) {
    socket.emit('DataForPlot', element);
  }, this);
};

http.listen(1337, function () {
  logger('Listening on localhost:1337');
});

var logger = function logger(msg) {
  console.log("[Server] " + new Date().toLocaleString() + ": " + msg);
};