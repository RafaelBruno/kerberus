var demo = angular.module('demo', ["kerberus-module"]);


demo.controller("demoCtrl", ["$scope", "$http", "Kerberus", function($scope, $http, Kerberus) {
        console.log("DemoCtrl Kerberus.io");


        $scope.logar = function() {
            if ($scope.user == "root" && $scope.pass === "root") {
                $http({method: 'GET', url: 'demo/authentication.json'}).
                        success(function(data) {
                            var user = new KerberusUser();
                        }).
                        error(function(data) {
                        });
            } else {
                alert("Usuario ou Senha incorretos");
            }
        };

    }]);

