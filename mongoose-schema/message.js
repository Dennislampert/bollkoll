module.exports = function(mongoose) {
  var messageSchema = mongoose.Schema({
	// userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	content: {type: String, required: true},
	// date: {type: Number, required:true}
  });
  return mongoose.model("Message", messageSchema);
}