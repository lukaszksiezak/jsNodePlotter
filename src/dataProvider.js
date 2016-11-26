/*
Class for generating sample ('random') data which simulates a real data coming from some sensor 
*/
class mockDataProvider {
    constructor(_name){
        this.name = _name;
    }
    generateData() {
        return setInterval(function(){
            var data = {
                name: this.name,
                timestamp: Date.now(),
                value: Math.floor((Math.random() * 100) + 1)
            };
            console.log(data)}.bind(this), 500);
    }
}

var sampleDataSource = new mockDataProvider("First Signal");
sampleDataSource.generateData();

