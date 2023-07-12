//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/blogDB',{useNewUrlParser:true});
const blogschema=new mongoose.Schema({
  title:String,
  body:String,
});
const Blog=mongoose.model("Blog",blogschema);
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const _=require('lodash');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const posts = [];
app.get("/contact", (req, res) => {
  res.render("contact.ejs", { contactdetails: contactContent })
})
app.get("/about", (req, res) => {


  res.render("about.ejs", { aboutdetails: aboutContent })

})
app.get("/", async(req, res) => {

  async function run(){
  const blogs=await Blog.find({});
  res.render("home",{
    homestartcontent:homeStartingContent,
    allposts:blogs
  })
}
  await run();

})
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
})
app.post("/compose", async(req, res) => {

  // let required = req.body;
  // const object = {
  //   title: required.posttitle,
  //   body: required.postbody
  // }
  // posts.push(object);
async function run(){
const blog=new Blog({
    title:req.body.posttitle,
    body:req.body.postbody
  })
  await blog.save();
}
await run();
  res.redirect("/");
  //console.log(required.postbody);
})

app.get("/posts/:postName", function(req,res){
  const requestedtitle=_.lowerCase(req.params.postName);
  for(var i=0;i<posts.length;i++)
  {
    const storedtitle=_.lowerCase(posts[i].title);
    if(storedtitle==requestedtitle){
     
      res.render("post" , {posttitle:posts[i].title, postbody:posts[i].body});
    }
   
  }
});










app.listen(3000, function () {
  console.log("Server started on port 3000");
});
