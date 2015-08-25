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
    // $scope.headerUser = Login.logout();
    // $location.path("/");
    Login.logout();
  };
  $scope.search = function(){
  	$location.search("username=" + $scope.term);
    // $http.get($scope.term).success(function(result) {
    //    console.log("result");
    //    return result.data;
    // });
  }
}]);