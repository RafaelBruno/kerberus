var kerberus = angular.module("kerberus-module", ['ngCookies', 'ngResource']);

kerberus.factory('Kerberus', ['$resource', '$cookieStore',
    function($resource, $cookieStore) {

        return{
            /*Validate Module*/
            module: function(module) {
                console.log("teste")
                var isPermission = false;
                var thisPermission = {};
                var kerberusUser = this.getKerberusUser();
                var userPermissions = kerberusUser.permissions;
                for (var i = 0; i < userPermissions.length; i++) {
                    if (userPermissions[i].module === module) {
                        isPermission = true;
                        thisPermission = userPermissions[i];
                    }
                }

                if (isPermission) {
                    this.setSessionValue("permission", thisPermission);
                } else {
                    console.log("Não pode acessar")
                }
            },
            validateTypeAccess: function() {
                this.deleteThisCookie("permission");
                var userKerberus = this.getSessionValue("permission");
                if (userKerberus.type === "rw") {
                    return "rw";
                } else if (userKerberus.type === "ro") {
                    return "ro";
                } else if (userKerberus.type === "ad") {
                    return "ad";
                } else {
                    return "invalid";
                }
            },
            /*ON LOGION*/
            setSessionListValue: function(list) {
                for (var i = 0; i < list.length; i++) {
                }
                return this;
            },
            setSessionValue: function(name, value) {
                this.deleteThisCookie(name);
                $cookieStore.put(name, value);
                return this;
            },
            setUserNameSession: function(userName) {
                this.deleteThisCookie(userName);
                $cookieStore.put("userName", userName);
                return this;
            },
            setUserUserLogin: function(userLogin) {
                this.deleteThisCookie(userLogin);
                $cookieStore.put("userLogin", userLogin);
                return this;
            },
            setUserPassLogin: function(passLogin) {
                this.deleteThisCookie(passLogin);
                $cookieStore.put("userPass", passLogin);
                return this;
            },
            setKerberusUser: function(user) {
                this.deleteThisCookie(user);
                $cookieStore.put("kerberusUser", user);
                return this;
            },
            getAllPermissions: function() {
                return [{
                        "module": "Modulo Cadastro",
                        "type": "rw"
                    }];
            },
            getKerberusUser: function() {
                return $cookieStore.get('kerberusUser');
            },
            getSessionValue: function(value) {
                return $cookieStore.get(value);
            },
            deletarCookies: function() {

            },
            deleteThisCookie: function(c_name) {
                document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
            },
            redirect: function(url) {
                window.location.replace(url);
            },
            start: function() {
                var kerberuStart = new KerberusStart();
            }
        };

    }
]);


kerberus.directive('readWrite', function(Kerberus) {
    return {
        scope: true,
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
            if(Kerberus.validateTypeAccess() !== "rw"){
                $(e).remove();
            }
            Kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusRW'></div>"
    };
});
kerberus.directive('readOnly', function(Kerberus) {
    return {
        scope: true,
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
             if(Kerberus.validateTypeAccess() !== "ro"){
                $(e).remove();
            }
            Kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusRO'></div>"
    };
});
kerberus.directive('admin', function(Kerberus) {
    return {
        scope: true,
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
             if(Kerberus.validateTypeAccess() !== "ad"){
                $(e).remove();
            }
            Kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusAD'></div>"
    };
});



function KerberusUser() {
    var permissions = [];
    var user = [];
    var pass = [];
    var clazz = {
        setPermission: function(module) {
            permissions = module;
            return this;
        },
        setUser: function(value) {
            user = value;
            return this;
        },
        setPass: function(value) {
            pass = value;
            return this;
        },
        build: function() {
            return new UserBuild(user, pass, permissions);
        }
    };
    return clazz;
}

function UserBuild(user, pass, permissions) {
    this.user = user;
    this.pass = pass;
    this.permissions = permissions;

}

function KerberusStart() {
    this.beforeLogin = function(callbackfunction) {
        callbackfunction();
        return this;
    };
    this.login = function(callbackfunction) {
        callbackfunction();
        return this;
    };
    this.afterLogin = function(callbackfunction) {
        callbackfunction();
        return this;
    };
    this.start = function() {
    }
}






