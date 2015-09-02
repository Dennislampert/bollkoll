app.controller("dataController", ["$scope", "$http", "Match", "Region", "Team", function($scope, $http, Match, Region ,Team){

  $http.get("/api/getData").then(parseData);

  function parseData(data){
    var events = data.data.events;
    var counter = -1;
    var count = 0;
    function parseOneEvent(){
      counter++;
      if(counter >= events.length){return;}
      var event = events[counter];
      var regionName = event.league.name.split(" ")[2];
      var division = event.league.name.split(" ")[1];
      var regionPath = regionName.toLowerCase().replace('å','a').replace('ä', 'a').replace('ö', 'o').replace(' ', '');

      Region.get({"regionPath":regionPath},function(regionInfo){
        if (regionInfo.length === 0 ){
          Region.create({
            regionPath: regionPath, // ex.halsingland
            regionName: regionName, // ex.Hälsingland
          },function(created){
          });
        }
        else{
          createTeams(regionInfo[0]._id);
        }
        var thisHomeTeam = null;
        var thisGuestTeam = null;
        function createTeams(regionId){
          Team.get({name:event.homeTeam.shortName, division:division/1, regionId:regionId},function(homeTeams){

            if (homeTeams.length === 0){
              // here is it posible to make a logic for the table.. of status: "FINSIHED" who won? if status: "Comming" defult result..
              Team.create({
                name: event.homeTeam.shortName,
                gamesPlayed: 0,
                gamesWon: 0,
                gamesDrawn: 0,
                gamesLost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                Points: 0,
                regionId: regionId,
                division: division
              },function(){
                Team.get({ name: event.homeTeam.shortName, division: division/1, regionId: regionId },function(NewHomeTeam){
                  creatMatch(NewHomeTeam, null);
                });
              });
            }else{
              creatMatch(homeTeams, null);
            }
            Team.get({ name: event.visitingTeam.shortName, division: division/1, regionId: regionId },function(guestTeam){
              if (guestTeam.length === 0){

                Team.create({
                  name: event.visitingTeam.shortName,
                  gamesPlayed: 0,
                  gamesWon: 0,
                  gamesDrawn: 0,
                  gamesLost: 0,
                  goalsFor: 0,
                  goalsAgainst: 0,
                  Points: 0,
                  regionId: regionId,
                  division: division
                },function(){
                  Team.get({ name: event.visitingTeam.shortName, division: division/1, regionId: regionId },function(newGuestTeam){
                    creatMatch(null, newGuestTeam);
                  });
                });
              }else{
                creatMatch(null ,guestTeam);
              }
            });
            function creatMatch(theHomeTeam, theGuestTeam){

              thisHomeTeam = thisHomeTeam === null ? theGuestTeam:thisHomeTeam;
              thisGuestTeam = thisGuestTeam === null ? theHomeTeam:thisGuestTeam;

              if (thisHomeTeam && thisGuestTeam){
                var time = new Date(event.startDate);
                var stringTime = ""+time+"";
                var month = (time.getMonth()+1) + '';
                if(month.length<2){month = "0" + month;}
                var splitTime = stringTime.split(" ");
                var date = ""+splitTime[3]+"-"+month+"-"+splitTime[2];
                var hours = ""+splitTime[4]+"";
                count ++;
                Match.create({
                  homeTeamId: thisHomeTeam[0]._id,
                  guestTeamId: thisGuestTeam[0]._id,
                  time: hours,
                  date: date,
                  homeResults: 0,
                  guestResults: 0,
                  finishedGame: 0,
                  regionId: thisHomeTeam[0].regionId,
                  division: thisHomeTeam[0].division,
                  place: event.facts.arena.name
                },function(prop){
                  console.log("progress: ",prop);
                  setTimeout(parseOneEvent,100);
                });
              }
            }
          });
        }
      });
    }
    parseOneEvent();
  }

}]);

