app.controller("chatController", ["$http", "$scope", "$routeParams", "Chat", "Message", "Match", "Login",
  function($http, $scope, $routeParams, Chat, Message, Match, Login){
  /*$scope.test = Message.get({matchId:$routeParams.matchId , _populate:"userId"},function() {
=======
app.controller("chatController",
  ["$scope", "Chat", "Message", "Login", "NavTitleChange",
  function($scope, Chat, Message, Login, NavTitleChange) {
  NavTitleChange("<MATCHNAMN> chat");
  /*$scope.test = Message.get({_populate:"userId"},function() {
>>>>>>> master
    console.log("s", $scope.test);
  });*/

  $scope.yourUser = Login.user;
  console.log("currentUser: ", $scope.yourUser);

  $scope.chatInfo = {};
  $scope.send = function() {
    $scope.chatInfo.userId = Login.user._id;
    $scope.chatInfo.matchId = $routeParams.matchId;
    console.log("c", $scope.chatInfo);
    Message.create($scope.chatInfo, function(data) {
      console.log("lolek", data);
    });
  };
  $scope.allMessages = [];
  function longpoller(timestamp) {
    console.log("/api/chatlong/"+$routeParams.matchId+"/" + timestamp + "/");
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

