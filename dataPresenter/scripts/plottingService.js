var app = angular.module('PlottingApp', ['nvd3']);

app.factory('PlotService', ['$rootScope', function ($rootScope) {

var plotService = {};

return plotService;
}]); //end of plotService

app.controller('PlotController', ['$rootScope', '$scope', 'PlotService', function ($rootScope, $scope, PlotService) {

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

    //Mockup data to check plotting functionality. Can be used as a reference of live data plotting 
    $scope.plotData = [];

    $scope.plotData.push(
        {
            "key": 'FirstSignal',
            "values": []
        });


    setInterval(function () {
        $scope.$apply(function () {
                var val = Math.floor(Math.random() * 100 + 1);
                $scope.plotData[0].values.push(
                    {
                        "x": Date.now(),
                        "y": val
                    }
                );
            });        
        }, 100);
    
}]); //end of plotController