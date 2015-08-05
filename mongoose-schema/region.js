module.exports = function(mongoose){

  var regionSchema  = mongoose.Schema({
    regionPath: String, // halsingland
    regionName: String, // Hälsingland
  });

  return mongoose.model("Region", regionSchema);

};