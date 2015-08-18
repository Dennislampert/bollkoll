// Require modules
var m = {};
[
  "express",
  "path",
  "serve-favicon",
  "cookie-parser",
  "body-parser",
  "express-session",
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
app.use(m.expresssession({resave: true, saveUninitialized: false, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: new Date(Date.now() + 604800000) }}));
app.use(m.express.static(m.path.join(__dirname, 'public')));


// Route everything "else" to angular (in html5mode)
app.get('/api/getdata', function (req, res) {
  var http = require('http');

  var url = 'http://api.everysport.com/v1/leagues/69643/events?limit=1000&apikey=0b5af832685c9f68013fe4055a74ef2f';

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


var options = { //};
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
      path: "chatlong/:matchId/:latestKnownMessageId",
      controller: require('./api/routes/longPoll')
    }
  ]
};
// Initialize our own REST api - mongresto
m.mongresto.init(app, options);
// get all data for Hälsingland div 4






// Route everything "else" to angular (in html5mode)
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});

// Start up
app.listen(3000, function(){
  console.log("Node is running!");
});