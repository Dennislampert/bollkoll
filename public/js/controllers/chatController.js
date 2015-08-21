app.controller("chatController", ["$http", "$scope", "$routeParams", "Chat", "Message", "Match", "Login",
  function($http, $scope, $routeParams, Chat, Message, Match, Login){
  /*$scope.test = Message.get({matchId:$routeParams.matchId , _populate:"userId"},function() {
=======
app.controller("chatController",
  ["$scope", "$http","$routeParams", "Chat", "Message", "Login", "NavTitleChange",
  function($scope, $http, $routeParams, Chat, Message, Login, NavTitleChange) {
  NavTitleChange("<MATCHNAMN> chat");
  /*$scope.test = Message.get({_populate:"userId"},function() {
>>>>>>> master
    console.log("s", $scope.test);
  });*/
  $scope.activateLongpoller = function(){
    if (stopLongpoler === true){
      console.log(" stopLongpoler was true");
      stopLongpoler = false;
      $scope.tags.conversation = "";
      $scope.allMessages = [];
      longpoller(0);

    }
  };

  $scope.readHashConversation = function(message){
    $scope.allMessages = [];
    var time = new Date(message.date).getTime();
    console.log("time: ",time);
    Message.get({date:{$gte:time}, matchId:$routeParams.matchId, _populate:"userId"},function(afterHastags){
      afterHastags.forEach(function(theConversation) {
        console.log("gte: ",theConversation);
        $scope.tags.conversation = "";
        $scope.allMessages.push(theConversation);
      });
    });

  };


  $scope.yourUser = Login.user;
  console.log("currentUser: ", $scope.yourUser);

  $scope.chatInfo = {};
  var stopLongpoler = false;

  $scope.send = function() {
    $scope.chatInfo.userId = Login.user._id;
    var hashOrgArray = "";
    hashOrgArray = $scope.chatInfo.content.match(/#[a-zA-ZäöåÄÖÅ0-9]*/g);

    // filter out duplicates in array.. By Nodebite
    if (hashOrgArray){

      Array.prototype.hashOrgArray = function(){
        var a = this;
        return a.filter(function(val,index){
          return a.indexOf(val) == index && val.length>1;
        });
      };
      $scope.chatInfo.hastag = hashOrgArray.hashOrgArray();
    }

    $scope.chatInfo.matchId = $routeParams.matchId;
    Message.create($scope.chatInfo, function(data) {
      console.log("lolek", data);
      delete $scope.chatInfo.hastag;
    });
  };
  $scope.allMessages = [];
  function longpoller(timestamp) {
    if (stopLongpoler === false){
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

  }
  longpoller(0);

  var openOrColse = false;
  //get hastage like this (function like modulus %word%)
  $scope.tagSearch = function(searchTag){
    stopLongpoler = true;
    $scope.allMessages = [];
    Message.get({hastag:searchTag, matchId:$routeParams.matchId, _populate:"userId"},function(hastags){
      hastags.forEach(function(hashtag) {
        $scope.tags.conversation = "läs mer";
        $scope.allMessages.push(hashtag);
      });
    });
  };

  $scope.tags = {};
  $scope.findHastags = function(){
    stopLongpoler = true;
    $scope.allMessages = [];
    Message.get({hastag:$scope.tags.searchTag, matchId:$routeParams.matchId, _populate:"userId"},function(hastags){
      hastags.forEach(function(hashtag) {
        $scope.tags.conversation = "läs mer";
        $scope.allMessages.push(hashtag);
      });
    });
  };







}]);





