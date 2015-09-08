app.controller("profileSettingsController",
  ["$scope", "$http", "$location", "$routeParams", "User", "FileUploader", "File", "Login", "NavTitleChange",
  function($scope, $http, $location, $routeParams, User, FileUploader, File, Login, NavTitleChange) {
  NavTitleChange($routeParams.username + "s profilinställningar");
  // reference(!) to Login.user object
  // (logged in user data)
  $scope.user = Login.user;



  $scope.defaultProfile = function(){
    $location.url("/anvandare/" + $routeParams.username);
  };


  // $scope.saveProfile = function(){
  //   $location.url("/anvandare/" + $routeParams.username);
  // };









  $scope.$on("cropme:done", function(ev, result, canvasEl) {
    User.get({username: $scope.user._id}, function(userprofile){
      console.log("resultII: ", result);
      FileUploader(result).success(function(data) {
        console.log("saved files, public path: ", data);
        $scope.uploadedFilePath = data;
        $location.url("/anvandare/" + $routeParams.username);
      });
    });
      console.log("result: ", result);
  });








}]);