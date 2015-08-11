app.factory("NavTitleChange", ["$rootScope", function($rootScope) {
  return function(displayName) {
    $rootScope.$broadcast("titleChange", displayName);
  }
}]);