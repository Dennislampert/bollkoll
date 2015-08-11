app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){

	Match.get({
		homeTeamId: $scope.homeTeam._id,
        guestTeamId: $scope.guestTeam._id,
        place: $scope.match.place,
        date: $scope.match.date,
        // time: $scope.match.time,
        homeResults: 0,
        guestResults: 0,
        finishedGame: 0
        // regionId: regionAndDivisionId.regionId,
        // division: regionAndDivisionId.division
	});




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





    Match.get(
      homeTeamId, function(match){
        // $scope.match = match;
        console.log("match get!! ", match);
      }
    );
}]);