(function() {
    'use strict';

    angular.module("webapp", [
            'ui.router',
            'ngStorage',
            'api.services',
            'ui.bootstrap',
        ])
    .factory('apiHttpInterceptor', function($q, $localStorage) {
      return {
        'request': function(config) {
          var rex = /http:\/\/localhost:3000\/api\/\w+/g;

          if(rex.test(config.url)){
            config.headers["Authorization"] = $localStorage.token;
            config.headers["x-access-token"] = $localStorage.token;
          }
          return config;
        }
      };
    })
    .config(function($httpProvider){
      $httpProvider.interceptors.push('apiHttpInterceptor');
    })
    .run(function($rootScope, $state, UserManager) {
      UserManager.init();
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if(toState.data.authenticate  && !UserManager.isAuthenticated()) {
          $state.transitionTo("login");
          event.preventDefault();
        }
      });
    })
    ;
})();
