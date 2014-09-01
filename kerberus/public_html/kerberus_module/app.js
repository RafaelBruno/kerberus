var kerberus = angular.module("kerberus-module", ["ngCookies"]);

kerberus.factory('Kerberus', ['$cookieStore',
    function($resource, $cookieStore) {

        return{
            setSessionListValue: function(list) {
                for (var i = 0; i < list.length; i++) {

                }
            },
            setSessionValue: function(name, value) {
                $cookieStore.put(name, value);
            },
            setUserNameSession: function(userName) {
                $cookieStore.put("userName", userName);
            },
            setUserUserLogin: function(userLogin) {
                $cookieStore.put("userLogin", userLogin);
            },
            setUserPassLogin: function(userLogin) {
                $cookieStore.put("userPass", userLogin);
            },
            setKerberusUser: function(user) {
                $cookieStore.put("kerberusUser", user);
            }
        };

    }
]);

/*
 kerberus.directive('mobiTitle', function() {
 return {
 scope: true,
 restrict: 'E',
 replace: true,
 transclude: true,
 link: function(scope, e, a, ctrl, transclude) {
 transclude(scope.$parent, function(clone, scope) {
 $(e).append(clone);
 });
 },
 templateUrl: "mobi/directives/templates/mobiTitleTemplate.html"
 };
 });
 */


function KerberusUser() {
    var permissions = [];
    var user = [];
    var pass = [];
    var clazz = {
        addPermission: function(module, type) {
            permissions.push(
                    {
                        module: module,
                        type: type

                    });
        },
        getPermissions: function() {
            return permissions;
        },
        setUser: function(value) {
            user = value;
        },
        getUser: function() {
            return user;
        },
        setPass: function(value) {
            pass = value;
        },
        getPass: function() {
            return pass;
        }
    };
    return clazz;
}






