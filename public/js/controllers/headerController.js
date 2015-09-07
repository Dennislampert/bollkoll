app.controller("headerController",
  ["$scope", "$location", "$rootScope", "Login", "$window", "modalService", "$route",
  function($scope, $location, $rootScope, Login, $window, modalService, $route) {
    $scope.headerUser = Login.getCurrentUser();
    $scope.nav  = {
      collapsed: true
    };
    Login.protectRoute();
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
    $scope.logout = function() {
      Login.logout();
    };
    $scope.search = function(seachTerm) {
      if (seachTerm) {
        $location.path("/search/" + seachTerm);
      }
    };
}]);