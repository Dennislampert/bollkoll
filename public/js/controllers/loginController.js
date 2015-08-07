app.controller("loginController", ["$scope","$location","User", function($scope,$location,User){



  $scope.userInfo = {};
  $scope.login = function(){

    $http.post('/api/login',$scope.userInfo).success(function(data){
      consoel.log("Logedin info: ",data);

    });
  };

  // User.create({
  //   username: "dennis",
  //   password: "lalala",
  //   fname:"Dennis",
  //   lname:"Lampert",
  //   email:"dennis@lampert.se",
  //   picturePath:"/dennis/hej"

  // });

}]);