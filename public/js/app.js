//app declaration and dependency injection
var app = angular.module("ngNode", ["ngRoute", "ngResource", "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/:region/:divition/spelschema", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/:region/:divition/tabell", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/:region/:divition/chat", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/login", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/register", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/om-bollkoll", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/crew", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);
}]);