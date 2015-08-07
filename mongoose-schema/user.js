module.exports = function(mongoose) {

  var userSchema = mongoose.Schema({
    username: { type:String, required:true, index: { unique:true } },
    password: { type:String, required:true},
    fname: { type:String, required:true },
    lname: { type:String, required:true },
    email: { type:String, required:true ,index: { unique:true } },
    picturePath: String,
  });

  return mongoose.model("User", userSchema);
};