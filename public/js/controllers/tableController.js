app.controller("tableController", ["$scope", "Team", "Region", function($scope, Team, Region) {
  console.log("im working");

  // $scope.team = Team.create({
  //   name: "Hällbo IK",
  //   gamesPlayed: 10,
  //   gamesWon: 5,
  //   gamesDrawn: 3,
  //   gamesLost: 2,
  //   goalsFor: 20,
  //   goalsAgainst: 10,
  //   Points: 18,
  //   regionId: 4,
  //   divisionId: 1,
  //   picturePath: "vonklv"
  // });

  $scope.save = function() {
    Team.create({
      name: $scope.team.name,
      regionId: $scope.region._id,
      division: $scope.team.division
    });
  };

  $scope.getTeams = Team.get();

  $scope.getRegions = Region.get();

}]);