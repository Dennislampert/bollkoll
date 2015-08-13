app.controller("chatController", ["$scope", "Chat", "Message", "Login", function($scope, Chat, Message, Login){
  $scope.test = Message.get({_populate:"userId"},function() {
    console.log("s", $scope.test);
  });
  $scope.yourUser = Login.user
  console.log("currentUser: ", $scope.yourUser);
  $scope.chatInfo = {};
  $scope.send = function() {
    $scope.chatInfo.userId = Login.user._id;
    console.log("c", $scope.chatInfo);
    Message.create($scope.chatInfo, function(data) {
      console.log("lolek", data);
    });
  }

  // $scope.test = Chat.create({
  // 	message: {
	 //  tag: "tag",
  //     content: "fakk yu"
  //   },
  //   user: {
  //     userId: "132213321",
  //     name: "dkdk",
  //     loginProtection: true
  //   },
  //   status: {
  //     goal: false,
  //     endedGame: false
  //   },
  //   matchId: "41241"
  // }, function() {
  //   $scope.test = Chat.get();
  // });

}]);