var bodyParser = require("body-parser"), //npm install express mongoose body-Parser --save
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
mongoose       = require("mongoose"),
express        = require("express"),
Blog           = require("./models/blog"),
seedDB         = require("./seeds"),
app            = express()
seedDB();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs"); // npm install ejs --save
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 80)); // de altfel nu lucreaza daca nu indici portul
app.use(expressSanitizer());
app.use(methodOverride("_method")); // pentru a respecta RESTful pattern si a folosi PUT

//app.use(express.static(__dirname + '/public'));

//RESTFUL ROUTES
app.get('/', function(request, response) {
  response.redirect("/blogs");
});

app.get('/blogs', function(request, response) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("ERROR!");
    } else {
      response.render("index", {blogs: blogs});
    }
  })
});
//NEW ROUTE
app.get('/blogs/new', function(request, response) {
  response.render("new");
});
//CREATE ROUTE
app.post("/blogs", function(request, response) {
  request.body.blog.body = request.sanitize(request.body.blog.body); //express-sanitizer
  Blog.create(request.body.blog, function(err, newBlog){
    if (err) {
      response.render("new");
    } else {
      response.redirect("blogs");
    }
  });
});
//SHOW ROUTE
app.get("/blogs/:id",  function(request, response) {
Blog.findById(request.params.id, function(err, foundBlog) {
  if (err) {
    response.redirect("/blogs");
  } else {
    response.render("show", {blog: foundBlog});
  }
});
});
// EDIT ROUTE
app.get("/blogs/:id/edit", function(request, response) {
  Blog.findById(request.params.id, function(err, foundBlog) {
    if (err) {
      response.redirect("/blogs");
    } else {
        response.render("edit", {blog: foundBlog});
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(request, response) {
  request.body.blog.body = request.sanitize(request.body.blog.body); //express-sanitizer
  Blog.findByIdAndUpdate(request.params.id, request.body.blog, function(err, updatedBlog) {
    if (err) {
      response.redirect("/blogs");
    } else {
      response.redirect("/blogs/" + request.params.id);
    }
  });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(request, response) {
  Blog.findByIdAndRemove(request.params.id, function(err) {
    if (err) {
      response.redirect("/blogs");
    } else {
      response.redirect("/blogs");
    }
  })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})
