//////////////////////////////////////////
// Importing our dependencies
//////////////////////////////////////////
require("dotenv").config(); // get our .env variables 
const express = require('express'); // web framework
const mongoose = require('mongoose'); // Object document Manager (Work With DB)
const methodOverride = require('method-override'); //override request methods
const morgan = require("morgan"); // be used for logging 

//////////////////////////////////////////
// Set up database connection
//////////////////////////////////////////
// loading DB url
const DATABASE_URL = process.env.DATABASE_URL;

// establish connection
mongoose.connect(DATABASE_URL);

// save the connection
const cxn = mongoose.connection;

//setup mongoose connection message
cxn
.on ("connected", () => console.log('Mongo Connection has connected!'))
.on ("disconnected", () => console.log('Mongo Connection has disconnected!'))
.on ("error", (err) => console.log(err))

//////////////////////////////////////////
// Schemas and models 
//////////////////////////////////////////

//////////////////////////////////////////
// Create Express Application 
//////////////////////////////////////////
const app = express();

//////////////////////////////////////////
// Middleware - app.use(middleware function)
//////////////////////////////////////////
app.use(methodOverride("_method")); // override request methods for form submissions
app.use(morgan("dev")); // log every HTTP request
app.use(express.urlencoded({ extended: true })); // parse html form bodies into req.body
app.use("/static", express.static("static")); // serve files statically

//////////////////////////////////////////
// Routes
//////////////////////////////////////////
app.get('/', (req, res) => {
	res.send("<h1>Hello World</h1>");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`listening on port: `, PORT)});
