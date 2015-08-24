app.factory("hasTag", ["$rootScope", function($rootScope) {
  return function(displayName) {
    $rootScope.$broadcast("titleChange", displayName);
  };
}]);