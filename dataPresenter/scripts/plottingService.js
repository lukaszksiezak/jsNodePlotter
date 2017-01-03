var app = angular.module('PlottingApp', ['nvd3']);

app.factory('PlotService', ['$rootScope', function ($rootScope) {
  
  var socket = io();
  var plotService = {};

    plotService.signalFactory = function () {
        var signalsArray = [];
        signalsArray.push(
            {
                "key": 'FirstSignal',
                "values": []
            });
        return signalsArray;
    };

    plotService.introduceYourself = function(){
        socket.emit('Intro_DataPresenter');
    }

    plotService.requestData = function(dataLabel){
        socket.emit('getData',dataLabel);      
    }
    
    plotService.requestDataQueryTimestamp = function(dataLabel, timestamp){
        socket.emit('getDataQueryTimestamp',dataLabel,timestamp);
    }

    socket.on('NewSignal', function(signalName){
        $rootScope.$broadcast('NewSignalForPlot', signalName.shift());
    });

    socket.on('DataForPlot', function(dataRaw){
        $rootScope.$broadcast('PlotPointReady', dataRaw);
    });

    plotService.introduceYourself();
    return plotService;
}]); //end of plotService

app.controller('PlotController', ['$rootScope', '$scope', 'PlotService', function ($rootScope, $scope, PlotService) {

    $scope.plotData = [];

    $rootScope.$on('NewSignalForPlot', function(event, signalName){
        $scope.plotData.push( 
                    {
                        "key": signalName,
                        "values": []
                    });
    });   

    $scope.chartSettings = {
        chart: {
            type: 'lineWithFocusChart',
            height: 600,
            margin: {
                top: 40,
                right: 40,
                bottom: 40,
                left: 60
            },
            legendPosition: 'right',
            duration: 0,
            useInteractiveGuideline: true,
            xAxis: {
                tickFormat: function (d) {
                    return d3.time.format('%H:%M:%S.%L')(new Date(d));
                },
                axisLabel: 'Time',
                showMaxMin: true
            },
            x2Axis: {
                tickFormat: function (d) {
                    return '';
                },
                showMinMax: false,
                tickValues: []
            },
            yAxis: {
                showMaxMin: true,
                tickFormat: function (d) {
                    return d3.format(',.2f')(d);
                },
                axisLabelDistance: 1
            },
            y2Axis: {
                showMaxMin: false,
                tickFormat: function (d) {
                    return '';
                }
            },
            dispatch: {
                renderEnd: function (e) { void 0; },
                brush: function (scope, e) { void 0; },
            },
            lines: {
                dispatch: {
                    renderEnd: function (e) { void 0; }
                }
            },
        }
    };

    // $scope.requestData = function(){
    //     PlotService.requestData('FirstSignal');
    // }

    // $scope.requestDataQueryTimestamp = function(){
    //     PlotService.requestDataQueryTimestamp('FirstSignal', $scope.plotData[0].values[$scope.plotData[0].values.length-1].x); //as an argument passing the timestamp of the last sample on plot.
    // }

    $rootScope.$on('PlotPointReady', function(event,pointData){
        console.log("data was collected: " + pointData.name + " " + pointData.timestamp + " " + pointData.value);        
        var key = lookup(pointData.name);
        if(key!==null){
            $scope.$applyAsync(function(){            
                $scope.plotData[key].values.push({
                    "x" : pointData.timestamp,
                    "y" : pointData.value
                });
            })
        }
    })

    var lookup = function(name){
        var idx = null;
        for(var i=0;i<$scope.plotData.length;i++){
            if($scope.plotData[i].key===name.shift()){
                idx = i;
                break;
                }            
        }
        return idx;
    }
    
}]); //end of plotController