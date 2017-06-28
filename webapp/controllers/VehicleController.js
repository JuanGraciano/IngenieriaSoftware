(function() {
    'use strict';

    angular.module("webapp")
        .controller("VehicleController", [
            "$scope",
            "$state",
            "$stateParams",
            "ApiHandler",
            "ApiHttpHandler",
            VehicleController
        ]);

    function VehicleController($scope, $state, $stateParams, ApiHandler, ApiHttpHandler) {
        $scope.editMode = false;
        $scope.model = {
            status: 'disponible'
        };

        if ($stateParams.id !== '') {
            ApiHandler.VehicleHandler().get({
                id: $stateParams.id
            }, (response) => {
                $scope.model = response;
                $scope.editMode = true;
            });
        }

        $scope.addModel = function() {
            ApiHandler.VehicleHandler().save(
                $scope.model,
                function(res) {
                    toastr.success('Se ha creado el vehiculo');
                    $state.transitionTo('root.vehicleList');
                },
                function(error) {
                    console.log(error);
                    toastr.error(error.data, 'Error');
                });
        };

        $scope.editModel = function() {
          var model = {
            "id": $scope.model._id,
             "chassis": $scope.model.chassis,
             "status": $scope.model.status,
            "capacity": $scope.model.capacity
          };
          // ApiHttpHandler.Vehicles.update(model);
            ApiHandler.VehicleHandler().update(
                model,
                function() {
                    toastr.success('Se ha modificado el vehiculo');
                    $state.transitionTo('root.vehicleList');
                },
                function() {
                    toastr.error('Ha ocurrido un error');
                }
            );
        };
    }
})();
