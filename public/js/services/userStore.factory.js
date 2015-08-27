app.factory("UserStore", [function() {
  !localStorage.bollkoll && (localStorage.bollkoll = {});
  // if (!localStorage.bollkoll) {
  //   localStorage.bollkoll = {};
  // }
  var userStore = {
    permanent: localStorage.bollkoll,
    temp: {}
  };

  return userStore;
}]);