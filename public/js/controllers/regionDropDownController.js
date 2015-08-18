app.controller("regionDropDownController",
  ["$scope", "Region",
  function($scope, Region) {
    Region.get({}, function(data) {
      $scope.regionsDropDown = data;
    });
}]);