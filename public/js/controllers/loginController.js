app.controller("loginController", ["$http","$scope","$location","User", function($http,$scope,$location,User){



  $scope.userInfo = {};
  $scope.login = function(){

    $http.post('/api/login',$scope.userInfo).success(function(data){
      console.log("Logedin info: ",data);

    });
  };
  
}]);