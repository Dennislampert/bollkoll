app.controller("registerController",
  ["$scope", "$http", "User", "$location", "NavTitleChange", "modalService",
  function($scope, $http, User, $location, NavTitleChange, modalService) {
  NavTitleChange("Registrera");
  $scope.userInfo = {};
  $scope.emailUniqe = true;
  $scope.usernameUniqe = true;

  $scope.register = function() {
    $scope.emailUniqe = true;
    $scope.usernameUniqe = true;
    console.log("gooo");
    
    if ($scope.userInfo.password != $scope.userInfo.passwordCompare) {
      modalService.open({
        templateUrl: 'partials/globalalert.html',
        controller: 'registerAlertController',
        resolve: {
          message: function() {
            $scope.message = {};
            $scope.message.header = "Registrering misslyckades!";
            $scope.message.msg = "Lösenorden matchade inte varandra, var god och försök igen!";
            $scope.message.msgBtn = "Försök igen";
            return $scope.message;
          }
        }
      });
      $scope.userInfo.password = "";
      $scope.userInfo.passwordCompare = "";
    }

    // check if userName is registered
    User.get({username:$scope.userInfo.username},function(username){
      console.log("username:", username);
      // check if email is registered
      User.get({email:$scope.userInfo.email},function(email){
        console.log("email:", email);
        if(username.length > 0){
          $scope.usernameUniqe = false;
          console.log("Username exists");
          //$scope.userNameAlreadyRegistered = true;
          modalService.open({
            templateUrl: 'partials/globalalert.html',
            controller: 'registerAlertController',
            resolve: {
              message: function() {
                $scope.message = {};
                $scope.message.header = "Registrering misslyckades!";
                $scope.message.msg = "Användarnamnet är redan taget, var god och välj ett annat!";
                $scope.message.msgBtn = "Försök igen";
                return $scope.message;
              }
            }
          });
        }
        if(email.length > 0){
          $scope.emailUniqe = false;
          modalService.open({
            templateUrl: 'partials/globalalert.html',
            controller: 'registerAlertController',
            resolve: {
              message: function() {
                $scope.message = {};
                $scope.message.header = "Registrering misslyckades!";
                $scope.message.msg = "Email-adressen är redan taget, var god och välj ett annat!";
                $scope.message.msgBtn = "Försök igen";
                return $scope.message;
              }
            }
          });
        }
        if ($scope.userInfo.password === $scope.userInfo.passwordCompare && $scope.emailUniqe === true && $scope.usernameUniqe === true ) {
          User.create($scope.userInfo, function(data) {
            modalService.open({
              templateUrl: 'partials/globalalert.html',
              controller: 'registerAlertController',
              resolve: {
                message: function() {
                  $scope.message = {};
                  $scope.message.header = "Registrering lyckades!";
                  $scope.message.msg = "Nu kan du logga in! ";
                  $scope.message.msgBtn = "Logga in";
                  return $scope.message;
                }
              },
            });
            console.log("rr", data);
            $location.url("/loggain");
          });
        }
      });
    });
  };
}]);

app.controller('registerAlertController', ["$scope", "$modalInstance", "message", function($scope, $modalInstance, message) {
  $scope.message = message;

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };

  $scope.redirect = function() {
    $modalInstance.close({msg: "I CLOSED!"});
  };
}]);