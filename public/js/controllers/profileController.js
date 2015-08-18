app.controller("profileController",
  ["$scope", "$http", "$location", "$routeParams", "FileUploader", "Login", "NavTitleChange",
  function($scope, $http, $location, $routeParams, FileUploader, Login, NavTitleChange) {
  NavTitleChange($routeParams.username + "s profil");
  // reference(!) to Login.user object
  // (logged in user data)
  $scope.user = Login.user;
  
  var stop = true;
  $scope.upload = function() {
    if (stop === false){

      console.log("files: ",$scope.files);
      FileUploader($scope.files).success(function(data) {
        console.log("saved files, public path: ", data);
        $scope.uploadedFilePath = data;
      });
    }
  };


  $scope.$watch('files', function (file) {
    
    if (file){
      console.log("file: ",file);
      if (file.length){
        var fileType = file[0].name.split('.').pop().toLowerCase();
        if (fileType == "jpg" || fileType == "png"){
          stop = false;
          console.log("uploaded image is okey");
        }else{
          console.log("You try to upload a file that we dont accept..");
        }
      }
    }
  });

}]);