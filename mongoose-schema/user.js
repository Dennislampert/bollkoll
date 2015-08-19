module.exports = function(mongoose) {

  var userSchema = mongoose.Schema({
    username: { type:String, required:true, index: { unique:true } },
    password: { type:String, required:true},
    fname: { type:String, required:true },
    lname: { type:String, required:true },
    email: { type:String, required:true ,index: { unique:true } }
  });

  return mongoose.model("User", userSchema);
};

// User.findOne(req.session.user, function(User) {
//	User.picture = File;
// })