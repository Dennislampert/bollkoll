app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){

    // console.log("$routeparams: ", $routeParams);

    var populateObject = {};

    populateObject._id = $routeParams.gameId;

    populateObject._populate = "homeTeamId guestTeamId";

    // När det finns tid, gör en GET för endast nödvändig data (results) för minskad datatrafik
    function getUpdatedResults(){
        Match.get(
            populateObject, function(teams){
                console.log("teams: ", teams);
                $scope.teams = teams;
            });
    }


    getUpdatedResults();

	$scope.saveResults = function(){
		console.log("saving(updating) results! ", $scope);

		Match.update({
      _id: $routeParams.gameId
    },
    {
      homeResults: $scope.match.homeResults,
      guestResults: $scope.match.guestResults
    });
        getUpdatedResults();
	};

}]);