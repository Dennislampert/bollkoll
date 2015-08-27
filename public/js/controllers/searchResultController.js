app.controller("searchResultController",
  ["$http", "$scope", "$routeParams", "User",
  function($http, $scope, $routeParams, User) {
  	console.log("params", $routeParams);
  	var searchParams = {}
  	for (var i in $routeParams)  {
  		searchParams[i] = $routeParams[i];
  	}
  	/*if (i == "username") {
  		$routeParams[i] = new RegExp($routeParams[i], "i");
  	}*/

  	$scope.allSearchResults = [];
  	$scope.searchResult = {};
  	User.get(searchParams,function(result){
        $scope.allSearchResults.push(result);
        console.log("$scope.allSearchResults: ", $scope.allSearchResults);
    });
}]);