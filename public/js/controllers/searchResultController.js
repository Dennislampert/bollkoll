app.controller("searchResultController",
  ["$http", "$scope", "$routeParams", "User",
  function($http, $scope, $routeParams, User) {
  	console.log("params", $routeParams);
  	$scope.allSearchResults = [];
  	$scope.searchResult = {};
  	User.get({"username": new RegExp("", "i")},function(username){
  	  if(username === false) {
  	  	console.log("its false, I'm sorry");
  	  }
  	  else {
        $scope.allSearchResults.push(User);
      }
    });
}]);