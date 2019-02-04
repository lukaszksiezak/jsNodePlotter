/*
*It's an object for test purposes only. Not supposed to be used in real test scenario!
*Class for generating sample ('random') data which simulates a real data coming from some sensor 
*Once the process is started, the data are continously generated and written to data array. 
*Data array is constantly . The data are sent in a buffer and later. Once the confirmation that data were collected from server is received the 
*local data array is ereased.
*/

var io = require('socket.io-client');

var data = [];

class dataProvider {
    constructor(_name) {
        this.name = _name;
    }
    generateData(sampleInterval) {    //Mock data source is generating a signal each second. 
        setInterval(function () {
            data.push({
                name: this.name,
                timestamp: Date.now(),
                value: Math.floor((Math.random() * 100) + 1)
            });
        }.bind(this), sampleInterval);
    }
    getCurrentData() {
        return data;
    }
    ereaseCurrentData() {
        data = [];
    }
};

var sendDataPackage = function (sendingInterval) {
    setInterval(function () {
        logger(new Date().toLocaleString() + ": Trying to send data to server");
        //var buffer = new ArrayBuffer(data);
        
        if (socket) {
           socket.emit('DataReady', data);          
        }
    }, sendingInterval);
}

var IntrouduceYourself = function(signalDetails){
    if(socket){
        socket.emit('IntroDataProvider', signalDetails);
    }
}

//Server connection part:
var socket = io.connect('http://data_server:1337');

socket.on('connect', function (socket) {
    logger('Connection with server established');
});

socket.on('DataWritten', function () {
    logger("Data received by server! Ereasing local collection");
    sampleDataSource.ereaseCurrentData();
});

//Act:

var signalDetails = {
    "signalName": process.argv[2],
    "signalDescription": process.argv[3]
}

IntrouduceYourself(signalDetails);
var sampleDataSource = new dataProvider(signalDetails.signalName);
sampleDataSource.generateData(100);  //start generating data with sampling interval 10ms
sendDataPackage(500);    //sending data with interval 0.5s


var logger = function (msg) {
  console.log("[Provider] " + new Date().toLocaleString() + ": " + msg);
};