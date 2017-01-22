'use strict';

/*
Server is the main part of the application. It controls data storage (read/write) operations in database, is a controller for dataproviders and serves a presenter application.
A provider has to connect - introduce himself (IntroDataProvider) and then can simply send data ('DataReady') with data package.
A presenter connects - introduces himself (IntroDataPresenter) and listen to 'DataForPlot' event with latest data package.
Additionally, the server can push all the data from database to presenter ('GetData') and send a specified package of data ('GetDataQueryTimestamp'). 
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbWriter = require('./databaseWriter');
var dbReader = require('./databaseReader');

//var providerSocket = []; //an array storing information about all connected providers.
var presenterSocket; //should be array

var signalsList = []; //Array which stores the signals which are coming from different providers.
var signalsDescriptions = [];

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dataPresenter.html');
  logger("WebPage was requested by a browser /get");
});

io.on('connection', function (socket) {
  logger("Client connected");

  socket.on('IntroDataProvider', function (signalDetails) {
    logger("Provider present!");
    //providerSocket.push(socket);
    signalsList.push(signalDetails); //add a new signal to the main array.

    if (presenterSocket) {
      presenterSocket.emit('NewSignal', signalDetails); //if a new provider connects - emit the notification to presenter;
    }
  });

  socket.on('IntroDataPresenter', function () {
    logger("Presenter present!");
    presenterSocket = socket;

    if (signalsList.length > 0) {
      socket.emit('SignalsBeingListened', signalsList);
      logger("Signals being listened pushed to presenter");
    }
  });
  socket.on('DataReady', function (data) {
    logger("Data from provider received");
    dbWriter.create(data);
    logger("Data stored in database.");
    socket.emit('DataWritten'); //Ack for dataProvider.   

    if (presenterSocket !== undefined) {
      //send data only if presenter exists!
      pushDataToPresenter(presenterSocket, data); //Should be broadcast to all connected presenters
    }
    logger("Data pushed to presenter");
  });

  socket.on('GetData', function (dataLabel) {
    logger("Reading data from mongo database");
    dbReader.readAllData(dataLabel, function (result) {
      if (result !== undefined) {
        result.forEach(function (element) {
          socket.emit('DataForPlot', element);
        }, this);
      } else {
        socket.emit('NoData');
      }
    });
  });

  socket.on('GetDataQueryTimestamp', function (dataLabel, queryTimestamp) {
    dbReader.queryByDate(dataLabel, queryTimestamp, function (result) {
      if (result !== undefined) {
        result.forEach(function (element) {
          socket.emit('DataForPlot', element);
        }, this);
      } else {
        socket.emit('NoData');
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