app.controller("loginController",
  ["$http", "$scope", "$location", "$route", "Login", "NavTitleChange",
  function($http, $scope, $location , $route, Login, NavTitleChange) {
  NavTitleChange("Logga in");
  $scope.userInfo = {};

  $scope.faultyLogin = $location.path().indexOf("/fel")>=0;

  console.log("faultyLogin: ", $scope.faultyLogin);


  $scope.isLoggedIn = Login.user;
  
  $scope.login = function(){

    Login.login($scope.userInfo, function(data) {
      // console.log("logged in: ", data);
      $location.url(data._id ? "/" : "/loggain/fel");
      $route.reload();
    });

    $scope.userInfo = null;

  };
  
}]);