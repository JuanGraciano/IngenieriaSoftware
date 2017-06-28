(function() {
  'use strict';

  angular.module("webapp")
  .controller("DeliveryController", [
    "$scope",
    "$state",
    "$stateParams",
    "ApiHandler",
    DeliveryController
  ]);

  function DeliveryController($scope, $state, $stateParams, ApiHandler){
    $scope.editMode = false;

    ApiHandler.VehicleHandler().query(
      (response) => {
        $scope.vehicles = response
                            .filter(x => x.status === 'disponible');
    });

    if($stateParams.id !== ''){
      $scope.editMode = true;
      ApiHandler.UserHandler().get({id: $stateParams.id }, (response) => {
        $scope.user = response;

        if($scope.user.vehicle)
          $scope.user.vehicle = $scope.vehicles.find(x => x._id == response.vehicle);
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
