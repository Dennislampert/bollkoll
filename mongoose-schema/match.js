module.exports = function(mongoose){
	var matchSchema = mongoose.Schema({
    homeTeamId: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    homeTeamName: String,
    guestTeamId: {type: mongoose.Schema.Types.ObjectId, ref: "Team"},
    guestTeamName: String,
    time: String,
    date: String,
    homeResults: Number,
    guestResults: Number,
    lastScoreTime: { type : Date, default: Date.now },
    finishedGame: Boolean,
    regionId: {type: mongoose.Schema.Types.ObjectId, ref: "Region"},
    regionName: String,
    division: Number,
    place: String
  });
  
  return mongoose.model("Match", matchSchema);
};