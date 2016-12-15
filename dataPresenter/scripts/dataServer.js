'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var onlineCollectedData = [];;l;

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

onlineCollectedData = sampleDataSource.getCurrentData(); //online data needs to be mapped to antoher array
dataEmitter.emit('dataCollected');
sampleDataSource.ereaseCurrentData();