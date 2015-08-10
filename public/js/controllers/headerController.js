app.controller("headerController", ["$scope", function($scope) {
  $scope.navCollapsed = true;
  var origNavText = 'no title';
  $scope.navText = origNavText;
  $scope.$on("titleChange", function(e, data) {
    $scope.navText = data || origNavText;
  })
  $scope.collapseToggle = function() {
    $scope.navCollapsed = !$scope.navCollapsed;
  };
}]);