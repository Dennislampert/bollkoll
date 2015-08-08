module.exports = function(mongoose){

	var matchSchema = mongoose.Schema({
    homeTeamId: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    guestTeamId: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    time: {type:Number},
    date: Number,
    homeResults: Number,
    guestResults: Number,
    finishedGame: Boolean,
    place: String
  });
  
  return mongoose.model("Match", matchSchema);
};