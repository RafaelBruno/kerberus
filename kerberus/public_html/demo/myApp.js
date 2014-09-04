var demo = angular.module('demo', ["kerberus-module", "ngRoute", "ngResource"]);

demo.run(["$kerberus", function($kerberus) {
        $kerberus.onLoad(function() {
            if($kerberus.invalid()){
                $kerberus.redirect("/kerberus/index.html");
            }
        });
    }]);

demo.config(function($locationProvider, $routeProvider) {

    $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'homeCtrl',
                resolve: {
                    init: ["$kerberus", function($kerberus) {
                            $kerberus.module("Home");
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
            .when('/graficos', {
                templateUrl: 'graficos.html',
                controller: 'graficosCtrl',
                resolve: {
                    init: ["$kerberus", function($kerberus) {
                            $kerberus.module("Graficos");
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
        console.log("Cadastro Kerberus.io");

    }]);

demo.controller("graficosCtrl", ["$scope", "$http", "$kerberus", function($scope, $http, $kerberus) {
        console.log("Graficos Kerberus.io");

    }]);

