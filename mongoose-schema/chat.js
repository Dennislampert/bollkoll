module.exports = function(mongoose) {
  return mongoose.model("Chat",{
    message: { 
	  tag: String,
      content: String
    },
    user: {
      name: String,
      loginProtection: Boolean
    },
    status: {
      goal: Boolean,
      endedGame: Boolean
    },
    matchId: String

	});
}