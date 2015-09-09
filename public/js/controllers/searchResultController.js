app.controller("searchResultController",
  ["$http", "$scope", "$routeParams", "$location", "$anchorScroll", "User", "Message", "Match", "NavTitleChange",
  function($http, $scope, $routeParams, $location, $anchorScroll, User, Message, Match, NavTitleChange) {
    NavTitleChange("Sök");

  	console.log("params", $routeParams.searchParams);
    var searchRegExp = new RegExp(".*" + $routeParams.searchParams + ".*","i");
    
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

  	$scope.usersFound = [];
    $scope.messagesFound = [];
    $scope.matchesFound = [];
    $scope.showUsers = false;
    $scope.showMessages = false;
    $scope.showMatches = false;
  	$scope.searchResult = {};
  	User.get(searchParams, function(result){
        console.log("lol");
        $scope.usersFound = result;
        console.log("$scope.usersFound: ", $scope.usersFound);
    });

    var maSearch = JSON.parse(JSON.stringify(searchParams)); // copy searchParams object
    maSearch._populate = "guestTeamId homeTeamId regionId";

    Match.get(maSearch,function(result){
        $scope.matchesFound = result;
        console.log("$scope.matchesFound: ", $scope.matchesFound);
    });

    var meSearch = JSON.parse(JSON.stringify(searchParams)); // copy searchParams object
    meSearch._populate = "userId regionId";    

    Message.get(meSearch,function(result){
        $scope.messagesFound = result;
        console.log("$scope.messagesFound: ", $scope.messagesFound);
    });

    $scope.scrollToAnchor = function(anchor) {

      setTimeout(function() {
        var element = app.getElementOffset('#' + anchor);
        window.scrollTo(0,element.top-65);
      },300);
    };

    $scope.redirect = function(path){
      $location.path(path);
    };
}]);