app.controller("chatController", ["$http", "$scope", "$routeParams", "$location", "Chat", "Message", "Match", "Region", "Login","$timeout","$anchorScroll","modalService",
  function($http, $scope, $routeParams, $location, Chat, Message, Match, Region, Login, $timeout, $anchorScroll, modalService){
  $scope.displayedMsgs = [];
  var scroll = {
    gotoBottom: function() {
      $timeout(function() {
        document.querySelector(".chat").scrollTop = 1000000000000000000;
      });
    }
  };
  var globalRegionId;
  var globalRegionName;
  $scope.yourUser = Login.user;
  window.user = Login.user;
  if($routeParams.regionPath){
    Region.get({regionPath:$routeParams.regionPath},function(regionId){
      async(0, regionId[0]._id + $routeParams.division);
      globalRegionId = regionId[0]._id;
      globalRegionName = regionId[0].regionName;
    });
  }
  else{
    Match.get({_id:$routeParams.matchId}, function(match){
      var division = match[0].division;
      var regionId = match[0].regionId;
      async($routeParams.matchId, regionId+division);
    });
  }
  
  function async(matchId, divisionId){
    $scope.readSearch = false;
    $scope.chatInfo = {};
    $scope.send = function() {
      $scope.chatInfo.userId = Login.user._id;
      $scope.chatInfo.userName = Login.user.username;
      $scope.chatInfo.matchId = matchId.length > 1 ? matchId : null;
      $scope.chatInfo.divisionId = divisionId;
      $scope.chatInfo.regionId = globalRegionId;
      $scope.chatInfo.regionName = globalRegionName;
      $scope.chatInfo.division = $routeParams.division;
      var hashOrgArray = "";
      hashOrgArray = $scope.chatInfo.content.match(/#[a-zA-ZäöåÄÖÅ0-9]*/g);
      // filter out duplicates in array.. By Nodebite
      if (hashOrgArray){
        Array.prototype.hashOrgArray = function(){
          var a = this;
          return a.filter(function(val,index){
            return a.indexOf(val) == index && val.length > 1;
          });
        };
        $scope.chatInfo.hastag = hashOrgArray.hashOrgArray();
      }
      // $scope.chatInfo.matchId = $routeParams.matchId; think this is wrong *_*
      Message.create($scope.chatInfo, function(data) {
        delete $scope.chatInfo.hastag;
        $scope.chatInfo.content = "";
      });
    };
    var scrolledToAnchor = false;
    $scope.allMessages = [];
    $scope.displayedMsgs = $scope.allMessages;
    function longpoller(timestamp) {
      var url = "/api/chatlong/"+ divisionId+ "/" + timestamp + "/" + matchId;
      $http.get(url).success(function(data) {
        if (!data.hasOwnProperty("status")) {
          data.forEach(function(msg) {
            timestamp = new Date(msg.date).getTime() > timestamp ? new Date(msg.date).getTime() : timestamp;
            $scope.allMessages.push(msg);
          });
          if (data.length >0){
            scroll.gotoBottom();
          }
          longpoller(timestamp);
        }
      });
    }
    $scope.activateLongpoller = function(){
      if ($scope.readSearch === true){
        $scope.readSearch = false;
        $scope.tags.conversation = "";
        // async(matchId, divisionId);
        $scope.displayedMsgs = $scope.allMessages;
      }
    };
    $scope.readHashConversation = function(message){
      $scope.searchMessages = [];
      var time = new Date(message.date).getTime();
      Message.get({date:{$gte:time}, matchId:$routeParams.matchId, _populate:"userId"},function(afterHastags){
        afterHastags.forEach(function(theConversation) {
          $scope.tags.conversation = "";
          $scope.searchMessages.push(theConversation);
        });
        $scope.displayedMsgs = $scope.searchMessages;
      });
    };
    //get hastage like this (function like modulus %word%)
    $scope.tags = {};
    $scope.tagSearch = function(searchTag){
      $scope.readSearch = true;
      $scope.searchMessages = [];
      Message.get({hastag:searchTag, matchId:$routeParams.matchId, _populate:"userId"},function(hastags){
        hastags.forEach(function(hashtag) {
          $scope.tags.conversation = "läs mer";
          $scope.searchMessages.push(hashtag);
        });
        $scope.displayedMsgs = $scope.searchMessages;
        if(!$scope.displayedMsgs[0]) {
          event.preventDefault();
          modalService.open({
            templateUrl:'partials/globalalert.html',
            controller: 'uploadAlertController',
            resolve: {
              message: function() {
                $scope.message = {};
                $scope.message.header = "Inget resultat";
                $scope.message.msg = "Du fick inget resultat på din sök. Var god och sök igen.";
                $scope.message.msgBtn = "Stäng";
                return $scope.message;
              }
            }
          });
          //event.stopPropagation();
          return;
        } 
      });
    };
  
    longpoller(0);
  }
}]);