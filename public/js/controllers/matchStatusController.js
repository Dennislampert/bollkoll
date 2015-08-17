app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){

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


	$scope.saveResults = function(){
		console.log("saving(updating) results! ", $scope);

        $scope.match.$update(duplicateResults);
	};

    $scope.increaseGoals = function (match,prop){match[prop]++;};
    $scope.decreaseGoals = function (match,prop){match[prop]--;};
    $scope.decreaseDisallowed = function(x){return x < 1;};
    $scope.increaseDisallowed = function(x){return x > 30;};


}]);