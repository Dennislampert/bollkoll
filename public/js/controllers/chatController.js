app.controller("chatController", ["$scope", "Chat", function($scope, Chat){
$scope.test = Chat.get();

console.log($scope.test);

  // $scope.test = Chat.create({
  // 	message: {
	 //  tag: "tag",
  //     content: "daaaaaamp"
  //   },
  //   user: {
  //     name: "Dampbarn",
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