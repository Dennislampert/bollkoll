//"myAppName" controller.
app.controller("matchController", ["$scope","Match", function($scope,Match){

  $scope.clickevent = function(){

    Match.create({

      homeTeamId: 1,
      guestTeamId: 1,
      time: 1,
      date: 1,
      homeResults: 1,
      guestResults: 1,
      finishedGame: false,
      regionId: 1,
      division: 4,
      place: "Ilsbo",
      gameWinnerId: 1

    }, function() {
      $scope.test = Match.get();
    });
  };

  // $scope.test = Matches.getById("55815ab22a32d551d4c54bd7");
  // $scope.test = Matches.get({_id:"55815ab22a32d551d4c54bd7"});

}]);