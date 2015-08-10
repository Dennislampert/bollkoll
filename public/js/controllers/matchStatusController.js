app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){


	$scope.saveResults = function(){
		console.log("saving(updating) results! ", $scope);

		Match.update({
      _id: $routeParams.gameId
    },
    {
      homeResults: $scope.match.homeResults,
      guestResults: $scope.match.guestResults
    });
	};

}]);