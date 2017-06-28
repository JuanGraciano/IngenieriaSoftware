(function() {
  'use strict';

  angular.module("webapp")
  .controller("DeliveryListController", [
    "$scope",
    "$state",
    "ApiHandler",
    DeliveryListController
  ]);

  function DeliveryListController($scope, $state, ApiHandler){
    ApiHandler.UserHandler().query(
      (response) => {
        $scope.deliveries = response.filter(x => x.role === 'repartidor');
    });
  }
})();
