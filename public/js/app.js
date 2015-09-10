//app declaration and dependency injection
var app = angular.module("bollKoll", ["ngRoute", "ngResource", "ngFileUpload", "ui.bootstrap", "ngSanitize", "ngTouch", "superswipe", "cropme"]);

app.getElementOffset = function(element){
    element = typeof element == "string" ? document.querySelector(element) : element;
    var de = document.documentElement;
    var box = element.getBoundingClientRect();
    var top = box.top + window.pageYOffset - de.clientTop;
    var left = box.left + window.pageXOffset - de.clientLeft;
    return { top: top, left: left, el: element };
}

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider.when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/region", {
      templateUrl: "partials/addRegion.html",
      controller: "regionController",
      loggedIn: true
    })
    .when("/test", {
      templateUrl: "partials/alertbox.html",
      controller: "alertBoxController"
    })
    .when("/table", {
      templateUrl: "partials/editTable.html",
      controller: "tableController",
      loggedIn: true
    })
    .when("/om-oss", {
      templateUrl: "partials/about.html",
      controller: ""
    })
    .when("/loggain", {
      templateUrl: "partials/login.html",
      controller: "loginController"
    })
    .when("/loggain/fel", {
      templateUrl: "partials/login.html",
      controller: "loginController"
    })
    .when("/registrering", {
      templateUrl: "partials/register.html",
      controller: "registerController"
    })
    .when("/:regionPath/:division/chat", {
      templateUrl: "partials/chat.html",
      controller: "chatController"
    })
    .when("/:regionPath/:division/chat/:messageId", {
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
    .when("/:region/:division/spelschema/:matchId", {
      templateUrl: "partials/matches.html",
      controller: "matchController"
    })
    .when("/:region/:division/:gameId/matchstatus", {
      templateUrl: "partials/matchstatus.html",
      controller: "matchStatusController",
      loggedIn: true,
      resolve: {
        isOkMatch: ["$route", "$location", "Match", function($route, $location, Match) {
          console.log("fakka u", angular.copy($route.current.params));
          window.paraaaa = $route;
          return Match.get({_id:$route.current.params.gameId}, function(data) {
            console.log("match", data);
            if (Match.finishedGame) {
              $location.path('/');
            }
          });
        }]
      }
    })
    .when("/:region/:division/tabell", {
      templateUrl: "partials/table.html",
      controller: "tableController"
    })
    // .when("/:matchId/chat", {
    //   templateUrl: "partials/chat.html",
    //   controller: "chatController"
    // })
    .when("/data", {
      templateUrl: "partials/chat.html",
      controller: "dataController"
    })
    .when("/anvandare/:username", {
      templateUrl: "partials/userProfile.html",
      controller: "profileController"
    })
    .when("/anvandare/:username/settings", {
      templateUrl: "partials/userprofilesettings.html",
      controller: "profileSettingsController"
    })
    .when("/search/:searchParams", {
      templateUrl: "partials/searchResult.html",
      controller: "searchResultController"
    })
    .otherwise({
      redirectTo: "/"
    });
  $locationProvider.html5Mode(true);
}]);

