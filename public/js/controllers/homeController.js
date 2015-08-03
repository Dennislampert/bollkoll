//"myAppName" controller.
app.controller("homeController", ["$scope","Book", function($scope,Book){

  $scope.test = Book.create({

    isbn: "232234234234",
    title: "The strong Beer",
    publishingYear: 1910,
    author: ["Dennis Mafia","Basti getto"]
  });

  $scope.test = Book.get({publishingYear:{$gte:1980}});
  // $scope.test = Book.getById("55815ab22a32d551d4c54bd7");
  // $scope.test = Book.get({_id:"55815ab22a32d551d4c54bd7"});

}]);