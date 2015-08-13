app.controller("matchController", ["$scope", "$routeParams", "Match", "Region", "Team", "Login", function($scope, $routeParams, Match, Region, Team, Login){

  // console.log("hallelujah!")

  var regionAndDivisionId = {};

  $scope.saveIT = function() {
    console.log("run bastard run! :", $scope);
    Match.create({
      homeTeamId: $scope.homeTeam._id,
      guestTeamId: $scope.guestTeam._id,
      place: $scope.match.place,
      date: $scope.match.date,
      time: $scope.match.time,
      homeResults: 0,
      guestResults: 0,
      finishedGame: 0,
      regionId: regionAndDivisionId.regionId,
      division: regionAndDivisionId.division
    });
  };

  var currentId;
  $scope.currentlyShownResult = function(idToCheck){
    return idToCheck != currentId;
  };

  $scope.toggleID = function(clickedId){

    currentId = currentId == clickedId ? false : clickedId;
  };

    console.log("Login: ",Login.user);


  // collection.Region hämta regionPath som är lika med routeParams.region
  Region.get({regionPath: $routeParams.region}, function(answer){
    regionAndDivisionId.regionId = answer[0]._id;
    regionAndDivisionId.division = $routeParams.division;

    Team.get(
      regionAndDivisionId, function(teams){
        $scope.homeTeams = teams;
        $scope.guestTeams = teams;

        // Populate by several properties by separating them with space in string
        regionAndDivisionId._populate = "homeTeamId guestTeamId";
        
        Match.get(
          regionAndDivisionId, function(games){
            games.regionPath = $routeParams.region;
            $scope.games = games;
            $scope.playedGames = "";
            console.log("games: ",$scope.games);
          }
        );
    });
  });
}]);
