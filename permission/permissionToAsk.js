var sha256 = require('sha256'),
saltHash = require(process.cwd() + "/salt");
module.exports = function(modelName, method, query ,req){
  if (req.method == "POST" && modelName == "User") {
    req.body.password = sha256(saltHash.salt + req.body.password);
  }

  console.log("ask: ",modelName, method, query ,req);
  if (req.method != "GET" && !req.session.user && !(req.method == "POST" && modelName == "User")){
    return false;
  }
  return true;
};