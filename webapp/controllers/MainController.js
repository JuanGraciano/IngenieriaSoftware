(function() {
  'use strict';

  angular.module("webapp")
  .controller("MainController", [
    "$scope",
    "$state",
    "UserManager",
    MainController
  ]);

  function MainController($scope, $state, UserManager){

    console.log("Main Controller On!");

    $scope.setActiveTab = function (tabName) {
      $scope.curstate = tabName;
    }

    $scope.logout = function() {
      toastr.info("Bye " + $scope.getCurrentUserName());
      UserManager.logout();
      $state.transitionTo('login');
    };

    $scope.isAuth = function(){
      return UserManager.isAuthenticated();
    };

    $scope.getCurrentUserName = function(){
      return UserManager.getCurrentUser().name;
    };
  }
})();
