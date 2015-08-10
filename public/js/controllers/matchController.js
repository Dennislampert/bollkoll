//"myAppName" controller.
app.controller("matchController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){

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



  // collection.Region hämta regionPath som är lika med routeParams.region
  Region.get({regionPath: $routeParams.region}, function(answer){
    console.log("answer: ",answer);
    regionAndDivisionId.regionId = answer[0]._id ? answer[0]._id : 0;
    regionAndDivisionId.division = $routeParams.division;

    Team.get(
      regionAndDivisionId,

      function(teams){
          $scope.homeTeams = teams;
          $scope.guestTeams = teams;
          // console.log("homeTeams: ", $scope.homeTeams);
          // console.log("guestTeams: ", $scope.guestTeams);

          // console.log("regionAndDivisionId: ", regionAndDivisionId);
        

        // Populate by several properties by separating them with space in string
        regionAndDivisionId._populate = "homeTeamId guestTeamId";

        // Filtering by a value that first exists after population
        // does not work? (Thomas - check/fix in Mongresto?)
        //regionAndDivisionId.guestTeamId = {name:"hamburgare"};
        //regionAndDivisionId.homeTeamId =  {name:"hamburgare"};
        
        Match.get(
          regionAndDivisionId, function(games){
            console.log("games", games);
            $scope.games = games;
          }
        );
    });
  });
}]);