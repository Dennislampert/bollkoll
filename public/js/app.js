//app declaration and dependency injection
var app = angular.module("ngNode", ["ngRoute", "ngResource", "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider.when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/tabell", {
      templateUrl: "partials/tabell.html",
      controller: "tableController"
    })
    .when("/peter", {
      templateUrl: "partials/home.html",
      controller: "matchController"
    })
    .otherwise({
      redirectTo: "/"
    });
  $locationProvider.html5Mode(true);
}]);