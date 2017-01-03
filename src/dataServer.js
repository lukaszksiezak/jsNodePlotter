/*
Server is the main part of the application. It controls data storage (read/write) operations in database, is a controller for dataproviders and serves a presenter application.
A provider has to connect - introduce himself (Intro_DataProvider) and then can simply send data ('dataReady') with data package.
A presenter connects - introduces himself (Intro_DataPresenter) and listen to 'DataForPlot' event with latest data package.
Additionally, the server can push all the data from database to presenter ('getData') and send a specified package of data ('getDataQueryTimestamp'). 
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

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dataPresenter.html');
  logger("WebPage was requested by a browser /get")
});

io.on('connection', function (socket) {
  logger("Client connected");
  
  socket.on('Intro_DataProvider', function(signalName) {
    logger("Provider present!");
    //providerSocket.push(socket);
    signalsList.push(signalName); //add a new signal to the main array.

    if(presenterSocket){
      presenterSocket.emit('NewSignal', signalName); //if a new provider connects - emit the notification to presenter;
    }
  });

  socket.on('Intro_DataPresenter', function() {
    logger("Presenter present!")
    presenterSocket = socket; 
  });
  socket.on('dataReady', function (data) {
    logger("Data from provider received");
    dbWriter.create(data);
    logger("Data stored in database.");
    socket.emit('dataWritten'); //Ack for dataProvider.   
    
    if(presenterSocket !== undefined){  //send data only if presenter exists!
      pushDataToPresenter(presenterSocket, data); //Should be broadcast to all connected presenters
    }

    logger("Data pushed to presenter"); 
  });

  socket.on('getData', function (dataLabel) {
    logger("Reading data from mongo database");
    dbReader.readAllData(dataLabel, function (result) {
      if (result !== undefined) {  
         result.forEach(function(element) {        
            socket.emit('DataForPlot', element);
         }, this); 
      }
      else {
        socket.emit('noData');
      }
    });
   });

   socket.on('getDataQueryTimestamp', function(dataLabel,queryTimestamp){
     dbReader.queryByDate(dataLabel,queryTimestamp,function(result){
       if(result !== undefined){
         result.forEach(function(element) {        
            socket.emit('DataForPlot', element);
         }, this); 
       }
       else{
         socket.emit('noData');
       }
     });
   });
});

var pushDataToPresenter = function(socket,data){
  data.forEach(function(element) {        
            socket.emit('DataForPlot', element);
         }, this); 
}

http.listen(1337, function () {
  logger('Listening on localhost:1337');
});

var logger = function (msg) {
  console.log("[Server] " + new Date().toLocaleString() + ": " + msg);
};
