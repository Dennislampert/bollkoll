app.controller("alertBoxController", ["$scope", "$rootScope", "$modal", "$log", "$location", "Login", function($scope, $rootScope, $modal, $log, $location, Login) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'alertbox.html',
      controller: 'alertBoxController',
      size: size,
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
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

app.controller('ModalInstanceCtrl',["$scope", "$modalInstance", function ($scope, $modalInstance) {

  $scope.redirect = function () {
    $modalInstance.close();
    $location.url("/loggain");
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);