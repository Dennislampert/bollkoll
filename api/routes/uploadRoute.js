var path = require('path'),
    config = require(path.normalize(process.cwd() + '/config.js')),
    fs = require('fs'),
    // include the multipart middleware for file uploading
    multipart = require('connect-multiparty'),
    imagehandler = require('lwip');



// middleware controller for simplifying file uploads
var multipartMiddleware = multipart();

module.exports = function(mongoose) {
  // return an array of controllers for "/api/upload" that will be
  // called in the order of the array
  return [multipartMiddleware, function(req, res) {
    if (!req.session.user) {
      res.json({_error: "Forbidden"});
      return;
    }
    // the recieved file
    var file = req.files.file;


    // read the recieved file
    fs.readFile(file.path, function (err, data) {
      console.log("lite data: ", data);
      console.log("filnamn: ", file.name.split(".").pop());

      // decide where to store the file
      var uploadPath = path.normalize(config.upload.publicPath + file.name);

      var filetype = file.name.split(".").pop();

      imagehandler.open(data, filetype, function(err, image){
        // check err...
        // define a batch of manipulations and save to disk as JPEG:
            console.log("hejhej :", image);
            console.log("uploadpath :", uploadPath);
        image.batch()
          .resize(200,200)
          .crop(200, 200)       // crop a 200X200 square from center
          .writeFile(uploadPath, function(err){
            // check err...
            // done.
          // find public path (for <img src=""> tags etc)
          var publicPath = '/' + path.relative(process.cwd() + '/public', uploadPath);

          // get the mongoose 'File' model
          var FileModel = mongoose.model("File");

          // create a new File document
          var dbFile = new FileModel({
            name: file.name,
            path: publicPath,
            type: file.type,
            owner: req.session.user // all files have an owner
          });
          
          // save file info to mongodb
          dbFile.save(function(err, data) {
            if (err) { throw err; }
            // and finally send a response to client
            res.json(publicPath);
            scaleimage("public"+publicPath);
          });
        });
      });


    });
  }];
};