(function() {
  'use strict';

  angular.module("webapp")
  .controller("UserListController", [
    "$scope",
    "$state",
    "$stateParams",
    "ApiHandler",
    UserListController
  ]);

  function UserListController($scope, $state, $stateParams, ApiHandler){

    ApiHandler.UserHandler().query(
      (response) => {
      $scope.users = response;
    });

    $scope.deleteModel = function(id){
      ApiHandler.UserHandler().delete(
        {id: id},
        function() {
          toastr.success('Se ha eliminado el usuario');
          $state.transitionTo("root.userList");
        },
        function(err){
          toastr.error('Ha ocurrido un error');
          console.log("Error: " + err);
      });
    };
  }
})();
