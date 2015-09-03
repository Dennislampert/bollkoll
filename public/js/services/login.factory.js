app.factory("Login",["$http", "$rootScope", "$location", "$route", "modalService", function($http, $rootScope, $location, $route, modalService){

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
        // console.log("data(login): ", data);
        // console.log("loginObj.user: ", loginObj.user);
        // let the entire app know we are logged in
        $rootScope.$broadcast("login");

        callback && callback(loginObj.user);
      });
    },
    check: function(callback) {
      $http.get('api/login').success(function(data) {
        updateObj(data ? data : {}, loginObj.user);
        // console.log("data(check): ", data);
        callback && callback(loginObj.user);
      });
    },
    logout: function(callback) {
      $http.delete('api/login').success(function(data) {
        updateObj({}, loginObj.user);
        
        // let the entire app know we are logged out
        $rootScope.$broadcast("logout");

        callback && callback(loginObj.user);
      });
    },
    getCurrentUser: function() {
      if (!objectIsEmpty(loginObj.user)) {
        return loginObj.user;
      }
      else {
        return false;
      }
    },
    protectRoute: function() {
      
    }
 };
  // check if logged in every 30 seconds
  loginObj.check(function() {
    if (!loginObj.user._id) {
      // let the entire app know we are logged out
      $rootScope.$broadcast("logout");
    }
  });
  setInterval(function() {
    loginObj.check(function(){
    if (!loginObj.user._id) {
      // let the entire app know we are logged out
      $rootScope.$broadcast("logout");
    }
    });
  }, 30000);
  console.log('route', $route);

  function waitForRoute(callback) {
    if (!$route.current) {
      setTimeout(function() {
        waitForRoute(callback);
      }, 50);
      return;
    }
    callback();
  }

  waitForRoute(function() {
    if (
      !loginObj.user._id &&
      $route.current.$$route.loggedIn
    ) {
      //event.preventDefault();
      //event.stopPropagation();
      $location.path('/');
      return;
    }
  });

  $rootScope.$on('$routeChangeStart', function(event, next) {
    console.log('route', $route);
    if (
      !loginObj.user._id &&
      next.$$route.loggedIn
    ) {
      event.preventDefault();
      modalService.open({
        templateUrl:'partials/globalalert.html',
        controller: 'uploadAlertController',
        resolve: {
          message: function() {
            $rootScope.message = {};
            $rootScope.message.header = "Du måste vara inloggad";
            $rootScope.message.msg = "Du behöver vara inloggad för att komma vidare. Var god och logga in.";
            $rootScope.message.msgBtn = "Stäng";
            return $rootScope.message;
          }
        }
      });
      //event.stopPropagation();
      $location.path('/');
      return;
    }

  });


  return loginObj;

  function objectIsEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
  }
}]);