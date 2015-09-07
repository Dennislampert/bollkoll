app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", "Message", "Login", "WatchResult",
function($scope, $routeParams, Match, Region, Team, Message, Login, WatchResult){
  
  var divisionId;
  Region.get({regionPath: $routeParams.region},function(regionId){

    console.log("regionId: ",regionId);
    divisionId = regionId[0]._id +""+ $routeParams.division;
  });

  $scope.match = Match.getById({
    _id: $routeParams.gameId,
    _populate: "homeTeamId guestTeamId"
  },duplicateResults);














  function watchResult_controller(scoreTime, gameId){
    WatchResult(scoreTime, gameId, function(data){
      
      data.forEach(function(newScore){
        scoreTime = new Date(newScore.lastScoreTime).getTime() > new Date(scoreTime).getTime() ? new Date(newScore.lastScoreTime).getTime() : new Date(scoreTime).getTime();
        


        console.log("success: ",data);
        // scoreTime = newScore.lastScoreTime;
      });
      watchResult_controller(scoreTime, gameId);
      // data.time is the get request..

    });
  }

  watchResult_controller(0 ,$routeParams.gameId);















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


}]);