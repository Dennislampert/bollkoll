module.exports = function(mongoose){

  return mongoose.model("Book",{
    isbn: String,
    title: String,
    publishingYear: Number,
    author: Array
  });

};