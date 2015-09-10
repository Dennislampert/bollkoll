app.directive("appLoader", ["Login", "$route", function(Login, $route) {
  // this directive only exists to instantiate Login and provide $route to
  // the included ng-view in the directive .html file
  return {
    restrict: "E",
    templateUrl: '../../partials/appLoader.html'
  };
}]);