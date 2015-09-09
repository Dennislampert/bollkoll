app.factory("WatchResult", ["$http", function($http) {
  
  return function(scoreTime, gameId, callback) {
    resultwatcher(scoreTime, gameId, callback);


    function resultwatcher(scoreTime, gameId, callback) {
      var url = "/api/resultWatch/" + scoreTime + "/" + gameId;
      console.log("scoreTime: ",scoreTime);
      $http.get(url).success(function(data) {

        callback(data);
      });
      return;
    }
  };
}]);