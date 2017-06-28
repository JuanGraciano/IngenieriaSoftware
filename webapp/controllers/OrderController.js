(function() {
  'use strict';

  angular.module("webapp")
  .controller("OrderController", [
    "$scope",
    "$state",
    "$stateParams",
    "ApiHandler",
    OrderController
  ]);

  function OrderController($scope, $state, $stateParams, ApiHandler){
    $scope.editMode = false;

    if($stateParams.id !== ''){
      $scope.editMode = true;
      ApiHandler.OrderHandler().get({id: $stateParams.id }, (response) => {
        $scope.model = response;

      });
    }

    $scope.editModel = function() {
      var model = {
        "id": $scope.user._id,
        "status": $scope.user.status,
        "vehicle": $scope.user.vehicle
      };
        ApiHandler.UserHandler().update(
            model,
            function() {
                toastr.success('Se ha modificado el usuario');
                $state.transitionTo('root.deliveryList');
            },
            function() {
                toastr.error('Ha ocurrido un error');
            }
        );
    };
  }
})();
