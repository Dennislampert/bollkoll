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
  	if($scope.term == false) {
  	  console.log("its false, I'm sorry");
  	}
  	else {
	  var searchParams = {
	  	username: $scope.term
      // regionName: $scope.term
	  };

	  var searchUrl = '/search';
	  var first = true;
	  for (var i in searchParams) {
	  	searchUrl += first ? '?' : '&';
	  	searchUrl += i + '=' + searchParams[i];
	  	first = false;
	  }

	  searchUrl = encodeURI(searchUrl);
	  console.log("searchUrl", searchUrl);
	  $location.url(searchUrl);
	  // $http.get($scope.term).success(function(result) {
	  //    console.log("result");
	  //    return result.data;
	  // });
	}
  }
}]);