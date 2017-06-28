(function() {
  'use strict';

  angular.module("webapp")
  .controller("LoginController", [
    "$scope",
    "$state",
    "UserManager",
    LoginController
  ]);

  function LoginController($scope, $state, UserManager){

    function successCallback(user) {
      toastr.success('Hola ' + user.name);
      $state.transitionTo("root.dashboard");
    }

    function errorCallback(error) {
      toastr.error(error.data.message, "Fallo de Auth");
    }

    $scope.login = function(username, password) {
       UserManager.login(username, password, successCallback, errorCallback);
    }
  }
})();
