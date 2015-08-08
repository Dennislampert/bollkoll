//"myAppName" controller.
app.controller("matchController", ["$scope", "$routeParams", "Match", "Region", "Team", function($scope, $routeParams, Match, Region, Team){



  $scope.save = function() {
    Match.create({
      homeTeamId: $scope.homeTeam._id,
      guestTeamId: $scope.guestTeam._id,
      place: $scope.match.place,
      date: $scope.match.date,
      time: $scope.match.time,
      homeResults: 0,
      guestResults: 0,
      finishedGame: 0,
      regionId: 0,
      divisionId: 0,
      gameWinnerId: 0
    });
  };



  // collection.Region hämta regionPath som är lika med routeParams.region
  Region.get({regionPath: $routeParams.region}, function(answer){

    var regionId = answer[0]._id;

    Team.get({
      regionId: regionId,
      division: $routeParams.division
    },
      function(team){
      // console.log("3: ");
      console.log("team: ", $scope.team);
    });
  });



// console.log("routeParams: ",$routeParams.division);
// console.log("routeParams(region): ", $routeParams.region);

}]);