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
var options = {
  premissionToAsk: require('./permission/permissionToAsk.js'),
  premissionToAnswere: require('./permission/permissonToAnswer.js'),
  customRoutes: [
    {
      method: "all",
      path: "login",
      controller: require('./api/routes/loginRoute')
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