(function() {
  'use strict';

  angular.module("webapp")
  .controller("ClientListController", [
    "$scope",
    "$state",
    "ApiHandler",
    ClientListController
  ]);

  function ClientListController($scope, $state, ApiHandler){

      ApiHandler.ClientHandler().query( (response) => {
          $scope.clients = response;
      });
  }
})();
