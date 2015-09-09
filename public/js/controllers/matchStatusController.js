app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", "Message", "Login", "modalService", "WatchResult",function($scope, $routeParams, Match, Region, Team, Message, Login, modalService, WatchResult){

  var divisionId;
  Region.get({regionPath: $routeParams.region},function(regionId){
    console.log("regionId: ",regionId);
    divisionId = regionId[0]._id +""+ $routeParams.division;
  });

  $scope.match = Match.getById({
    _id: $routeParams.gameId,
    _populate: "homeTeamId guestTeamId"
  },duplicateResults);

  function duplicateResults(){
    $scope.oldResults = {
      homeResults: $scope.match.homeResults,
      guestResults: $scope.match.guestResults
    };
  }

  $scope.saveResults = function(){
    $scope.match.lastScoreTime = new Date() ;
    $scope.match.$update(duplicateResults);

    // creating an object where we, inside, save content for the chat
    $scope.chatInfo = {};

    // putting results into the newly created object "chatInfo"
    $scope.chatInfo.homeResults = $scope.match.homeResults;
    $scope.chatInfo.guestResults = $scope.match.guestResults;

    // the following syntax ends up visible in the chat wwindow
    $scope.chatInfo.content = $scope.match.homeTeamId.name + " " + $scope.match.homeResults + " - " + $scope.match.guestTeamId.name + " " + $scope.match.guestResults;
    $scope.chatInfo.userId = Login.user._id;
    $scope.chatInfo.matchId = $routeParams.gameId;
    $scope.chatInfo.divisionId = divisionId;
    // add the region id;
    $scope.chatInfo.status = true;


    Message.create($scope.chatInfo, function(resultsInChat) {
      console.log("sended a chat Message about this result..");
    });
  };


  $scope.increaseGoals = function (match,prop){match[prop]++;};
  $scope.decreaseGoals = function (match,prop){match[prop]--;};
  $scope.decreaseDisallowed = function(x){return x < 1;};
  $scope.increaseDisallowed = function(x){return x > 30;};

  $scope.finishGame = function() {
    $scope.match.$update(duplicateResults);
    if ($scope.match.homeResults > $scope.match.guestResults) {
        console.log("home team after finish: ", $scope.match);
        $scope.match.homeTeamId.gamesPlayed ++;
        $scope.match.homeTeamId.gamesWon ++;
        $scope.match.homeTeamId.goalsFor += $scope.match.homeResults;
        $scope.match.homeTeamId.goalsAgainst += $scope.match.guestResults;
        $scope.match.homeTeamId.Points += 3;
        $scope.match.guestTeamId.gamesPlayed ++;
        $scope.match.guestTeamId.gamesLost ++;
        $scope.match.guestTeamId.goalsFor += $scope.match.guestResults;
        $scope.match.guestTeamId.goalsAgainst += $scope.match.homeResults;
        $scope.match.guestTeamId.Points += 0;
        Team.update($scope.match.homeTeamId._id, $scope.match.homeTeamId);
        Team.update($scope.match.guestTeamId._id, $scope.match.guestTeamId);
    }
    else if ($scope.match.homeResults === $scope.match.guestResults) {
        console.log("drawn after finish: ", $scope.match);
        $scope.match.homeTeamId.gamesPlayed ++;
        $scope.match.homeTeamId.gamesDrawn ++;
        $scope.match.homeTeamId.goalsFor += $scope.match.homeResults;
        $scope.match.homeTeamId.goalsAgainst += $scope.match.guestResults;
        $scope.match.homeTeamId.Points ++;
        $scope.match.guestTeamId.gamesPlayed ++;
        $scope.match.guestTeamId.gamesDrawn ++;
        $scope.match.guestTeamId.goalsFor += $scope.match.guestResults;
        $scope.match.guestTeamId.goalsAgainst += $scope.match.homeResults;
        $scope.match.guestTeamId.Points ++;
        Team.update($scope.match.homeTeamId._id, $scope.match.homeTeamId);
        Team.update($scope.match.guestTeamId._id, $scope.match.guestTeamId);
    }
    else if ($scope.match.homeResults < $scope.match.guestResults) {
        console.log("guest team after finish: ", $scope.match);
        $scope.match.homeTeamId.gamesPlayed ++;
        $scope.match.homeTeamId.gamesLost ++;
        $scope.match.homeTeamId.goalsFor += $scope.match.homeResults;
        $scope.match.homeTeamId.goalsAgainst += $scope.match.guestResults;
        $scope.match.homeTeamId.Points += 0;
        $scope.match.guestTeamId.gamesPlayed ++;
        $scope.match.guestTeamId.gamesWon ++;
        $scope.match.guestTeamId.goalsFor += $scope.match.guestResults;
        $scope.match.guestTeamId.goalsAgainst += $scope.match.homeResults;
        $scope.match.guestTeamId.Points += 3;
        Team.update($scope.match.homeTeamId._id, $scope.match.homeTeamId);
        Team.update($scope.match.guestTeamId._id, $scope.match.guestTeamId);
    }
    modalService.open({
      templateUrl:'partials/globalalert.html',
      controller: 'matchAlertController',
      resolve: {
        message: function() {
          $scope.message = {};
          $scope.message.header = "Avsluta match?";
          $scope.message.msg = "Är du säker på att du vill avsluta matchen?";
          $scope.message.msgBtn = "Avsluta match!";
          $scope.match.finishedGame = true;
          return $scope.message;
        }
      }
    });
  };

  function watchResult_controller(scoreTime, gameId){
    WatchResult(scoreTime, gameId, function(data){
      
      data.forEach(function(newScore){
        scoreTime = new Date(newScore.lastScoreTime).getTime() > new Date(scoreTime).getTime() ? new Date(newScore.lastScoreTime).getTime() : new Date(scoreTime).getTime();
        
        console.log(data);


        console.log("success: ",data);
        // scoreTime = newScore.lastScoreTime;
      });
      watchResult_controller(scoreTime, gameId);
      // data.time is the get request..

    });
  }

  watchResult_controller(0 ,$routeParams.gameId);

}]);
    
app.controller('matchAlertController', ["$scope", "$modalInstance", "message", "$location", "$routeParams", function($scope, $modalInstance, message, $location, $routeParams) {
  $scope.message = message;

  $scope.cancel = function() {
    $modalInstance.close();
    $location.path('/' + $routeParams.region + "/" + $routeParams.division + "/spelschema");
  };

  $scope.redirect = function() {
    $modalInstance.close({msg: "I CLOSED!"});
  };

}]);