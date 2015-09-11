

module.exports = function(mongoose) {
    var lastResults;
    var messageQueue = [];

    function queueHandler() {
      // Delete old answered messages
      for (var i=messageQueue.length-1; i>=0; i--) {
        if(messageQueue[i].toBeDeleted){messageQueue.splice(i,1);}
        }
        // Go through message queue
        messageQueue.forEach(function(message){
          if (message.processing) { return; }
          message.processing = true;
          var now = new Date().getTime();
          var q;
          if (message.matchId.length < 2) {

            q = {
              divisionId: message.divisionId,
              date: {$gt: new Date(message.latestKnownMessageId/1)}
            };
          }
          else {
            q = {
              matchId:message.matchId,
              divisionId: message.divisionId,
              date:{$gt: new Date(message.latestKnownMessageId/1)}
            };
          }
          mongoose.model("Message").find(q)
            .populate("userId")
            .exec(function(err,data){

              if(!data || data.length === 0){
                // No new mesages for this client
                // but check if connection is older than 30 secs
                // if so close it anyway
                if(now-message.time>30000){
                  message.res.json([]);
                  message.toBeDeleted = true;
                }
              }
              else {
                // We have new data so close the connection
                message.res.json(data);
                message.toBeDeleted = true;
              }
              message.processing = false;
            });
        });
    }

    setInterval(queueHandler,100);

    return function(req,res){

        messageQueue.push({
          req:req,
          res:res,
          time: new Date().getTime(),
          matchId: req.params.matchId,
          divisionId: req.params.divisionId,
          latestKnownMessageId: req.params.latestKnownMessageId
        });
      queueHandler();
      };
};