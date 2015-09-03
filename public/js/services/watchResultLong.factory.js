app.factory("WatchThisResult", function() {

  return function(sendedagr1) {

    var results = [];
    var resultOnView = [];
    function resultwatcher(gameTime) {

      var url = "/api/resultWatch/"+ divisionId+ "/" + gameTime + "/" + matchId;
      $http.get(url).success(function(data) {

        if (!data.hasOwnProperty("status")) {
          data.forEach(function(newResult) {
            gameTime = new Date(newResult.date).getTime() > gameTime ? new Date(msg.date).getTime() : gameTime;
            results.push(newResult);
          });
          resultwatcher(gameTime);
        }
      });
    }
  };
});
