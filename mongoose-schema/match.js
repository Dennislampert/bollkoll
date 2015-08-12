module.exports = function(mongoose){
	var matchSchema = mongoose.Schema({
    homeTeamId: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    guestTeamId: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    time: String,
    date: String,
    homeResults: Number,
    guestResults: Number,
    finishedGame: Boolean,
    regionId: {type: mongoose.Schema.Types.ObjectId, ref: "Region"},
    division: Number,
    place: String
  });
  
  return mongoose.model("Match", matchSchema);
};