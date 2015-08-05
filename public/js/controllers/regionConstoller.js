//"myAppName" controller.
app.controller("regionController", ["$scope","Region", function($scope,Match){

  $scope.save = function(){

    Region.create({

      regionPath: $scope.regionPath, // halsingland
      regionName: $scope.regionName, // Hälsingland

    });
      
  };

  $scope.getRegions = function(){
    $scope.regions = Region.get();

  };

}]);