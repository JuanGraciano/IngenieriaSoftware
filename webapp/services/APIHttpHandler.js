(function() {
    'use strict';
    angular.module("api.services")
        
        .factory("ApiHttpHandler", [
            '$http',
            '$httpParamSerializer',
            'BASE_URL',
            ApiHttpHandler
        ]);

    function ApiHttpHandler($http, $httpParamSerializer, BASE_URL) {
        return {
            Users: {
                save: function(model, successCallback, errorCallback) {
                    $http({
                            method: 'POST',
                            url: BASE_URL + '/users',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: $httpParamSerializer(model)
                        })
                        .then(successCallback, errorCallback);
                },
                update: function(model, successCallback, errorCallback) {
                    $http({
                            method: 'PUT',
                            // url: BASE_URL + '/users/' + model._id,
                            url: BASE_URL + '/users',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            data: $httpParamSerializer(model)
                        })
                        .then(successCallback, errorCallback);
                }
            },
            Vehicles: {
                save: function(model, successCallback, errorCallback) {
                    $http({
                            method: 'POST',
                            url: BASE_URL + '/vehicles',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            data: $httpParamSerializer(model)
                        })
                        .then(successCallback, errorCallback);
                },
                update: function(model, successCallback, errorCallback) {
                    $http({
                            method: 'PUT',
                            // url: BASE_URL + '/users/' + model._id,
                            url: BASE_URL + '/vehicles',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            data: $httpParamSerializer(model)
                        })
                        .then(successCallback, errorCallback);
                }
            }
        };
    }
})();
