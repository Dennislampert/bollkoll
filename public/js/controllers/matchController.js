//"myAppName" controller.
app.controller("matchController", ["$scope", "$routeParams", "Match", "Region, Team", function($scope, $routeParams, Match, Region, Team){

  // var getLjusdal = Region.get();
  // console.log("getLjusdal: ", getLjusdal);

  // collection.Region hämta regionPath som är lika med routeParams.region
  Region.get({regionPath: $routeParams.region}, function(answer){
    console.log("answer: regionsnamn:", answer[0]._id);

    Team.get({}, function(answer){
      console.log("answer: regionsnamn:", answer[0]._id);
    });
  });

// console.log("routeParams: ",$routeParams.division);
// console.log("routeParams(region): ", $routeParams.region);


}]);