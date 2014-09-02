var demo = angular.module('demo', ["kerberus-module", "ngRoute", "ngResource"]);

demo.config(function($locationProvider, $routeProvider) {
    $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'homeCtrl',
                resolve: {
                    kerberusAuto: ["Kerberus", function(Kerberus) {
                            Kerberus.module("Home");
                        }]
                }
            })
            .otherwise({redirectTo: '/home'});
});

demo.controller("homeCtrl", ["$scope", "$http", "Kerberus", function($scope, $http, Kerberus) {
        console.log("Home Kerberus.io");

    }]);

