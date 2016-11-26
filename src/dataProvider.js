/*
Class for generating sample ('random') data which simulates a real data coming from some sensor 
*/
var data = [];

module.exports = class dataProvider {
    constructor(_name){
        this.name = _name;
    }
    generateData() {
         setInterval(function(){
            data.push({
                name: this.name,
                timestamp: Date.now(),
                value: Math.floor((Math.random() * 100) + 1)
                });
            }.bind(this), 500);
        }
    getCurrentData() {
        return data;
        }
    ereaseCurrentData(){
        data = [];
        }
    };

