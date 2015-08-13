app.factory("Login",["$http", "$rootScope", "$location", function($http, $rootScope, $location){

  // a function to empty and fill an object
  // without loosing the reference to it
  function updateObj(inObj, outObj) {
    for (var i in outObj) {
      delete outObj[i];
    }

    for (var i in inObj) {
      outObj[i] = inObj[i];
    }
  }

  var loginObj = {
    user: {},
    login: function(credentials, callback) {
      $http.post('api/login', credentials).success(function(data) {
        updateObj(data ? data : {}, loginObj.user);
        callback(loginObj.user);
      });
    },
    check: function(callback) {
      $http.get('api/login').success(function(data) {
        updateObj(data ? data : {}, loginObj.user);
        callback(loginObj.user);
      });
    },
    logout: function(callback) {
      $http.delete('api/login').success(function(data) {
        updateObj({}, loginObj.user);
        callback(loginObj.user);
      });
    }
  };

  loginObj.check(function() {});
  // check if logged in every 5 seconds
  setInterval(function() {
    loginObj.check(function(){});
  }, 5000);

  $rootScope.$on('$routeChangeStart', function (event, next) {
    var userAuthenticated = loginObj.user;
    /* Check if the user is logged in */
    console.log("next", next.$$route.loggedIn);
    if (!userAuthenticated._id && !next.loggedIn) {
      /* You can save the user's location to take him back to the same page after he has logged-in */
      $rootScope.savedLocation = $location.url();

      $location.path('/');
    }
  });

  return loginObj;
}]);