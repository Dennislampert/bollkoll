app.run(
  ["$rootScope", "Login",
  function($rootScope, Login) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      $rootScope.headerUser = Login.getCurrentUser();
    });
}]);