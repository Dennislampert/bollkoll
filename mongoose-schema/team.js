module.exports = function(mongoose) {
  
  var teamSchema = mongoose.Schema({
    name: {type: String, required:true},
    gamesPlayed: Number,
    gamesWon: Number,
    gamesDrawn: Number,
    gamesLost: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    Points: Number,
    regionId: {type: mongoose.Schema.Types.ObjectId, ref: "Region"},
    division: Number,
    picturePath: String
  });
  var Team = mongoose.model("Team", teamSchema);
};