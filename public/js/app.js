//app declaration and dependency injection
var app = angular.module("ngNode", ["ngRoute", "ngResource", "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider.when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/settings/region", {
      templateUrl: "partials/insertRegion.html",
      controller: "regionController"
    })
    .when("/crew", {
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
    // Get the ":values" as an object on the $routprovider and use it in the controller..
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
    .otherwise({
      redirectTo: "/"
    });
  $locationProvider.html5Mode(true);
}]);