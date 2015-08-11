module.exports = function(mongoose) {
  var messageSchema = mongoose.Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	content: {type: String, required: true},
	date: { type : Date, default: Date.now },
	status: {type: Boolean, default: false}
  });
  return mongoose.model("Message", messageSchema);
};