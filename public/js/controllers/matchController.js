app.controller("matchController",
  ["$scope", "$routeParams", "WatchResult", "Match", "Region", "Team", "Login", "NavTitleChange", "$location",
  function($scope, $routeParams, WatchResult, Match, Region, Team, Login, NavTitleChange, $location) {
  // NavTitleChange("Spelschema för " + $routeParams.region + " division " + $routeParams.division);

  var regionAndDivisionId = {};
  var regionName;

  $scope.saveIT = function() {
    Match.create({
      homeTeamId: $scope.homeTeam._id,
      // homeTeamName: ,
      guestTeamId: $scope.guestTeam._id,
      // guestTeamName: ,
      place: $scope.match.place,
      date: $scope.match.date,
      time: $scope.match.time,
      homeResults: 0,
      guestResults: 0,
      finishedGame: 0,
      regionId: regionAndDivisionId.regionId,
      regionName: regionName,
      division: regionAndDivisionId.division
    });
  };



  var time = new Date();
  var stringTime = ""+time+"";
  var month = time.getMonth();
  var splitTime = stringTime.split(" ");
  var date = ""+splitTime[3]+"-"+month+"-"+splitTime[2];


  $scope.dateCompare = function(date,condition){
    
    // Split textdate
    date = date.split("-").map(function(x){return x/1;});

    // Today 
    var today = new Date();
    today = [today.getFullYear(),today.getMonth()+1,today.getDate()];

    // Convert from array of numbers to a large number
    today = today[0]*10000 + today[1]*100 + today[2];
    date = date[0]*10000 + date[1]*100 + date[2];

    // Check according to condition
    return (condition == "today" && date == today) ||
      (condition == "beforeToday" && date < today) ||
      (condition == "afterToday" && date > today);
  };


  var currentId;
  $scope.currentlyShownResult = function(idToCheck){
    return idToCheck != currentId;
  };

  $scope.toggleID = function(clickedId){
    watchResult_controller(0,clickedId);
    currentId = currentId == clickedId ? false : clickedId;
  };

  // collection.Region hämta regionPath som är lika med routeParams.region
  Region.get({regionPath: $routeParams.region}, function(answer){

    if (!answer.length) {
      // ABORT IF NO REGION FOUND (FOR NOW)
      alert("NO REGION FOUND :/");
      return;

    }
    NavTitleChange("Spelschema för " + answer[0].regionName + " division " + $routeParams.division);
    regionAndDivisionId.regionId = answer[0]._id;
    regionName = answer[0].regionName;
    regionAndDivisionId.division = $routeParams.division;
    $scope.div = $routeParams.division;
    $scope.regionId = answer[0]._id;

    Team.get(
      regionAndDivisionId, function(teams){
        $scope.homeTeams = teams;
        $scope.guestTeams = teams;
        // Populate by several properties by separating them with space in string
        regionAndDivisionId._populate = "homeTeamId guestTeamId";
        
        Match.get(
          regionAndDivisionId, function(games){
            games.regionPath = $routeParams.region;
            $scope.date = date.split("-").join("");
            $scope.games = games;
            window.games = games;
            for (var i = 0; i < games.length; i++) {
              $scope.finishedGame = games[i].finishedGame;
            }
            $scope.playedGames = "";
            
            if ($routeParams.matchId) {
              scrollToAnchor();
            }
          }
        );
      }
    );
  });
  
  function scrollToAnchor() {
    setTimeout(function() {
      var element = app.getElementOffset("#id_"+$routeParams.matchId);
      window.scrollTo(0,element.top-50);
    },500);
  }



  function watchResult_controller(scoreTime, gameId){
    WatchResult(scoreTime, gameId, function(data){
      
      data.forEach(function(newScore){
        scoreTime = new Date(newScore.lastScoreTime).getTime() > new Date(scoreTime).getTime() ? new Date(newScore.lastScoreTime).getTime() : new Date(scoreTime).getTime();
        for (var i = 0; i < $scope.games.length; i++) {
          if ($scope.games[i]._id === gameId){
            $scope.games[i].homeResults = data[0].homeResults;
            $scope.games[i].guestResults = data[0].guestResults;
          }
        }


      });
      watchResult_controller(scoreTime, gameId);
      // data.time is the get request..

    });
  }




}]);
