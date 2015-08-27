//"myAppName" controller.
app.controller("homeController",
  ["$scope", "NavTitleChange", "UserStore",
  function($scope, NavTitleChange, UserStore) {
  NavTitleChange("Hem");
  var userStoreKeys = [
    "regionDropDown",
    "divisionDropDown"
  ]
  userStoreKeys.forEach(function(key) {
    $scope[key] = UserStore.temp[key] ? UserStore.temp[key] : undefined;
  });

  $scope.updateUserStore = function(key) {
    UserStore.temp[key] = $scope[key];
  }
}]);