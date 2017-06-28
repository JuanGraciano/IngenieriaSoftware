(function() {
    'use strict';

    angular.module("webapp")
        .controller("VehicleListController", [
            "$scope",
            "$state",
            "$stateParams",
            "ApiHandler",
            VehicleListController
        ]);

    function VehicleListController(
        $scope,
        $state,
        $stateParams,
        ApiHandler
    ) {
        ApiHandler.VehicleHandler().query(
            (response) => {
                $scope.vehicles = response;
            });

        $scope.deleteModel = function(id) {
            ApiHandler.VehicleHandler().delete({
                    id: id
                },
                function() {
                    toastr.success('Se ha eliminado el vehiculo');
                    $state.transitionTo("root.userList");
                },
                function(err) {
                    toastr.error('Ha ocurrido un error');
                    console.log("Error: " + err);
                });
        };
    }
})();
