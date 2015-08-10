app.factory("Login",["$http",function($http){
  var currentUser = false;

  var loginObject = {
    user: function() { return currentUser; },
    login: function(userInfo, callback) {
      $http.post('api/login', userInfo).success(function(user) {
        currentUser = user ? user : false;
        callback(currentUser);
      });
    },
    check: function(callback) {
      $http.get('api/login').success(function(user) {
        currentUser = user ? user : false;
        callback(currentUser);
      });
    },
    logout: function(callback) {
      $http.delete('api/login').success(function(data) {
        currentUser = false;
        callback(currentUser);
      });
    }
  };

  // check if logged in every 5 seconds
  setInterval(function() {
    loginObject.check(function(){});
  }, 5000);

  return loginObject;
}]);