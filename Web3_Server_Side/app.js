// const express = require('express');
// const bodyParser = require('body-parser');
// const contractController = require('./controllers/contractController');
// const cors = require("cors")
// const app = express();
// const port = 3000;

// const corsOptions = {
//     origin: 'http://127.0.0.1:5173', // Change this to your client's address
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// // Set view engine to ejs
// app.set('view engine', 'ejs');

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors(corsOptions));

// // Routes
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.post('/createPoll', contractController.createPoll);
// app.post('/vote', contractController.vote);
// app.post('/endPoll', contractController.endPoll);
// app.get('/viewPoll', contractController.viewPoll);
// app.get('/getResults', contractController.getResults);

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const contractController = require("./controllers/contractController");
const cors = require("cors");

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: "http://127.0.0.1:5173", // Allow requests from this origin
  methods: ["GET", "POST"], // Allow specific methods
  allowedHeaders: ["Content-Type"], // Allow specific headers
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine to ejs
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/createPoll", contractController.createPoll);
app.post("/vote", contractController.vote);
app.post("/endPoll", contractController.endPoll);
app.get("/viewPoll", contractController.viewPoll);
app.get("/getResults", contractController.getResults);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
