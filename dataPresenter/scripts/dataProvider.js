"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Class for generating sample ('random') data which simulates a real data coming from some sensor 
*/
var http = require('http');

console.log("Mock data provider working on port 777");
http.createServer(onRequestData).listen(777);

var data = [];

var dataProvider = function () {
    function dataProvider(_name) {
        _classCallCheck(this, dataProvider);

        this.name = _name;
    }

    _createClass(dataProvider, [{
        key: "generateData",
        value: function generateData(sampleInterval) {
            //Mock data source is generating a signal each second. 
            setInterval(function () {
                data.push({
                    name: this.name,
                    timestamp: Date.now(),
                    value: Math.floor(Math.random() * 100 + 1)
                });
            }.bind(this), sampleInterval);
        }
    }, {
        key: "getCurrentData",
        value: function getCurrentData() {
            return data;
        }
    }, {
        key: "ereaseCurrentData",
        value: function ereaseCurrentData() {
            data = [];
        }
    }]);

    return dataProvider;
}();

;

var sampleDataSource = new dataProvider("First Signal");
sampleDataSource.generateData(1000); //start generating data with sampling interval 1000

function onRequestData(req, res) {
    var buffer = new Buffer(sampleDataSource.getCurrentData()); //buffer needed to send via http request
    res.write(buffer); //sent currently collected data from data source
    sampleDataSource.ereaseCurrentData(); //erese local data storage.
    console.log("Data sent on request");
};