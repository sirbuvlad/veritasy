var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment");
var data = [
  {
    title: "Green",
    image: "https://images.pexels.com/photos/732547/pexels-photo-732547.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    body: "Green Green Green"
  },
  {
    title: "Sunflower",
    image: "https://images.pexels.com/photos/546232/pexels-photo-546232.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    body: "Sunflower Sunflower Sunflower"
  }
];

function seedDB(){
  //Remove all Blogs
  Blog.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed blogs!");
    //Add a few blogs
    data.forEach(function(seed) {
      Blog.create(seed, function(err, blog) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a blog");
          //Create a comment for each Blog
          Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment){
            if (err) {
              console.log(err);
            } else {
              blog.comments.push(comment);
              blog.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });
});
}
//Add a few comments
module.exports = seedDB;
