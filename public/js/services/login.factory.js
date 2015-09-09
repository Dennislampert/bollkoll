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
      console.log("TRYING TO LOGIN", credentials)
      $http.post('api/login', credentials).success(function(data) {

        updateObj(data ? data : {}, loginObj.user);
        // console.log("data(login): ", data);
        // console.log("loginObj.user: ", loginObj.user);
        // let the entire app know we are logged in
        $rootScope.$broadcast("login");

        delete window.sessionStorage.loggedOut;
        callback && callback(loginObj.user);
      });
    },
    check: function(callback) {

      if(window.sessionStorage.loggedOut){
        callback && callback(false);
        return;
      }

      $http.get('api/login').success(function(data) {
        updateObj(data ? data : {}, loginObj.user);
        callback && callback(loginObj.user);
      });
    },
    logout: function(callback) {
      $http.delete('api/login').success(function(data) {
        updateObj({}, loginObj.user);

        // set a sessionStorage variable that we are logged out
        window.sessionStorage.loggedOut = true;
        this.user = false;
        // let the entire app know we are logged out
        $rootScope.$broadcast("logout");

        // callback && callback(loginObj.user);
      });
    },
    getCurrentUser: function() {
      if(window.sessionStorage.loggedOut){
        return false;
      }
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
  function checkLogin(){
    loginObj.check(function() {
      if (!loginObj.user._id || window.sessionStorage.loggedOut) {
        // let the entire app know we are logged out
        $rootScope.$broadcast("logout");
      }
      else {
        $rootScope.$broadcast("login");
      }
    });
  }
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
      return;
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

  checkLogin();
  setInterval(checkLogin, 30000);

  return loginObj;

  function objectIsEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
  }
}]);