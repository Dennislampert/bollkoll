app.controller("profileController", ["$scope", "$routeParams", "File", "FileUploader", "Login", "User", function($scope, $routeParams, File, FileUploader, Login, User) {

  // reference(!) to Login.user object
  // (logged in user data)
  //$scope.user = Login.user;
  console.log(Login);

  $scope.files = [];
  $scope.upload = function() {
    FileUploader($scope.files[0]).success(function(data) {
      console.log("saved file, public path: ", data);
      $scope.uploadedFilePath = data;
    });
  };

  console.log("route: ", $routeParams.username);

    User.get({username: $routeParams.username}, function(userprofile){
        $scope.user = userprofile[0];
        File.get({owner:userprofile[0]._id}, function(Getfile){
            $scope.image = Getfile.pop();
            console.log("getfile: ", Getfile.pop());
        console.log("user: ", userprofile);
        });
    });



 //  function checkUser(){

 //    if (Login.user._id){
 //        console.log("userid", Login.user._id);

	//	File.get({owner:Login.user._id}, function(Getfile){
	//		$scope.image = Getfile.pop();
	//		console.log("getfile: ", Getfile.pop());

	//	});
	// }else{
 //        setTimeout(checkUser, 100);
 //    }
 //  }
 //  checkUser();

}]);