<<<<<<< HEAD
 //"myAppName" controller.
app.controller("regionController", ["$scope","Region", function($scope,Region){

=======
//"myAppName" controller.
app.controller("regionController",
  ["$scope","Region", "NavTitleChange",
  function($scope, Region, NavTitleChange) {
  NavTitleChange("Lägg till region");
>>>>>>> master
  $scope.save = function(){

    Region.create({
      regionPath: $scope.region.path, // halsingland
      regionName: $scope.region.name, // Hälsingland
    });
  };

  // $scope.getRegions = function(){
  //   $scope.regions = Region.get();
  // };
}]);