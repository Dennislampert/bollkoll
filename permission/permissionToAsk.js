
var sha256 = require('sha256');

module.exports = function(modelName, method, query ,req){
  console.log("ask: ",modelName, method, query ,req);
  if (req.method != "GET" && !req.session.user && !(req.method == "POST" && modelName == "User")){
    return false;
  }
  return true;
};