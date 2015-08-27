app.controller("searchResultController",
  ["$http", "$scope", "$routeParams", "User", "Region",
  function($http, $scope, $routeParams, User, Region) {
  	console.log("params", $routeParams);
  	var searchParams = {}
  	for (var i in $routeParams)  {
  		searchParams[i] = $routeParams[i];
      console.log("lol: ", searchParams[i]);
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
    // Region.get(searchParams,function(result){
    //     $scope.allSearchResults.push(result);
    //     console.log("$scope.allSearchResults: ", $scope.allSearchResults);
    // });
}]);