(function() {
    'use strict';
    angular.module("api.services", [
        'ngResource',
    ])
    .constant('BASE_URL', 'http://localhost:3000')
    .factory("ApiHandler", [
        '$resource',
        'BASE_URL',
        ApiHandler
    ]);

    function ApiHandler($resource, BASE_URL) {
        return {
            UserHandler: function() {
                return $resource(BASE_URL + '/api' + '/users/:id', {
                    id: '@_id'
                }, {
                    update: {
                        method: 'PUT',
                        url: BASE_URL + '/api' + '/users',
                    }
                });
            },
            ClientHandler: function() {
                return $resource(BASE_URL + '/api' + '/clients/:id', {
                    id: '@_id'
                }, {
                    update: {
                        method: 'PUT',
                        url: BASE_URL + '/api' + '/clients',
                    }
                });
            },
            VehicleHandler: function() {
                return $resource(BASE_URL + '/api' + '/vehicles/:id', {
                    id: '@_id'
                }, {
                    update: {
                        method: 'PUT',
                        url: BASE_URL + '/api' + '/vehicles',
                    }
                });
            },
            OrganizationHandler: function() {
                return $resource(BASE_URL + '/api' + '/companies/:id', {
                    id: '@_id'
                }, {
                    update: {
                        method: 'PUT',
                        url: BASE_URL + '/api' + '/companies',
                    }
                });
            },
            OrderHandler: function() {
                return $resource(BASE_URL + '/api' + '/order/:id', {
                    id: '@_id'
                }, {
                    update: {
                        method: 'PUT',
                        url: BASE_URL + '/api' + '/orders',
                    }
                });
            }
        };
    }
})();
