app.directive("navBar", function() {
  return {
    restrict: "E",
    templateUrl: "partials/navBar.html",
    controller: "headerController"
  };
});