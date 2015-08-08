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
      if (
        !(req.body.username || req.body.email) &&
        !req.body.password
      ) {
        res.json({
          _error: "Invalid request payload"
        });
        return;
      }
      mongoose.model("User").findOne(req.body, function(err, data) {
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