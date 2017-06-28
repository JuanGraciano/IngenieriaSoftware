(function() {
    'use strict';

    angular.module("webapp")
        .controller("UserController", [
            "$scope",
            "$state",
            "$stateParams",
            'ApiHandler',
            UserController
        ]);

    function UserController($scope, $state, $stateParams, ApiHandler) {
        $scope.editMode = false;
        $scope.user = {
            status: 'disponible',
            role: 'vendedor'
        };

        if ($stateParams.id !== '') {
            ApiHandler.UserHandler().get({
                id: $stateParams.id
            }, (response) => {
                $scope.user = response;
                $scope.editMode = true;
            });
        }

        $scope.addUser = function() {
            ApiHandler.UserHandler().save(
                $scope.user,
                function(res) {
                    toastr.success('Se ha creado el usuario');
                    $state.transitionTo('root.userList');
                },
                function(error) {
                    console.log(error);
                    toastr.error(error, 'Ha ocurrido un error');
                });
        };

        $scope.editUser = function() {
            $scope.user.$update(
                function() {
                    toastr.success('Se ha modificado el usuario');
                    $state.transitionTo('root.userList');
                },
                function() {
                    toastr.error('Ha ocurrido un error');
                }
            );
        };

        $scope.makeUsername = function(){
          var names = $scope.user.name.split(" ");
          $scope.user.username = names[0].toLowerCase()[0] + ((names[1]) ? names[1].toLowerCase() : '');
        };
    }
})();
