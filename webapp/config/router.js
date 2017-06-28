(function() {
  'use strict';

  angular.module("webapp")
    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/login');

      $stateProvider
        .state('root', {
          abstract: true,
          templateUrl: 'views/layout.html',
          controller: 'MainController',
          data: {
            authenticate: true
          },
        })
        .state('root.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/dashboard.html',
        })

        .state('login', {
          url: '/login',
          controller: "LoginController",
          templateUrl: 'views/auth/login.html',
          data: {
            authenticate: false
          },
        })
          // User CRUD
        .state('root.userCreate', {
          url: '/user/create/:id',
          controller: "UserController",
          templateUrl: 'views/user/create.html'
        })
        .state('root.userList', {
          url: '/user/list',
          controller: "UserListController",
          templateUrl: 'views/user/list.html',
        })
          // Client CRUD
        .state('root.clientCreate', {
          url: '/client/create/:id',
          controller: "ClientController",
          templateUrl: 'views/client/create.html'
        })
        .state('root.clientList', {
          url: '/client/list',
          controller: "ClientListController",
          templateUrl: 'views/client/list.html',
        })
        // Vehicle CRUD
      .state('root.vehicleCreate', {
        url: '/vehicle/create/:id',
        controller: "VehicleController",
        templateUrl: 'views/vehicle/create.html'
      })
      .state('root.vehicleList', {
        url: '/vehicle/list',
        controller: "VehicleListController",
        templateUrl: 'views/vehicle/list.html',
      })
       // Organization CRUD
      .state('root.organizationCreate', {
        url: '/organization/create/:id',
        controller: "OrganizationController",
        templateUrl: 'views/organization/create.html'
      })
      .state('root.organizationList', {
        url: '/organization/list',
        controller: "OrganizationListController",
        templateUrl: 'views/organization/list.html',
      })
      // Order CRUD
      .state('root.orderList', {
        url: '/order/list',
        controller: "OrderListController",
        templateUrl: 'views/order/list.html',
      })
      // Order CRUD
      .state('root.orderCreate', {
        url: '/order/create/:id',
        controller: "OrderController",
        templateUrl: 'views/order/create.html',
      })
      // Delivery CRUD
      .state('root.deliveryCreate', {
        url: '/delivery/create/:id',
        controller: "DeliveryController",
        templateUrl: 'views/delivery/create.html',
      })
      .state('root.deliveryList', {
        url: '/delivery/list',
        controller: "DeliveryListController",
        templateUrl: 'views/delivery/list.html',
      })
        ;
    });
})();
