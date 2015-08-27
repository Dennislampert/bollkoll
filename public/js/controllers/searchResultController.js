app.controller("searchResultController",
  ["$http", "$scope", "$routeParams", "User", "Region",
  function($http, $scope, $routeParams, User, Region) {
  	console.log("params", $routeParams.searchParams);
  	var userParams = {username:$routeParams.searchParams};
    var regionParams = {regionName:$routeParams.searchParams};
  	// for (var i in $routeParams){
   //    if (i == "username") {
   //      searchParams[i] = new RegExp($routeParams[i], "i");
   //    }
  	// 	//searchParams[i] = $routeParams[i];
   //    console.log("lol: ", searchParams[i]);
  	// }

  	$scope.allSearchResults = [];
  	$scope.searchResult = {};
  	User.get(userParams, function(result){
        console.log("lol");
        $scope.allSearchResults.push(result);
        console.log("$scope.allSearchResults: ", $scope.allSearchResults);
    });
    Region.get(regionParams,function(result){
        $scope.allSearchResults.push(result);
        console.log("$scope.allSearchResults: ", $scope.allSearchResults);
    });
}]);