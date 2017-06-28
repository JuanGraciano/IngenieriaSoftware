(function() {
  'use strict';

  angular.module("webapp")
  .controller("ClientController", [
    "$scope",
    "$state",
    "$stateParams",
    "ApiHandler",
    ClientController
  ]);

  function ClientController($scope, $state, $stateParams, ApiHandler){
    $scope.editMode = false;
    $scope.model = {
      status: 'disponible'
    };
    if ($stateParams.id !== '') {
        ApiHandler.ClientHandler().get({
            id: $stateParams.id
        }, (response) => {
            $scope.model = response;
            $scope.editMode = true;
        });
    }

    $scope.addModel = function(){
      var model = {
        title: $scope.model.title,
        name: $scope.model.name,
        lastname: $scope.model.lastname,
        username: $scope.model.phone,
        email: $scope.model.email,
        status: $scope.model.status
      };
      ApiHandler.ClientHandler().save(
        model,
        function(){
          toastr.success('Se ha creado el cliente!');
          $state.transitionTo('root.clientList');
        },
        function(error){
          console.log(error);
          toastr.error(error, 'Ha ocurrido un error');
        });
    };
  }
})();
