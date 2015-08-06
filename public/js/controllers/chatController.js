app.controller("chatController", ["$scope", "Chat", function($scope, Chat){
  $scope.test = Chat.get(function() {
    console.log("d", $scope.test)
  });


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