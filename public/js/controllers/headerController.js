app.controller("headerController", 
  ["$scope", "$rootScope", "Login",
  function($scope, $rootScope, Login) {
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

  $scope.collapseToggle = function() {
    $scope.nav.collapsed = !$scope.nav.collapsed;
  };
}]);