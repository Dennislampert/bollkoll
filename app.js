// Require modules
var m = {};
[
  "express",
  "path",
  "serve-favicon",
  "cookie-parser",
  "body-parser",
  "express-session",
  "fs",
  "path",
  "./mongresto"
].forEach(function(x){
  // store required modules in m
  m[x.replace(/\W/g,'')] = require(x);
});


// Standard Express boiler plate code
var app = m.express();
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(m.bodyparser.json());
app.use(m.bodyparser.urlencoded({ extended: false }));
app.use(m.cookieparser());
app.use(m.expresssession({unset: "destroy", resave: true, saveUninitialized: false, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: new Date(Date.now() + 604800000) }}));
app.use(m.express.static(m.path.join(__dirname, 'public')));

// Route everything "else" to angular (in html5mode)
app.get('/api/getdata', function (req, res) {
  var http = require('http');
  // Skåne leagid = 69659
  // hälsingland leadgid = 69643
  var url = 'http://api.everysport.com/v1/leagues/69659/events?limit=1000&apikey=878d16e28ab6fe3a5f40035efbadca69';

  http.get(url, function(resp) {
    var body = '';

    resp.on('data', function(chunk) {
        body += chunk;
    });
    resp.on('end', function() {
        // var Response = JSON.parse(body);
        // console.log("Got response: ", body);
    res.json(JSON.parse(body));
    });
  }).on('error', function(e) {
      console.log("Got error: ", e);
  });
});

var options = {
  permissionToAsk: require('./permission/permissionToAsk.js'),
  permissionToAnswer: require('./permission/permissonToAnswer.js'),
  customRoutes: [
    {
      method: "all",
      path: "login",
      controller: require('./api/routes/loginRoute')
    },
    {
      method: "post",
      path: "upload",
      controller: require('./api/routes/uploadRoute')
    },
    {
      method: "get",
      path: "chatlong/:divisionId/:latestKnownMessageId/:matchId?",
      controller: require('./api/routes/longPoll')
    },
    {
      method: "get",
      path: "resultWatch/:lastScoreTime/:matchId",
      controller: require('./api/routes/resultWatch')
    }
  ]
};
// Initialize our own REST api - mongresto
m.mongresto.init(app, options);


// Route everything "else" to angular (in html5mode)
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});

// Start up
app.listen(3000, function(){
  console.log("Node is running!");
});



