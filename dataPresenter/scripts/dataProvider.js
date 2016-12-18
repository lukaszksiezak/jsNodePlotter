'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
*****It's an object for test purposes only. Not supposed to be used in real test scenario!*****
*
*
*Class for generating sample ('random') data which simulates a real data coming from some sensor 
*Once the process is started, the data are continously generated and written to data array. 
*Data array is constantly . The data are sent in a buffer and later, the 
*local data array is ereased.
*/

var io = require('socket.io-client');

var data = [];

var dataProvider = function () {
    function dataProvider(_name) {
        _classCallCheck(this, dataProvider);

        this.name = _name;
    }

    _createClass(dataProvider, [{
        key: 'generateData',
        value: function generateData(sampleInterval) {
            //Mock data source is generating a signal each second. 
            setInterval(function () {
                data.push({
                    name: this.name,
                    timestamp: Date.now(),
                    value: Math.floor(Math.random() * 100 + 1)
                });
                pushDataToServer(data);
            }.bind(this), sampleInterval);
        }
    }, {
        key: 'getCurrentData',
        value: function getCurrentData() {
            return data;
        }
    }, {
        key: 'ereaseCurrentData',
        value: function ereaseCurrentData() {
            data = [];
        }
    }]);

    return dataProvider;
}();

;

var sampleDataSource = new dataProvider("First Signal");
sampleDataSource.generateData(1000); //start generating data with sampling interval 1000

//Server connection part:
var socket = io.connect('http://127.0.0.1:1337');
console.log("Connection established with localhost on port 1337");

socket.on('connect', function (socket) {
    console.log('Connection with server established');
});

var pushDataToServer = function pushDataToServer(data) {

    console.log(new Date().toLocaleString() + ": Trying to send data to server");
    var buffer = new Buffer(data);

    if (socket) {
        socket.emit('dataReady', buffer);
    }
};

socket.on('dataWritten', function () {
    console.log("Data received by server! Ereasing local collection");
    sampleDataSource.ereaseCurrentData();
});