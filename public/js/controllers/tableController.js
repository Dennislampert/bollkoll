app.controller("tableController", ["$scope", "Team", function($scope, Team) {
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

  $scope.getTeams = Team.get();

}]);