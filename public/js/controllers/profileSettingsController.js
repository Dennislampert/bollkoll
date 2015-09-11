app.controller("profileSettingsController",
  ["$scope", "$http", "$location", "$routeParams", "User", "FileUploader", "File", "Login", "NavTitleChange", "modalService",
  function($scope, $http, $location, $routeParams, User, FileUploader, File, Login, NavTitleChange, modalService) {
  NavTitleChange($routeParams.username + "s profilinställningar");
  // reference(!) to Login.user object
  // (logged in user data)
  $scope.user = Login.user;
  $scope.routeUser = $routeParams.username;
  if(!$scope.user.username){
      event.preventDefault();
      modalService.open({
        templateUrl:'partials/globalalert.html',
        controller: 'uploadAlertController',
        resolve: {
          message: function() {
            $scope.message = {};
            $scope.message.header = "Du måste vara inloggad";
            $scope.message.msg = "Du behöver vara inloggad för att komma vidare. Var god och logga in.";
            $scope.message.msgBtn = "Stäng";
            return $scope.message;
          }
        }
      });
      //event.stopPropagation();
      $location.path('/');
      return;
  } else {
      if($scope.user.username !== $scope.routeUser){
      event.preventDefault();
      modalService.open({
        templateUrl:'partials/globalalert.html',
        controller: 'uploadAlertController',
        resolve: {
          message: function() {
            $scope.message = {};
            $scope.message.header = "Fel användare";
            $scope.message.msg = "Du behöver vara inloggad som rätt användare för att ändra användarens profil. Var god och logga in som rätt användare.";
            $scope.message.msgBtn = "Stäng";
            return $scope.message;
          }
        }
      });
      //event.stopPropagation();
      $location.path('/');
      return;
  }
  }


  $scope.defaultProfile = function(){
    $location.url("/anvandare/" + $routeParams.username);
  };
  // $scope.saveProfile = function(){
  //   $location.url("/anvandare/" + $routeParams.username);
  // };

  function updateCropMeSize(){
      var w = window.innerWidth - 30*2;
      $scope.cropme = {width:w,height:w*0.75};
      if(!$scope.$$phase){
        $scope.$apply();
      }
    }
  updateCropMeSize();
  window.addEventListener("resize",updateCropMeSize);



  $scope.$on("cropme:done", function(ev, result, canvasEl) {
    User.get({username: $scope.user._id}, function(userprofile){
      FileUploader(result).success(function(data) {
        $scope.uploadedFilePath = data;
        $location.url("/anvandare/" + $routeParams.username);
      });
    });
  });








}]);