app.controller("chatController",
  ["$scope", "Chat", "Message", "Login", "NavTitleChange","Hashtag",
  function($scope, Chat, Message, Login, NavTitleChange, Hashtag) {
  NavTitleChange("<MATCHNAMN> chat");
  /*$scope.test = Message.get({_populate:"userId"},function() {
    console.log("s", $scope.test);
  });*/

  $scope.yourUser = Login.user;
  console.log("currentUser: ", $scope.yourUser);

  $scope.chatInfo = {};
  $scope.send = function() {
    $scope.chatInfo.userId = Login.user._id;

    $scope.chatInfo.hastag = $scope.chatInfo.content.match(/#[a-zA-ZäöåÄÖÅ]*/g);
    $scope.chatInfo.matchId = $routeParams.matchId;

    console.log("c", $scope.chatInfo);
    Message.create($scope.chatInfo, function(data) {
      console.log("lolek", data);
    });
  };
  $scope.allMessages = [];
  function longpoller(timestamp) {
    $http.get("/api/chatlong/"+$routeParams.matchId+"/" + timestamp + "/").success(function(data) {
      console.log("data", data);
      data.forEach(function(msg) {
        timestamp = new Date(msg.date).getTime() > timestamp ? new Date(msg.date).getTime() : timestamp;
        $scope.allMessages.push(msg);
      });

      longpoller(timestamp);
    });
  }
  longpoller(0);

}]);