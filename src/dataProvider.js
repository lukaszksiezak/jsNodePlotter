class mockDataProvider{

   generateData(){
       return Math.floor((Math.random()*100)+1);
    }
}
class dataSource {
    constructor(dataProvider, name){
        this.dataProvider = dataProvider;
        this.name = name;
    }
    getData(){
        let val = this.dataProvider.generateData();
        return val;
    }
}
class mockDataSource extends dataSource{
    runDataGeneration(){
        for(;;)
            setTimeout(console.log(super.getData()), 500);
    }
}
var sampleDataSource = new mockDataSource(new mockDataProvider(),"First Signal");
sampleDataSource.runDataGeneration();
