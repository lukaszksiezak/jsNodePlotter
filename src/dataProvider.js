/*
Class for generating sample ('random') data which simulates a real data coming from some sensor 
*/
module.exports = class dataProvider {
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
    };

