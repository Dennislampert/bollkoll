app.controller("loginController",
  ["$http", "$scope", "$location", "$route", "Login", "NavTitleChange", "modalService",
  function($http, $scope, $location , $route, Login, NavTitleChange, modalService) {
  NavTitleChange("Logga in");
  $scope.userInfo = {};

  $scope.faultyLogin = $location.path().indexOf("/fel")>=0;



  $scope.isLoggedIn = Login.user;
  
  $scope.login = function(){

    Login.login($scope.userInfo, function(data) {
      $location.url(data._id ? "/" : "/loggain/fel");
      $route.reload();
      if (!data._id) {
        modalService.open({
        templateUrl: 'partials/globalalert.html',
        controller: 'loginAlertController',
        resolve: {
          message: function() {
            $scope.message = {};
            $scope.message.header = "Inloggningen misslyckades!";
            $scope.message.msg = "Användarnamnet eller lösenordet stämde inte, var god och försök igen!";
            $scope.message.msgBtn = "Försök igen";
            return $scope.message;
          }
        }
        });
      $scope.userInfo = null;
      }
    });

  };
  
}]);

app.controller('loginAlertController', ["$scope", "$modalInstance", "message", function($scope, $modalInstance, message) {
  $scope.message = message;

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };

  $scope.redirect = function() {
    $modalInstance.close({msg: "I CLOSED!"});
  };
}]);