module.exports = function(mongoose){

    var userSchema = mongoose.Schema({
    userName: String,
    picturePath: String
  });
  
  return mongoose.model("Person", userSchema);
};