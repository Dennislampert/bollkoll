app.factory("Hashtag", ["Message", "Login", function(Message, Login) {
  console.log("rootScope; ");
  return Message.get({},function(answer) {
    console.log("s", answer);
  });
}]);