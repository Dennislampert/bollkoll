app.controller("headerController", 
  ["$scope", "Login", 
  function($scope, Login) {
  $scope.headerUser = Login.user;
  // console.log($scope.headerUser);
  $scope.navCollapsed = true;
  var origNavText = 'Hem';
  $scope.navText = origNavText;
  $scope.$on("titleChange", function(e, data) {
    $scope.navText = data || origNavText;
  })
  $scope.collapseToggle = function() {
    $scope.navCollapsed = !$scope.navCollapsed;
  };
}]);