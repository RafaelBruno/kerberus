var demo = angular.module('login', ["kerberus-module", "ngRoute", "ngResource"]);


demo.controller("demoCtrl", ["$scope", "$http", "$kerberus", function($scope, $http, $kerberus) {
        console.log("DemoCtrl Kerberus.io");
        $kerberus.clear();

        $scope.logar = function() {
            if ($scope.user === "root" && $scope.pass === "root") {

                var myPermissions = [{
                        "module": "Home",
                        "type": ["rw","imp"]
                    },
                    {
                        "module": "Cadastro",
                        "type": ["rw", "imp"]
                    }];
                
                $kerberus.setSessionValue("myName","Rafael Bruno");


                var user = new KerberusUser().setPermission(myPermissions)
                        .setUser($scope.user)
                        .setPass($scope.pass)
                        .build();
                $kerberus.setKerberusUser(user).redirect("demo/pages/workspace.html");
            } else {
                alert("Usuario ou Senha incorretos");
            }
        };

    }]);

