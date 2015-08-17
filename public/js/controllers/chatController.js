app.controller("chatController", ["$scope", "$routeParams", "Chat", "Message", "Match", "Login", 
  function($scope, $routeParams, Chat, Message, Match, Login){
  $scope.test = Message.get({matchId:$routeParams.gameid},{_populate:"userId"},function() {
    console.log("s", $scope.test);
  });

  $scope.yourUser = Login.user;
  console.log("currentUser: ", $scope.yourUser);

  $scope.chatInfo = {};
  $scope.send = function() {
    $scope.chatInfo.userId = Login.user._id;
    $scope.chatInfo.gameid = $routeParams.gameid;
    console.log("c", $scope.chatInfo);
    Message.create($scope.chatInfo, function(data) {
      console.log("lolek", data);
    });
  };

}]);

// $http.get("/chat/"+$routeParams +"").then(parseData);
