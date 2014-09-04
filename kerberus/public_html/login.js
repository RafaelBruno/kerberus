var demo = angular.module('login', ["kerberus-module", "ngRoute", "ngResource"]);


demo.controller("demoCtrl", ["$scope", "$http", "$kerberus", function($scope, $http, $kerberus) {
        console.log("DemoCtrl Kerberus.io");
        $kerberus.clear();
        
        $scope.logar = function() {
            if ($scope.user == "root" && $scope.pass === "root") {
                $http({method: 'GET', url: 'demo/authentication.json'}).
                        success(function(data) {
                            var user = new KerberusUser().setPermission(data.user.permissions)
                                    .setUser(data.user.login)
                                    .setPass(data.user.password)
                                    .build();
                            $kerberus.setKerberusUser(user).redirect("demo/pages/workspace.html");
                        }).
                        error(function(data) {
                        });
            } else {
                alert("Usuario ou Senha incorretos");
            }
        };

    }]);

