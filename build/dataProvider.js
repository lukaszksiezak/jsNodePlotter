"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mockDataProvider = function () {
    function mockDataProvider(_name) {
        _classCallCheck(this, mockDataProvider);

        this.name = _name;
    }

    _createClass(mockDataProvider, [{
        key: "generateData",
        value: function generateData() {
            return setInterval(function () {
                console.log(this.name + ": " + Math.floor(Math.random() * 100 + 1));
            }.bind(this), 500);
        }
    }]);

    return mockDataProvider;
}();

var sampleDataSource = new mockDataProvider("First Signal");
var anotherSampleDataSource = new mockDataProvider("Second Signal");

sampleDataSource.generateData();
anotherSampleDataSource.generateData();