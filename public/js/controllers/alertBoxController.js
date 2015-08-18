app.controller("alertBoxController", ["$scope", "$rootScope", "$location", "Login", function($scope, $rootScope, $location, Login) {
  $scope.alerts = {
    type: 'success', msg: 'Du behöver logga in för att kunna få tillgång till denna sidan!'
  };

  var history = [];

  $rootScope.$on('$routeChangeSuccess', function() {
      history.push($location.$$path);
  });

  $rootScope.back = function () {
      var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
      $location.url(prevUrl);
  };

}]);