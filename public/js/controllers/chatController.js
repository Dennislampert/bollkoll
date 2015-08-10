app.controller("chatController", ["$scope", "Chat", "Message", function($scope, Chat, Message){
  $scope.test = Message.get(function() {
  
  });

  $scope.chatInfo = {};
  $scope.send = function() {
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