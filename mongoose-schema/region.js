module.exports = function(mongoose){

  var Region  = mongoose.Schema({
    regionPath: String, // halsingland
    regionName: String, // Hälsingland
  });

  return mongoose.model("Region", Region);

};