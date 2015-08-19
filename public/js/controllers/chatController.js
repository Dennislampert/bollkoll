app.controller("chatController",
  ["$scope", "$http","$routeParams", "Chat", "Message", "Login", "NavTitleChange",
  function($scope, $http, $routeParams, Chat, Message, Login, NavTitleChange) {
  NavTitleChange("<MATCHNAMN> chat");
  /*$scope.test = Message.get({_populate:"userId"},function() {
    console.log("s", $scope.test);
  });*/

  $scope.yourUser = Login.user;
  console.log("currentUser: ", $scope.yourUser);

  $scope.chatInfo = {};

  $scope.send = function() {
    $scope.chatInfo.userId = Login.user._id;

    var hashOrgArray = $scope.chatInfo.content.match(/#[a-zA-ZäöåÄÖÅ0-9]*/g);

    // filter out duplicates in array.. By Nodebite
    if (hashOrgArray){

      Array.prototype.hashOrgArray = function(){
        var a = this;
        return a.filter(function(val,index){
          return a.indexOf(val) == index && val.length>1;
        });
      };

      $scope.chatInfo.hastag = hashOrgArray.hashOrgArray();
      console.log("hastags: ", $scope.chatInfo.hastag);

    }

    $scope.chatInfo.matchId = $routeParams.matchId;
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



  var openOrColse = false;
  //get hastage like this (function like modulus %word%)
  $scope.openTagSearch = function(){
    // if open true maki it false to close.. and oposite
    openOrColse = openOrColse ? false : true;
    console.log("openOrColse: ",open);
    $scope.open = openOrColse;
    return openOrColse;
  };

  $scope.tags = {};
  $scope.findHastags = function(){
    $scope.allMessages = [];
    Message.get({hastag:$scope.tags.searchTag, matchId:$routeParams.matchId, _populate:"userId"},function(hastags){
      hastags.forEach(function(msg) {
        msg.conversation = "läs mer";
        $scope.allMessages.push(msg);
      });
    });
  };







}]);





