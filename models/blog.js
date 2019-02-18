var mongoose = require("mongoose");
//SCHEMA SETUP
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now},
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
//var Blog = mongoose.model("Blog", blogSchema);

module.exports = mongoose.model("Blog", blogSchema); //Trebuie sa aratam ce dorim sa exportam din acest file.
