module.exports = function(mongoose) {
  var sha256 = require('sha256'),
  saltHash = require(process.cwd() + "/salt");
  return function(req, res) {
    
    if (req.method == "GET") {
      if (req.session.user) {
        res.json(req.session.user);
      }
      else {
        res.json(false);
      }
    } else if (req.method == "POST") {
      if (
        !(req.body.username || req.body.email) &&
        !req.body.password
      ) {
        res.json({
          _error: "Invalid request payload"
        });
        return;
      }
      req.body.password = sha256(saltHash.salt + req.body.password);
      console.log("body", req.body);
      mongoose.model("User").findOne(req.body, function(err, data) {
        if (err) { throw err; }
        // don't store the password
        data && (data.password = undefined);

        // store all other user info in a session property
        data && (req.session.user = data);
        res.json(data);
      });
    } else if (req.method == "DELETE") {
      req.session.destroy(function(err) {
        if(err) { throw err; }
        res.json(true);
      });
    } else {
      res.json({error: "failed hard!"});
    }
  };
};