var sha256 = require('sha256'),
saltHash = require(process.cwd() + "/salt");
module.exports = function(modelName, method, query ,req){
  if (req.method == "POST" && modelName == "User") {
    if (
      !req.body.username &&
      !req.body.email &&
      !req.body.password
    ) {
      return false;
    }
    req.body.password = sha256(saltHash.salt + req.body.password);
    return true;
  }

  // console.log("ask: ",modelName, method, query ,req);
  if (req.method != "GET" && !req.session.user && !(req.method == "POST" && modelName == "User")){
    return false;
  }
  return true;
};