(function() {
    'use strict';

    angular.module("api.services")
        .factory("UserManager", [
            '$http',
            '$httpParamSerializer',
            'BASE_URL',
            '$localStorage',
            UserManager
        ]);

    function UserManager($http, $httpParamSerializer, BASE_URL, $localStorage) {
        var currentUser = {};
        return {
            login: function(username, password, successCallback, errorCallback) {
                $http({
                        method: 'POST',
                        url: BASE_URL + '/authenticate',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $httpParamSerializer({
                            "username": username,
                            "password": password
                        })
                    })
                    .then(
                      function(response){
                        if(response.data.success) {
                          $localStorage.token = response.data.token;
                          $localStorage.name = currentUser.name = response.data.name;
                          successCallback(currentUser);
                        } else {
                          errorCallback(response);
                        }
                    });
            },
            init: function(){
              if($localStorage.token && angular.equals({}, currentUser)) {
                currentUser = {
                  name: $localStorage.name
                }
              }
            },
            setCurrentUser: function(user) {
              currentUser = user;
            },
            getCurrentUser: function() {
                return currentUser;
            },
            getToken: function(){
              return $localStorage.token;
            },
            isAuthenticated: function() {
                return $localStorage.token != null;
            },
            logout: function() {
              delete $localStorage.token;
              delete $localStorage.name;
              currentUser = {};
            }
        };
    }

})();
