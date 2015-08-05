module.exports = function(mongoose){

	var matchSchema = mongoose.Schema({
    homeTeamId: String,
    guestTeamId: String,
    time: Number,
    date: Number,
    homeResults: Number,
    guestResults: Number,
    finishedGame: Boolean,
    regionId: String,
    divisionId: String,
    place: String,
    gameWinnerId: String
  });
  
  return mongoose.model("Match", matchSchema);
};