app.controller("alertBoxController", ["$scope", "$log", "Login", "modalService", function($scope, $log, Login, modalService) {
  if(!Login.user._id) {

    $scope.openModal = function (size) {

      var modalInstance = modalService.open({size:size});
    };
  }

}]);

app.controller('ModalInstanceCtrl',["$scope", "$rootScope", "$modalInstance", "$location", function ($scope, $rootScope, $modalInstance, $location) {

  $scope.redirect = function () {
    $modalInstance.close();
    $location.url("/loggain");
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
    var history = [];

    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });

    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.url(prevUrl);
    };
  };
}]);

//function to open the modal if no user

// $scope.$on('$routeChangeSuccess', function() {

//     if(!Login.user._id) {
//       modalService.open({size:300});
//     }
//   });


// resolve function to load the user before the app kicks in

// resolve: {
//           getUser: ['$http', 'Login', function ($http, Login) {
//             $http.get('api/login').then(function(user) {
//               return user;
//             });
//           }]
//       }