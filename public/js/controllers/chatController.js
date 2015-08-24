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
  }
  else{
    Match.get({_id:$routeParams.matchId}, function(match){
      var division = match[0].division;
      var regionId = match[0].regionId;
      async($routeParams.matchId, regionId+division);
    });
  }
  
  function async(matchId, divisionId){
    var stopLongpoler = false;
    $scope.chatInfo = {};

    $scope.send = function() {
      $scope.chatInfo.userId = Login.user._id;
      $scope.chatInfo.matchId = matchId.length > 1 ? matchId : null;
      console.log("$scope.chatInfo.matchId: ",$scope.chatInfo.matchId);
      $scope.chatInfo.divisionId = divisionId;
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

      // $scope.chatInfo.matchId = $routeParams.matchId; think this is wrong *_*
      Message.create($scope.chatInfo, function(data) {
        console.log("lolek", data);
        delete $scope.chatInfo.hastag;
      });
    };

    $scope.allMessages = [];
    function longpoller(timestamp) {
      if (stopLongpoler === false){

        console.log( "divisionId: ",divisionId,"matchId: ",matchId);
        var url = "/api/chatlong/"+ divisionId+ "/" + timestamp + "/" + matchId;
        $http.get(url).success(function(data) {
          console.log("data: ",data);
          if (!data.hasOwnProperty("status")) {
            data.forEach(function(msg) {
              timestamp = new Date(msg.date).getTime() > timestamp ? new Date(msg.date).getTime() : timestamp;
              $scope.allMessages.push(msg);
            });
            longpoller(timestamp);
          }
        });
      }
    }





    $scope.activateLongpoller = function(){

      if (stopLongpoler === true){
      console.log("textingtextarea");
        stopLongpoler = false;
        $scope.tags.conversation = "";
        var lastmessage = $scope.allMessages.pop();
        console.log("lastmessage: ", lastmessage);
        $scope.allMessages = [];
        longpoller(0);
      }
    };

    $scope.readHashConversation = function(message){
      $scope.allMessages = [];
      var time = new Date(message.date).getTime();
      Message.get({date:{$gte:time}, matchId:$routeParams.matchId, _populate:"userId"},function(afterHastags){
        afterHastags.forEach(function(theConversation) {
          $scope.tags.conversation = "";
          $scope.allMessages.push(theConversation);
        });
      });
    };

    $scope.yourUser = Login.user;

    //get hastage like this (function like modulus %word%)
    $scope.tags = {};
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
  




    longpoller(0);

  }










}]);
