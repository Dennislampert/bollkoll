var path = require('path'),
    config = require(path.normalize(process.cwd() + '/config.js')),
    fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true}),
    // include the multipart middleware for file uploading
    multipart = require('connect-multiparty'),
    gm = require('gm');



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
      // decide where to store the file
        
      var uploadPath = path.normalize(config.upload.publicPath + file.name);
      var publicPath = '/' + path.relative(process.cwd() + '/public', uploadPath);

      var filetype = file.name.split(".").pop();
      console.log("uploadpath :", uploadPath);
      gm(data)
      .resize(200,200)
      .crop(200, 200)
      .write(uploadPath, function(err){
  
        // get the mongoose 'File' model
        var FileModel = mongoose.model("File");

        // create a new File document
        var dbFile = new FileModel({
          name: file.name,
          path: publicPath,
          type: file.type,
          owner: req.session.user // all files have an owner
        });
        
<<<<<<< HEAD
        // save file to mongodb
=======
        // save file info to mongodb
>>>>>>> master
        dbFile.save(function(err, data) {
          if (err) { throw err; }
          // and finally send a response to client
          res.json(publicPath);
          scaleimage("public"+publicPath);
        });
      });
    });
<<<<<<< HEAD
=======



>>>>>>> master
  }];
};