//"myAppName" controller.
app.controller("matchController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){

  // console.log("hallelujah!")



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
      finishedGame: 0
    });
  };



  // collection.Region hämta regionPath som är lika med routeParams.region
  Region.get({regionPath: $routeParams.region}, function(answer){

    var regionId = answer[0]._id;

    Team.get({  // get all teams from collection 'team(s)' that 
      regionId: regionId, // has this regionId
      division: $routeParams.division // and this division
    },
    function(teams){
        $scope.homeTeams = teams;
        $scope.guestTeams = teams;
        console.log("homeTeams: ", $scope.homeTeams);
        console.log("guestTeams: ", $scope.guestTeams);
    });
  });


// console.log("routeParams: ",$routeParams.division);
// console.log("routeParams(region): ", $routeParams.region);

}]);