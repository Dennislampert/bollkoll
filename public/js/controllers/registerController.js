app.controller("registerController",
  ["$scope", "$http", "User", "$location", "NavTitleChange", "modalService",
  function($scope, $http, User, $location, NavTitleChange, modalService) {
  NavTitleChange("Registrera");
  $scope.userInfo = {};
  $scope.register = function() {
    if ($scope.userInfo.password === $scope.userInfo.passwordCompare && $scope.userInfo._id) {
      User.create($scope.userInfo, function(data) {
        modalService.open({
          templateUrl: 'partials/globalalert.html',
          controller: 'registerAlertController',
          resolve: {
              message: function() {
                $scope.message = {};
                $scope.message.header = "Registrering lyckades!";
                $scope.message.msg = "Vänligen logga in igen! ";
                $scope.message.msgBtn = "Tillbaka till logga in";
                return $scope.message;
              }
            },
        });
        console.log("rr", data);
        $location.url("/loggain");
      });
    }
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
    }
    $scope.$watch("userInfo.username",function(newVal, oldVal){

      if(!newVal){return;}
      // check if userName is registered
      User.get({username:newVal},function(listOfUsers){
        console.log("listOfUsers:", listOfUsers);
        if(listOfUsers.length > 0){
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
      });
    });

    $scope.$watch("userInfo.email",function(newVal,oldVal){
      
      if(!newVal){return;}
      // check if email is registered
      User.get({email:newVal},function(listOfUsers){
        //If users with that email exists
        if(listOfUsers.length > 0){
          
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