(function() {
  'use strict';

  angular.module("webapp")
  .controller("OrderListController", [
    "$scope",
    "$state",
    "ApiHandler",
    OrderListController
  ]);

  function OrderListController($scope, $state, ApiHandler){
    ApiHandler.OrderHandler().query(
      (response) => {
        $scope.orders = response;
    });
  }
})();
