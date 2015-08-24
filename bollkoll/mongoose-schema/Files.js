module.exports = function(mongoose){
  // Create a new mongoose schema 
  // with properties
  var FileSchema = mongoose.Schema({
    name: {type:String, required:true},
    path: {type:String, required:true},
    type: {type:String, required:true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  });

  // Create a model from the schema
  var File = mongoose.model("File", FileSchema);

  // Return the model
  return File;
};