app.controller("profileController",
  ["$scope", "$http", "$location", "$routeParams", "modalService", "FileUploader", "Login", "User", "File", "NavTitleChange",
  function($scope, $http, $location, $routeParams, modalService, FileUploader, Login, User, File, NavTitleChange) {
  NavTitleChange($routeParams.username + "s profil");
  $scope.onlineUser = Login.user;
  $scope.user = Login.user;
  $scope.routeUser = $routeParams.username;

  var stop = true;
  $scope.upload = function() {
    if (stop === false){
      User.get({username: $routeParams.username}, function(userprofile){
        FileUploader($scope.files).success(function(data) {
          $scope.user = userprofile[0];
          loadImage();
        });
      });
    }
  };
  $scope.$watch('files', function (file) {
    if (file){
      if (file.length){
        var fileType = file[0].name.split('.').pop().toLowerCase();
        if (fileType == "jpg" || fileType == "png" || fileType == "jpeg"){
          stop = false;
        }else{
          $scope.errorbox = modalService.open({
            templateUrl:'partials/globalalert.html',
            controller: 'uploadAlertController',
            resolve: {
              message: function() {
                $scope.message = {};
                $scope.message.header = "Bilduppladdning misslyckades!";
                $scope.message.msg = "Vi stöder inte detta bildformatet, vänligen ladda upp en bild med formatet png, jpg eller jpeg.";
                return $scope.message;
              }
            },
            close: function(closeData) {
              $scope.files = [];
            }
           });
        }
      }
    }
  });
  // function loadImage(){
    
  //   User.get({username: $routeParams.username}, function(userprofile){
  //       // $scope.uploadedFilePath = data;
  //     $scope.user = userprofile[0];
  //     File.get({owner:userprofile[0]._id}, function(Getfile){
  //       $scope.image = Getfile.pop();
  //     });
  //   });
  // }
  function loadImage(){
    User.get({username: $routeParams.username}, function(userprofile){
      if (!userprofile[0]){$location.url("/404");return;}
        // $scope.uploadedFilePath = data;
      $scope.user = userprofile[0];
      File.get({owner:userprofile[0]._id}, function(Getfile){
        if (Getfile.length===0){
          $scope.image = {};
          $scope.image.path = "../../files/defaultimg.png";
        }else{
          $scope.image = Getfile.pop();
          
        }
      });
    });
  }
  
  loadImage();
  
  $scope.editProfile = function(){
    $location.url("/anvandare/" + $routeParams.username + "/settings");
  };
}]);
app.controller('uploadAlertController', ["$scope", "$modalInstance", "message", function($scope, $modalInstance, message) {
  $scope.message = message;
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
  $scope.redirect = function() {
    $modalInstance.close({msg: "I CLOSED!"});
  };
}]);