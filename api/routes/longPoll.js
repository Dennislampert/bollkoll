

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
          //console.log("message: ", message.req.params);
          var q;
          if (message.matchId.length < 2) {
            console.log("in if");
            q = {
              divisionId: message.divisionId,
              date: {$gt: new Date(message.latestKnownMessageId/1)}
            };
          }
          else {
            console.log("in else");
            q = {
              matchId:message.matchId,
              divisionId: message.divisionId,
              date:{$gt: new Date(message.latestKnownMessageId/1)}
            };
          }
          console.log("q: ",q);
          mongoose.model("Message").find(q)
            .populate("userId")
            .exec(function(err,data){
              console.log("data: ",data);
              if(!data || data.length === 0){
                //console.log("no data: ", data);
                // No new mesages for this client
                // but check if connection is older than 30 secs
                // if so close it anyway
                if(now-message.time>30000){
                  //console.log("past 30 secs");
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

    //console.log("BANANA")
    setInterval(queueHandler,100);

    return function(req,res){
      console.log("m", req.params);
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