(function() {
  'use strict';

  angular.module("webapp")
  .controller("OrganizationListController", [
    "$scope",
    "$state",
    "ApiHandler",
    OrganizationListController
  ]);

  function OrganizationListController($scope, $state, ApiHandler){
    ApiHandler.OrganizationHandler().query(
      (response) => {
        $scope.organizations = response;
    });

    $scope.deleteModel = function(id){
      ApiHandler.OrganizationHandler().delete(
        {id: id},
        function() {
          toastr.success('Se ha eliminado la organizacion');
          $state.transitionTo("root.organizationList");
        },
        function(err){
          toastr.error('Ha ocurrido un error');
          console.log("Error: " + err);
      });
    };
  }
})();
