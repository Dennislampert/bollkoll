app.controller("profileController",
  ["$scope", "$http", "$location", "$routeParams", "modalService", "FileUploader", "Login", "User", "File", "NavTitleChange",
  function($scope, $http, $location, $routeParams, modalService, FileUploader, Login, User, File, NavTitleChange) {
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
  console.log("Login.user :", Login.user);
    
    if (file){
      console.log("file: ",file);
      if (file.length){
        var fileType = file[0].name.split('.').pop().toLowerCase();
        if (fileType == "jpg" || fileType == "png" || fileType == "jpeg"){
          stop = false;
          console.log("uploaded image is okey");
        }else{
          // send bastis modual

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
              console.log("the modal closed, and sent back ", closeData);
            }
           });
        }
      }
    }
  });


  function loadImage(){
    
    User.get({username: $routeParams.username}, function(userprofile){
        // $scope.uploadedFilePath = data;
      $scope.user = userprofile[0];
      File.get({owner:userprofile[0]._id}, function(Getfile){
        if (Getfile.length===0){
          console.log("true");
          $scope.image = {};
          $scope.image.path = "../../files/defaultimg.png";
        }else{
          $scope.image = Getfile.pop();
          
        }
      });
    });
  }


  loadImage();

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