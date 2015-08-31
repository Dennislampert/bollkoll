app.controller("searchResultController",
  ["$http", "$scope", "$routeParams", "User", "Region", "Match",
  function($http, $scope, $routeParams, User, Region, Match) {
  	console.log("params", $routeParams.searchParams);
    var searchRegExp = new RegExp(".*" + $routeParams.searchParams + ".*");
    
    // This should work just fine bug in Mongresto (Thomas will fix)
/*  	var userParams = {
      $or: [
        {username:searchRegExp},
        {fname:searchRegExp},
        {lname:searchRegExp}
      ]
    };*/
    // Temporary while mongresto bug
    searchParams = {_all: searchRegExp};
    
    // var regionParams = {
    //   regionName:$routeParams.searchParams
    // };
  	// for (var i in $routeParams){
   //    if (i == "username") {
   //      searchParams[i] = new RegExp($routeParams[i], "i");
   //    }
  	// 	//searchParams[i] = $routeParams[i];
   //    console.log("lol: ", searchParams[i]);
  	// }

  	$scope.allSearchResults = [];
  	$scope.searchResult = {};
  	User.get(searchParams, function(result){
        console.log("lol");
        $scope.allSearchResults.push(result);
        console.log("$scope.allSearchResults: ", $scope.allSearchResults);
    });
    Region.get(searchParams,function(result){
        $scope.allSearchResults.push(result);
        console.log("$scope.allSearchResults: ", $scope.allSearchResults);
    });
    Match.get(searchParams,function(result){
        $scope.allSearchResults.push(result);
        console.log("$scope.allSearchResults: ", $scope.allSearchResults);
    });
}]);