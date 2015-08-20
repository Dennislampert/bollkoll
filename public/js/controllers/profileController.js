app.controller("profileController",
  ["$scope", "$http", "$location", "$routeScope", "$routeParams", "modalService", "FileUploader", "Login", "User", "File", "NavTitleChange",
  function($scope, $http, $location, $routeScope, $routeParams, modalService, FileUploader, Login, User, File, NavTitleChange) {
  NavTitleChange($routeParams.username + "s profil");
  // reference(!) to Login.user object
  // (logged in user data)
  $scope.onlineUser = Login.user;
    
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
      console.log("file: ",file);
      if (file.length){
        var fileType = file[0].name.split('.').pop().toLowerCase();
        if (fileType == "jpg" || fileType == "png" || fileType == "jpeg"){
          stop = false;
          console.log("uploaded image is okey");
        }else{
          // send bastis modual
          $routeScope.errmsg = 'blablabla';
          $scope.errorbox = modalService.open({
            templateUrl:'partials/globalalert.html'
          });
          console.log("You try to upload a file that we dont accept..");
        }
      }
    }
  });


  function loadImage(){
    
    User.get({username: $routeParams.username}, function(userprofile){
        // $scope.uploadedFilePath = data;
      $scope.user = userprofile[0];
      File.get({owner:userprofile[0]._id}, function(Getfile){
        $scope.image = Getfile.pop();
      });
    });
  }


loadImage();

}]);