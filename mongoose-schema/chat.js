module.exports = function(mongoose) {
  var chatSchema = mongoose.Schema({
    match: {type: mongoose.Schema.Types.ObjectId, ref: "Match"},
    // users: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message"}]
  });

  return mongoose.model("Chat",chatSchema);
}