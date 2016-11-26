class mockDataProvider {
    constructor(_name){
        this.name = _name;
    }
    generateData() {
        return setInterval(function(){console.log(this.name + ": " + Math.floor((Math.random() * 100) + 1))}.bind(this), 500);
    }
}

var sampleDataSource = new mockDataProvider("First Signal");
var anotherSampleDataSource = new mockDataProvider("Second Signal");

sampleDataSource.generateData();
anotherSampleDataSource.generateData();
