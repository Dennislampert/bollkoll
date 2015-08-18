app.controller("chatController", ["$scope", "Chat", "Message", "Login", "Hashtag", function($scope, Chat, Message, Login, Hashtag){


  $scope.test = Message.get({_populate:"userId"},function() {
    console.log("s", $scope.test);
  });

  $scope.yourUser = Login.user;
  console.log("currentUser: ", $scope.yourUser);

  $scope.chatInfo = {};
  $scope.send = function() {
    $scope.chatInfo.userId = Login.user._id;
    $scope.chatInfo.hastag = $scope.chatInfo.content.match(/#[a-zA-ZäöåÄÖÅ]*/g);
    console.log("c", $scope.chatInfo);
    Message.create($scope.chatInfo, function(data) {
      console.log("lolek", data);
    });
  };

}]);

// $http.get("/chat/"+$routeParams +"").then(parseData);
