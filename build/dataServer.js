'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongodb = require('mongodb');
var dataProvider = require('./dataProvider');
var EventEmitter = require('events');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/jsPlotterDataStorage';

var sampleDataSource = new dataProvider("First Signal");
sampleDataSource.generateData(); //start generating data 
var onlineCollectedData = [];

var DataEmitter = function (_EventEmitter) {
  _inherits(DataEmitter, _EventEmitter);

  function DataEmitter() {
    _classCallCheck(this, DataEmitter);

    return _possibleConstructorReturn(this, (DataEmitter.__proto__ || Object.getPrototypeOf(DataEmitter)).apply(this, arguments));
  }

  return DataEmitter;
}(EventEmitter);

var dataEmitter = new DataEmitter();
dataEmitter.on('dataCollected', function () {
  insertToDatabase(); //write to database 
});

setInterval(function () {
  onlineCollectedData = sampleDataSource.getCurrentData(); //collect data
  dataEmitter.emit('dataCollected');
  sampleDataSource.ereaseCurrentData();
}, 2000);

function insertToDatabase() {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('SensorData');

      if (onlineCollectedData.length !== 0) {
        onlineCollectedData.forEach(function (dataElem) {
          collection.insert(dataElem, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log('Inserted %s ', dataElem);
            }
          });
        });
      }

      db.close();
      onlineCollectedData = []; //erease data from local collection
    }
  });
};