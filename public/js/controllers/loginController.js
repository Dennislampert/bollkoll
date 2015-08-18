app.controller("loginController",
  ["$http", "$scope", "$location", "Login", "NavTitleChange",
  function($http, $scope, $location ,Login, NavTitleChange) {
  NavTitleChange("Logga in");
  $scope.userInfo = {};

  $scope.isLoggedIn = Login.user;
  
  $scope.login = function(){

    Login.login($scope.userInfo, function(data) {
      console.log("logged in: ", data);
      $location.url("/");
    });

  };
  
}]);