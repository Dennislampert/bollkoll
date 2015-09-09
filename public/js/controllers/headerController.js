app.controller("headerController",
  ["$scope", "$location", "$rootScope", "Login", "$window", "modalService",
  function($scope, $location, $rootScope, Login, $window, modalService) {
  $scope.headerUser = Login.getCurrentUser();
  $scope.nav  = {
    collapsed: true
  };

  var origNavText = 'Hem';
  $scope.navText = origNavText;
  $scope.$on("titleChange", function(e, data) {
    $scope.navText = data || origNavText;
  });

  $rootScope.$on('login', function() {
    $scope.headerUser = Login.getCurrentUser();
  });

  $rootScope.$on('logout', function() {
    $scope.headerUser = Login.getCurrentUser();
  });

  $scope.collapseToggle = function() {
    $scope.nav.collapsed = !$scope.nav.collapsed;
  };

  $scope.logout = function() {
    Login.logout();
  };
  $scope.search = function(seachTerm) {
    if (seachTerm) {
      $location.path("/search/" + seachTerm);
    }
  };
  $scope.redirect = function(path) {
    $location.path(path);
  };
}]);