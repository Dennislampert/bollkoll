app.controller("headerController", ["$scope", "$http", "$location", function($scope, $http, $location) {
  $scope.navCollapsed = true;
  var origNavText = 'Hem';
  $scope.navText = origNavText;
  $scope.$on("titleChange", function(e, data) {
    $scope.navText = data || origNavText;
  })
  $scope.collapseToggle = function() {
    $scope.navCollapsed = !$scope.navCollapsed;
  };
  $scope.search = function(){
  	$location.search("username=" + $scope.term);
    // $http.get($scope.term).success(function(result) {
    //    console.log("result");
    //    return result.data;
    // });
  }
}]);