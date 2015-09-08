

module.exports = function(mongoose) {


  var lastResults;
  var resultQueue = [];

  function queueHandler() {
    // Delete old answered messages
    for (var i=resultQueue.length-1; i>=0; i--) {
      if(resultQueue[i].toBeDeleted){resultQueue.splice(i,1);}
    }
    // Go through result queue
    resultQueue.forEach(function(result){
      if (result.processing) { return; }
      result.processing = true;
      var now = new Date().getTime();
      var query = {
        _id:result.matchId,
        lastScoreTime:{$gt: new Date(result.lastScoreTime/1)}
      };


      mongoose.model("Match").find(query)
        .exec(function(err,data){
          if(!data || data.length === 0){

            //console.log("no data: ", data);
            // No new mesages for this client
            // but check if connection is older than 30 secs
            // if so close it anyway
            if(now-result.timeing>30000){

              //console.log("past 30 secs");
              result.res.json([]);
              result.toBeDeleted = true;
            }
          }
          else {

            // We have new data so close the connection
            result.res.json(data);
            result.toBeDeleted = true;
          }
          result.processing = false;
        });
    });
  }
  
  setInterval(queueHandler,100);

  return function(req,res){
    console.log("req.params", req);
    resultQueue.push({
      req:req,
      res:res,
      timeing: new Date().getTime(),
      matchId: req.params.matchId,
      lastScoreTime: req.params.lastScoreTime
    });
    queueHandler();
  };
};