app.controller("matchStatusController", ["$scope", "$routeParams", "Match", "Region", "Team", "Message", "Login", function($scope, $routeParams, Match, Region, Team, Message, Login){

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
        $scope.chatInfo.status = true;

        console.log("blabla", $scope.chatInfo);

        Message.create($scope.chatInfo, function(resultsInChat) {
          console.log("resultsInChat", resultsInChat);
        });
	};


    $scope.increaseGoals = function (match,prop){match[prop]++;};
    $scope.decreaseGoals = function (match,prop){match[prop]--;};
    $scope.decreaseDisallowed = function(x){return x < 1;};
    $scope.increaseDisallowed = function(x){return x > 30;};





    $scope.allMessages = [];
    $scope.displayedMsgs = $scope.allMessages;
    // the long-poler shall only run during the  day that the match is being played..
    function longpoller2(timestamp) {
      console.log( "divisionId: ",divisionId,"matchId: ",matchId);
      var url = "/api/chatlong/"+ divisionId+ "/" + timestamp + "/" + matchId;
      $http.get(url).success(function(data) {
        console.log("data: ",data);
        if (!data.hasOwnProperty("status")) {
          data.forEach(function(msg) {
            timestamp = new Date(msg.date).getTime() > timestamp ? new Date(msg.date).getTime() : timestamp;

            $scope.allMessages.push(msg);
          });
          goToBottom();
          longpoller2(timestamp);
        }
      });
    }


    // $scope.chatInfo = {};
    //   $scope.send = function() {
    //     $scope.chatInfo.userId = Login.user._id;
    //     console.log("c", $scope.chatInfo);
    //     Message.create($scope.chatInfo, function(data) {
    //       console.log("lolek", data);
    //     });
    //   };
}]);