var app = angular.module('PlottingApp', []);

app.directive('plotly', ['$window', function ($window) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            plotlyData: '=',
            plotlyLayout: '=',
            plotlyOptions: '='
        },
        link: function (scope, element) {
            var graph = element[0].children[0];
            var initialized = false;

            onUpdate();

            function onUpdate() {
                //No data yet, or clearing out old data
                if (!(scope.plotlyData)) {
                    if (initialized) {
                        Plotly.Plots.purge(graph);
                        graph.innerHTML = '';
                    }
                    return;
                }
                //If this is the first run with data, initialize
                if (!initialized) {
                    initialized = true;
                    Plotly.newPlot(graph, scope.plotlyData, scope.plotlyLayout, scope.plotlyOptions);
                }
                graph.layout = scope.plotlyLayout;
                graph.data = scope.plotlyData;
                Plotly.redraw(graph);
                Plotly.Plots.resize(graph);
            }

            function onResize() {
                if (!(initialized && scope.plotlyData)) return;
                Plotly.Plots.resize(graph);
            }

            scope.$watch(
                function () {
                    return scope.plotlyData;
                }
                , function (newValue, oldValue) {
                    if (angular.equals(newValue, oldValue)) return;
                    onUpdate();
                }, true);

            scope.$watch(
                function () {
                    return scope.plotlyLayout;
                }
                , function (newValue, oldValue) {
                    if (angular.equals(newValue, oldValue)) return;
                    onUpdate();
                }, true);

            scope.$watch(function () {
                return {
                    'h': element[0].offsetHeight,
                    'w': element[0].offsetWidth
                };
            }, function (newValue, oldValue) {
                if (angular.equals(newValue, oldValue)) return;
                onResize();
            }, true);

            angular.element($window).bind('resize', onResize);
        }
    };
}]);

app.factory('PlotService', ['$rootScope', function ($rootScope) {

    var plotService = {};

    return plotService;
}]); //end of plotService

app.controller('PlotController', ['$rootScope', '$scope', 'PlotService', function ($rootScope, $scope, PlotService) {

    var intervalA, intervalB, intervalC;

    $scope.StartPlots = function () {
        intervalA = setInterval(function () {
            $scope.$apply(function () {
                var val = Math.floor(Math.random() * 100 + 1);
                $scope.trace1.x.push(new Date());
                $scope.trace1.y.push(val);
            });
        }, 50);

        intervalB = setInterval(function () {
            $scope.$apply(function () {
                var val = Math.floor(Math.random() * 1000 + 1);
                $scope.trace2.x.push(new Date());
                $scope.trace2.y.push(val);
            });
        }, 50);

        intervalC = setInterval(function () {
            $scope.$apply(function () {
                var val = Math.floor(Math.random() * 10000 + 1);
                $scope.trace3.x.push(new Date());
                $scope.trace3.y.push(val);
            });
        }, 50);

    }
    $scope.StopPlots = function () {
        clearInterval(intervalA);
        clearInterval(intervalB);
        clearInterval(intervalC);
    }

    $scope.trace1 = {
        x: [],
        y: [],
        name: 'FirstSignal',
        type: 'scatter'
    };

    $scope.trace2 = {
        x: [],
        y: [],
        name: 'SecondSignal',
        yaxis: 'y2',
        type: 'scatter'
    };

    $scope.trace3 = {
        x: [],
        y: [],
        name: 'ThirdSignal',
        yaxis: 'y3',
        type: 'scatter'
    };

    $scope.data = [$scope.trace1, $scope.trace2, $scope.trace3];

    $scope.layout = {
        title: 'multiple y-axes example',
        xaxis: { domain: [0.1, 0.85] },
        yaxis: {
            title: 'FirstSignal',
            titlefont: { color: '#1f77b4' },
            tickfont: { color: '#1f77b4' }
        },
        yaxis2: {
            title: 'SecondSignal',
            titlefont: { color: '#ff7f0e' },
            tickfont: { color: '#ff7f0e' },
            anchor: 'free',
            overlaying: 'y',
            side: 'left',
            position: 0.05
        },
        yaxis3: {
            title: 'ThirdSignal',
            titlefont: { color: '#2CA02C' },
            tickfont: { color: '#2CA02C' },
            anchor: 'x',
            overlaying: 'y',
            side: 'right'
        }
    };

    $scope.options = {
        showLink: false,
        displaylogo: false,
        displayModeBar: true,
        scrollZoom: true
    };
}]); //end of plotController