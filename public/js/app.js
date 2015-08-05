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
    .when("/region", {
      templateUrl: "partials/addRegion.html",
      controller: "regionController"
    })
    .when("/om-oss", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/loggain", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/registrering", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/om-bollkoll", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/chat", {
      templateUrl: "partials/chat.html",
      controller: "chatController"
    })
    // Get the ":values" as an object on the $routprovider and use it in the controller..
    .when("/:region/:division/spelschema", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/:region/:division/tabell", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/:region/:division/chat", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);
}]);