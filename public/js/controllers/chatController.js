app.controller("chatController", ["$http", "$scope", "$routeParams", "Chat", "Message", "Match", "Region", "Login",
  function($http, $scope, $routeParams, Chat, Message, Match, Region, Login){
  /*$scope.test = Message.get({matchId:$routeParams.matchId , _populate:"userId"},function() {
=======
app.controller("chatController",
  ["$scope", "$http", "$routeParams", "Chat", "Message", "Login", "NavTitleChange",
  function($scope, $http, $routeParams, Chat, Message, Login, NavTitleChange) {
  NavTitleChange("<MATCHNAMN> chat");
  /*$scope.test = Message.get({_populate:"userId"},function() {
>>>>>>> master
    console.log("s", $scope.test);
  });*/

  console.log("routeParams: ", $routeParams);
  $scope.yourUser = Login.user;
  console.log("currentUser: ", $scope.yourUser);
  if($routeParams.regionPath){
    Region.get({regionPath:$routeParams.regionPath},function(regionId){
      console.log("dennis: ",regionId);
      async(0, regionId[0]._id + $routeParams.division);
    });
    // $routeParams.matchId = regionId[0]._id + $routeParams.division;
  }else{
    Match.get({_id:$routeParams.matchId}, function(match){
     var division = match[0].division;
     var regionId = match[0].regionId;
      async($routeParams.matchId, regionId+division);
    });
  }
  function async(matchId, divisionId){

    
    $scope.chatInfo = {};
    $scope.send = function() {

      // console.log("regionId: ", regionId[0]._id);
      $scope.chatInfo.userId = Login.user._id;
      $scope.chatInfo.matchId = matchId ? matchId : undefined;
      $scope.chatInfo.divisionId = divisionId;
      console.log("c", $scope.chatInfo);
      Message.create($scope.chatInfo, function(data) {
        console.log("lolek", data);
      });
    };
    $scope.allMessages = [];
    function longpoller(timestamp) {
      var getParam = matchId || divisionId;
      console.log("$routeParams.matchId: ", matchId.constructor, divisionId);
      console.log();
      var url = "/api/chatlong/"+ (getParam === matchId ? getParam : 0)+"/" + timestamp + "/" + (getParam !== matchId ? getParam : '');
      $http.get(url).success(function(data) {

        console.log("data", data);
        if (!data.hasOwnProperty("status")) {
          data.forEach(function(msg) {
            timestamp = new Date(msg.date).getTime() > timestamp ? new Date(msg.date).getTime() : timestamp;
            $scope.allMessages.push(msg);
          });
          longpoller(timestamp);
        }

      });
    }
    longpoller(0);
  }
}]);

