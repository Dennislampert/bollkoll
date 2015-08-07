module.exports = function(mongoose) {
  return function(req, res) {
    if (req.method == "GET") {
      if (req.session.user) {
        res.json(req.session.user);
      }
      else {
        res.json(false);
      }
    } else if (req.method == "POST") {
      var username = req.body.username;
      mongoose.model("User").findOne(username, function(err, data) {
        if (err) { throw err; }
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