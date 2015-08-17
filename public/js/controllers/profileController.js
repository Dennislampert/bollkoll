app.controller("profileController", ["$scope", "$http", "$location", "FileUploader", "Login", function($scope, $http, $location, FileUploader, Login) {

  // reference(!) to Login.user object
  // (logged in user data)
  $scope.user = Login.user;

  $scope.files = [];
  $scope.upload = function() {
    FileUploader($scope.files[0]).success(function(data) {
      console.log("saved file, public path: ", data);
      $scope.uploadedFilePath = data;
    });
  };

}]);