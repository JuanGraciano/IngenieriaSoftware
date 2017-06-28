(function() {
  'use strict';

  angular.module("webapp")
  .controller("OrganizationController", [
    "$scope",
    "$state",
    "$stateParams",
    "ApiHandler",
    OrganizationController
  ]);

  function OrganizationController($scope, $state, $stateParams, ApiHandler){
    $scope.editMode = false;
    $scope.model = {
        status: 'disponible',
    };

    if($stateParams.id !== ''){
      ApiHandler.OrganizationHandler().get({id: $stateParams.id }, (response) => {
        $scope.model = response;
        $scope.editMode = true;
      });
    }

    $scope.addModel = function(){
      var model = {
        status: $scope.model.status,
        companyID: $scope.model.companyID,
        companyNAME: $scope.model.companyNAME,
      };
        ApiHandler.OrganizationHandler().save(
          model,
          function(res){
            toastr.success('Se ha creado la organización');
            $state.transitionTo('root.organizationList');
          },
          function(error){
            toastr.error('Ha ocurrido un error');
          });
    };

    $scope.editModel = function() {
      var model = {
        id: $scope.model._id,
        status: $scope.model.status,
        companyID: $scope.model.companyID,
        companyNAME: $scope.model.companyNAME,
      };
        ApiHandler.OrganizationHandler().update(
            model,
            function() {
                toastr.success('Se ha modificado el organización');
                $state.transitionTo('root.organizationList');
            },
            function() {
                toastr.error('Ha ocurrido un error');
            }
        );
    };

  }
})();
