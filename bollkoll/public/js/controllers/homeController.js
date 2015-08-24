//"myAppName" controller.
app.controller("homeController",
  ["$scope", "NavTitleChange",
  function($scope, NavTitleChange) {
  NavTitleChange("Hem");
}]);