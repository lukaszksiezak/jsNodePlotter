# jsNodePlotter
NodeJS backend providing live data collected from a sensor (currently only mockup) and AngularJS app plotting these data. For this project, following technologies were used:
- Node.js as a server host. 
- socket.io for socket communication 
- mongoDB - database engine as data storage for sensors' data
- AngularJS - frontpage SPA to visualise data
- babel - JS ECMA2016 -> 2015 transpiler (for VS Code debugging)
- nvd3, plotly - ploting libraries 

##Getting started
The main aim of the project was to create wrappable and customizable live plotting module, which could be used as a part of bigger projects.

###Prerequisites
1. MongoDB - database engine must be installed on the dev/prod machine
2. VS Code - efficient tool not only for code editing but also convinient node.js debugger
3. node - to run application and access npm repo

###Environment preparation

Modify runMongo.bat according to Mongo's binaries location. Create empty 'data' directory. In command line start MongoDB.

Next operations:

    npm install
    npm run build    
    node dataPresenter/scripts/dataServer.js 
    
The server should start working. Go to browser and connect to localhost:1337 - AngularJS app should open. 
Run mock data provider:
    
    node dataPresenter/scripts/dataProvider.js InputName
    
DataProvider should establish communication with the server. Server receives data from provider - writes them to database and pushes to Angular app. Angular plotting app should automatically start plotting data. It is possible to run multiple dataProviders and they will be automatically detected by Angular app and added to plots. 

###Playground - plotly app proof of concept

For testing purposes plotly lib was included into presenter mockup. To see it in action:

    npm install -g http-server
    http-server dataPresenter
  
Connect to: localhost:8080/dataPresenterMulti.html
