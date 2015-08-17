app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){

    // console.log("$routeparams: ", $routeParams);

    // var populateObject = {};

    function duplicateResults(){
         $scope.oldResults = {
            homeResults: $scope.match.homeResults,
            guestResults: $scope.match.guestResults
        };
    }

    $scope.match = Match.getById({
        _id: $routeParams.gameId,
        _populate: "homeTeamId guestTeamId"
    },duplicateResults);



    // populateObject._id = $routeParams.gameId;

    // populateObject._populate = "homeTeamId guestTeamId";

    // När det finns tid, gör en GET för endast nödvändig data (results) för minskad datatrafik
    /*function getUpdatedResults(){
        Match.get(
            populateObject, function(teams){
                $scope.teams = teams;
            });
    }
*/

    //getUpdatedResults();

	$scope.saveResults = function(){
		console.log("saving(updating) results! ", $scope);


        $scope.match.$update(duplicateResults);
        /*
        Match.update({
          _id: $routeParams.gameId
        },
        {
          homeResults: $scope.match.homeResults,
          guestResults: $scope.match.guestResults
        });
        */
	};

    $scope.increaseGoals = function (match,prop){match[prop]++;};
    $scope.decreaseGoals = function (match,prop){match[prop]--;};
    $scope.decreaseDisallowed = function(x){return x < 1;};
    $scope.increaseDisallowed = function(x){return x > 30;};


}]);