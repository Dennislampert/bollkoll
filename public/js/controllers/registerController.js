app.controller("registerController",
  ["$scope", "$http", "User", "$location", "NavTitleChange", "modalService",
  function($scope, $http, User, $location, NavTitleChange, modalService) {
  NavTitleChange("Registrera");
  $scope.userInfo = {};
  $scope.register = function() {
    if ($scope.userInfo.password === $scope.userInfo.passwordCompare) {
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
        },
      });
    }
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