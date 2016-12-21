var app = angular.module('PlottingApp', ['nvd3']);

app.factory('PlotService', ['$rootScope', function ($rootScope) {

    var plotService = {};

    plotService.signalFactory = function () {
        var signalsArray = [];

        signalsArray.push(
            {
                "key": 'FirstSignal',
                "values": []
            });

        signalsArray.push(
            {
                "key": 'SecondSignal',
                "values": []
            });
        signalsArray.push(
            {
                "key": 'ThirdSignal',
                "values": []
            });
        return signalsArray;
    };

    return plotService;
}]); //end of plotService

app.controller('PlotController', ['$rootScope', '$scope', 'PlotService', '$interval', function ($rootScope, $scope, PlotService, $interval) {

    var intervalA, intervalB, intervalC;

    //Mockup data to check plotting functionality. Can be used as a reference of live data plotting 
    $scope.plotData = PlotService.signalFactory();
    var plotDataStorage = PlotService.signalFactory();

    var applyToScope = function (data, index) {
        if ($scope.timeWindow !== undefined && $scope.timeWindow > 0) {
            applyTimeWindow();
        }
        $scope.plotData[index].values.push(data);
    };

    var applyTimeWindow = function () {
        for (var i = 0; i < $scope.plotData.length; i++) {
            if ($scope.timeWindow !== undefined && $scope.plotData[i].values !== undefined && $scope.plotData[i].values.length > 0) {
                var lastSample = $scope.plotData[i].values[$scope.plotData[i].values.length - 1].x;
                var firstSample = $scope.plotData[i].values[0].x;
                if ((lastSample - firstSample) > $scope.timeWindow) {
                    var toErease = $scope.plotData[i].values.shift();
                    plotDataStorage[i].values.push(toErease);
                }
            }
        }
    };

    var pushToPlotAllData = function () {
        //copy rest of the data to global storage:
        for (var i = 0; i < $scope.plotData.length; i++) {
            plotDataStorage[i].values = plotDataStorage[i].values.concat($scope.plotData[i].values);
            $scope.plotData[i].values = plotDataStorage[i].values.slice();
        }
    }

    $scope.StartPlots = function () {
        var dataToPlot = {};
        intervalA = $interval(function () {
            var val = Math.floor(Math.random() * 100 + 1);
            dataToPlot =
                {
                    "x": Date.now(),
                    "y": val
                }
            applyToScope(dataToPlot, 0);
        }, 50);

        intervalB = $interval(function () {
            var val = Math.floor(Math.random() * 100 + 1);
            dataToPlot =
                {
                    "x": Date.now(),
                    "y": val
                }
            applyToScope(dataToPlot, 1);
        }, 50);

        intervalC = $interval(function () {
            var val = Math.floor(Math.random() * 100 + 1);
            dataToPlot =
                {
                    "x": Date.now(),
                    "y": val
                }
            applyToScope(dataToPlot, 2);
        }, 50);
    }

    $scope.StopPlots = function () {
        $interval.cancel(intervalA);
        $interval.cancel(intervalB);
        $interval.cancel(intervalC);
        pushToPlotAllData();
    }

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
            yAxis1: {
                showMaxMin: true,
                tickFormat: function (d) {
                    return d3.format(',.2f')(d);
                },
                axisLabelDistance: 1
            },
            yAxis2: {
                showMaxMin: true,
                tickFormat: function (d) {
                    return d3.format(',.2f')(d);
                },
                axisLabelDistance: 2
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
}]); //end of plotController

