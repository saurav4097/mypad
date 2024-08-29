const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON data


// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Initialize arrays to store pairs
let pairVector = [];
let pairVector2 = [];
let pairVector3 = [];
let editselector1;
let editselector2;

// Middleware to parse request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index"); // Renders the 'index.ejs' file from the 'views' directory
});
//signin
app.get("/index", (req, res) => {
  res.render("index", { pairVector3:pairVector3 });
});
app.post('/index', (req, res) => {
  const searchQuery = req.body.query || "";
  pairVector3.splice(0, pairVector3.length);

  if (searchQuery.length >= 2 && searchQuery[0] !== "") {
    pairVector3.push([searchQuery[0], searchQuery[1]]);
  }

  res.redirect('/home');
});
app.get("/home", (req, res) => {
  res.render("home", { pairVector3: pairVector3,pairVector: pairVector });
});
// Main route to render the index page
app.get("/signout",(req,res)=>{
   
    res.redirect('/'); 
  });
 


// Render the add page
app.get("/add", (req, res) => {
  res.render("add");
});

// Render the search page
app.get("/search", (req, res) => {
  res.render("search", { pairVector2: pairVector2 });
});

// Handle the addition of new items
app.get('/aaded', (req, res) => {
  const searchQuery = req.query.query || "";
  
  if (searchQuery.length >= 2 && searchQuery[0] !== "") {
    pairVector.push([searchQuery[0], searchQuery[1]]);
  }

  res.redirect('/home');
});

//part of edit->
app.get("/edit", (req, res) => {
  res.render("edit", { editselector1: editselector1, editselector2: editselector2,pairVector:pairVector });
});


app.post("/home", (req, res) => {
  
  
  const topicToedit = req.body.action;

  if (topicToedit) {
    
    editselector1 = req.body.action[0];
    editselector2 = topicToedit[1];
    console.log(`${topicToedit}`);
  } else {
    console.log("No topic received");
  }

  res.redirect('/edit');
});


app.post("/edit", (req, res) => {
  const topicToedit = req.body.topic;
  pairVector = pairVector.filter(pair => pair[0] !== editselector1);
  
  pairVector.push([topicToedit[0], topicToedit[1]]);
  
  res.redirect('/home');
});
//-----<
 
app.get("/edit", (req, res) => {
  res.render("edit", { editselector1: editselector1, editselector2: editselector2,pairVector2:pairVector2 });
});


app.post("/search", (req, res) => {
  
  
  const topicToedit = req.body.action;

  if (topicToedit) {
    
    editselector1 = req.body.action[0];
    editselector2 = topicToedit[1];
    console.log(`${topicToedit}`);
  } else {
    console.log("No topic received");
  }

  res.redirect('/edit');
});


app.post("/edit", (req, res) => {
  const topicToedit = req.body.topic;
  pairVector2 = pairVector2.filter(pair => pair[0] !== editselector1);
  
  pairVector2.push([topicToedit[0], topicToedit[1]]);
  
  res.redirect('/search');
});
//-----<






// Handle search functionality
app.get('/search1', (req, res) => {
  const searchQuery2 = req.query.query || "";
  
  // Clear pairVector2 before each search
  pairVector2 = [];

  for (let i = 0; i < pairVector.length; i++) {
    if (searchQuery2 === pairVector[i][0]) {
      pairVector2.push([pairVector[i][0], pairVector[i][1]]);
    }
  }

  // Render the search page with the results
  res.render('search', { pairVector2: pairVector2 });
});

// Handle delete request
app.post("/delete", (req, res) => {
  const topicToDelete = req.body.topic;

  // Remove the selected topic from pairVector
  pairVector = pairVector.filter(pair => pair[0] !== topicToDelete);

  // Redirect back to the main page
  res.redirect("/home");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

