module.exports = function(mongoose) {
  
  var team = mongoose.Schema({
    name: String,
    gamesPlayed: Number,
    gamesWon: Number,
    gamesDrawn: Number,
    gamesLost: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    Points: Number,
    regionId: String,
    division: Number,
    picturePath: String
    });

  return mongoose.model("Team", team);
  
};