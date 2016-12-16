/*
*****It's an object for test purposes only. Not supposed to be used in real test scenario!*****
*
*
*Class for generating sample ('random') data which simulates a real data coming from some sensor 
*Once the process is started, the data are continously generated and written to data array. 
*A client can request a set of data by http request. The data are sent in a buffer and later, the 
*local data array is ereased.
*/
var http = require('http');

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

var sampleDataSource = new dataProvider("First Signal"); 
sampleDataSource.generateData(1000);  //start generating data with sampling interval 1000

