app.run(
  ["$anchorScroll", "$rootScope", "Login",
  function($anchorScroll, $rootScope, Login) {
    $anchorScroll.yOffset = 65;
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      $rootScope.headerUser = Login.getCurrentUser();
    });
}]);