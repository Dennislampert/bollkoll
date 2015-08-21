module.exports = function(mongoose) {
  var messageSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String, required: true},
    date: {type : Date, default: Date.now },
    status: {type: Boolean, default: false},
    hastag: {type: Array, default: []},
    matchId: {type: mongoose.Schema.Types.ObjectId, ref: "Match"},
    regionOdiv: {type: String, required:true}
  });
  return mongoose.model("Message", messageSchema);
};