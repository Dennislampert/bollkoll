module.exports = function(mongoose) {
  
  return mongoose.model("Team", {
    name: String,
    gamesPlayed: Number,
    gamesWon: Number,
    gamesDrawn: Number,
    gamesLost: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    Points: Number,
    regionId: String,
    divisionId: String,
    picturePath: String
  });
  
};