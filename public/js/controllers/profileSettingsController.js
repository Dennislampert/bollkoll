app.controller("profileSettingsController",
  ["$scope", "$http", "$location", "$routeParams", "User", "FileUploader", "File", "Login", "NavTitleChange",
  function($scope, $http, $location, $routeParams, User, FileUploader, File, Login, NavTitleChange) {
  NavTitleChange($routeParams.username + "s profilinställningar");
  // reference(!) to Login.user object
  // (logged in user data)
  $scope.user = Login.user;

  $scope.$on("cropme:done", function(ev, result, canvasEl) {
    User.get({username: $scope.user._id}, function(userprofile){
      FileUploader(result).success(function(data) {
        console.log("saved files, public path: ", data);
        $scope.uploadedFilePath = data;
      });
    });
      // console.log("users! ", $scope.user);
      // console.log("ev: ", ev);
      console.log("result: ", result);
      // console.log("result.croppedImage: ", result.croppedImage);
      // console.log("blobby: ", Blob);
      // console.log("canvasEl: ", canvasEl);
      // console.log("$scope: ", $scope);
  });

  



}]);