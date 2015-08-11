//app declaration and dependency injection
var app = angular.module("ngNode", ["ngRoute", "ngResource", "ui.bootstrap"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider.when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/region", {
      templateUrl: "partials/addRegion.html",
      controller: "regionController"
    })

    .when("/table", {
      templateUrl: "partials/editTable.html",
      controller: "tableController"
    })
    .when("/om-oss", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/loggain", {
      templateUrl: "partials/login.html",
      controller: "loginController"
    })
    .when("/registrering", {
      templateUrl: "partials/register.html",
      controller: "registerController"
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
    
    // when "localhost:3000/skane/4/spelschema"
    .when("/:region/:division/spelschema/settings", {
      templateUrl: "partials/matchSet.html",
      controller: "matchController"
    })
    .when("/:region/:division/spelschema", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/:region/:division/:gameId/matchstatus", {
      templateUrl: "partials/matchstatus.html",
      controller: "matchStatusController"
    })
    .when("/:region/:division/tabell", {
      templateUrl: "partials/table.html",
      controller: "tableController"
    })
    .when("/:gameid/chat", {
      templateUrl: "partials/chat.html",
      controller: "chatController"
    })
    .otherwise({
      redirectTo: "/"
    });
  $locationProvider.html5Mode(true);
}]);