"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mockDataProvider = function () {
    function mockDataProvider() {
        _classCallCheck(this, mockDataProvider);
    }

    _createClass(mockDataProvider, [{
        key: "generateData",
        value: function generateData() {
            return Math.floor(Math.random() * 100 + 1);
        }
    }]);

    return mockDataProvider;
}();

var dataSource = function () {
    function dataSource(dataProvider, name) {
        _classCallCheck(this, dataSource);

        this.dataProvider = dataProvider;
        this.name = name;
    }

    _createClass(dataSource, [{
        key: "getData",
        value: function getData() {
            var val = this.dataProvider.generateData();
            return val;
        }
    }]);

    return dataSource;
}();

var mockDataSource = function (_dataSource) {
    _inherits(mockDataSource, _dataSource);

    function mockDataSource() {
        _classCallCheck(this, mockDataSource);

        return _possibleConstructorReturn(this, (mockDataSource.__proto__ || Object.getPrototypeOf(mockDataSource)).apply(this, arguments));
    }

    _createClass(mockDataSource, [{
        key: "runDataGeneration",
        value: function runDataGeneration() {
            for (;;) {
                setTimeout(console.log(_get(mockDataSource.prototype.__proto__ || Object.getPrototypeOf(mockDataSource.prototype), "getData", this).call(this)), 500);
            }
        }
    }]);

    return mockDataSource;
}(dataSource);

var sampleDataSource = new mockDataSource(new mockDataProvider(), "First Signal");
sampleDataSource.runDataGeneration();