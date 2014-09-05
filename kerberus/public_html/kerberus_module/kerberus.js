var kerberus = angular.module("kerberus-module", ['ngCookies', 'ngResource']);

kerberus.service('kerberusService', function() {
    this.funcList = [];
});

kerberus.provider("ngKerberus", function() {
    var funcList;
    return{
        onLoad: function() {
            var args = arguments;
            funcList = args;
        },
        $get: function() {
            return {
                func: funcList
            };
        }
    };
});

kerberus.factory('$kerberus', ['$resource', '$cookieStore', "$http", "kerberusService", "ngKerberus",
    function($resource, $cookieStore, $http, kerberusService, ngKerberus) {

        $http({method: 'GET', url: '/kerberus/kerberus_module/config.json'}).
                then(function(data) {
                    $cookieStore.put("kerberusConfig", data);
                });


        return{
            /*Validate Module*/
            module: function(module) {
                if (!this.validateModule(module)) {
                    this.redirect(this.getConfig().accessDenied);
                }
            },
            access: function() {
                return this.validateModule(module);
            },
            validateModule: function(module) {
                this.init(kerberusService.funcList);
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
                    this.deleteThisCookie("permission");
                    this.setSessionValue("permission", thisPermission);

                } else {
                    //console.log("Não pode acessar")
                }
                return isPermission;
            },
            validateTypeAccess: function(type) {
                this.init(this.getSessionValue("onLoad"));
                var userKerberus = this.getSessionValue("permission");
                if (userKerberus.type instanceof Array) {
                    var valid = false;
                    for (var i = 0; i < userKerberus.type.length; i++) {
                        if (userKerberus.type[i] === type) {
                            valid = true;
                        }
                    }
                    return valid;
                } else {
                    return "invalid: Object is not a Array";
                    console.log("invalid: Object is not a Array");
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
            setUser: function(userName) {
                this.deleteThisCookie(userName);
                $cookieStore.put("user", userName);
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
            getConfig: function() {
                return $cookieStore.get("kerberusConfig").data;
            },
            getKerberusUser: function() {
                return $cookieStore.get('kerberusUser');
            },
            getSessionValue: function(value) {
                return $cookieStore.get(value);
            },
            deletarCookies: function() {
                this.deleteThisCookie("userName");
                this.deleteThisCookie("userLogin");
                this.deleteThisCookie("userPass");
                this.deleteThisCookie("kerberusUser");
                this.deleteThisCookie("user");
            },
            deleteThisCookie: function(c_name) {
                document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
            },
            redirect: function(url) {
                window.location.replace(url);
            },
            /*INIT*/
            init: function(args) {
                if (typeof args[0] !== "undefined") {
                    for (var i = 0; i < args.length; i++) {
                        if (typeof args[i] === "function") {
                            args[i]();
                        }
                    }
                }
            },
            onLoad: function(/**/) {
                var args = arguments;
                kerberusService.funcList = args;
            },
            valid: function() {
                return typeof this.getKerberusUser() !== "undefined";
            },
            invalid: function() {
                return typeof this.getKerberusUser() === "undefined";
            },
            clear: function() {
                this.deletarCookies();
            }
        };
    }
]);


kerberus.directive('readWrite', function($kerberus) {
    return {
        scope: true,
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
            if (!$kerberus.validateTypeAccess("rw")) {
                $(e).remove();
            }
            $kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusRW'></div>"
    };
});
kerberus.directive('readOnly', function($kerberus) {
    return {
        scope: true,
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
            if (!$kerberus.validateTypeAccess("ro")) {
                $(e).remove();
            }
            $kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusRO'></div>"
    };
});
kerberus.directive('admin', function($kerberus) {
    return {
        scope: true,
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
            if (!$kerberus.validateTypeAccess("ad")) {
                $(e).remove();
            }
            $kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusAD'></div>"
    };
});

kerberus.directive('developer', function($kerberus) {
    return {
        scope: true,
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
            if (!$kerberus.validateTypeAccess("dev")) {
                $(e).remove();
            }
            $kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusAD'></div>"
    };
});


kerberus.directive('accessType', function($kerberus) {
    return {
        scope: {
            access: '@'
        },
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
            if (!$kerberus.validateTypeAccess(a.access)) {
                $(e).remove();
            }
            $kerberus.deleteThisCookie("permission");
        },
        template: "<div class='kerberusAD'></div>"
    };
});


/*Module Directive*/

kerberus.directive('accessModule', function($kerberus) {
    return {
        scope: {
            module: '@'
        },
        restrict: 'E',
        replace: true,
        transclude: true,
        link: function(scope, e, a, ctrl, transclude) {
            transclude(scope.$parent, function(clone, scope) {
                $(e).append(clone);
            });
            if (!$kerberus.validateModule(a.module)) {
                $(e).remove();
            }
            $kerberus.deleteThisCookie("permission");

        },
        template: "<div class='kerberusModule'></div>"
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
