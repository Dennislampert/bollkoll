var path = require('path'),
    config = require(path.normalize(process.cwd() + '/config.js')),
    fs = require('fs'),
    // include the multipart middleware for file uploading
    multipart = require('connect-multiparty');


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

      // write file to file system
      fs.writeFile(uploadPath, data, function (err, data) {
        if (err) throw err;

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
        
        // save file to mongodb
        dbFile.save(function(err, data) {
          if (err) { throw err; }
          // and finally send a response to client
          res.json(publicPath);
        });
      });
    });
  }];
};