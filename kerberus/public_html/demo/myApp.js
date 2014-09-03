var demo = angular.module('demo', ["kerberus-module", "ngRoute", "ngResource"]);

demo.config(function($locationProvider, $routeProvider) {
    $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'homeCtrl',
                resolve: {
                    init: ["$kerberus", function($kerberus) {
                            $kerberus.module("Home")
                        }]
                }
            })
              .when('/cadastros', {
                templateUrl: 'cadastros.html',
                controller: 'cadastrosCtrl',
                resolve: {
                    init: ["$kerberus", function($kerberus) {
                            $kerberus.module("Cadastro");
                        }]
                }
            })
            .when('/notCtrl', {
                templateUrl: "notController.html"
            })
             .when('/accessDenied', {
                templateUrl: "AccessDenied.html"
            })
            .otherwise({redirectTo: '/home'});
});

demo.controller("homeCtrl", ["$scope", "$http", "$kerberus", function($scope, $http, $kerberus) {
        console.log("Home Kerberus.io");

    }]);

demo.controller("cadastrosCtrl", ["$scope", "$http", "$kerberus", function($scope, $http, $kerberus) {
        console.log("Home Kerberus.io");

    }]);

