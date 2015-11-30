// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();

//Mongoose
var mongoUri = "mongodb://localhost:27017/Chatroom";

// Controllers


// Express Middleware
app.use(bodyParser.json());
app.use(cors());

// Connetions
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
	console.log("Successsfully connected to mongodb");
});

app.use(express.static(__dirname + '/Frontend'));

// Endpoints

//listening
app.listen(3000, function() {
  console.log('listening on port: 3000');
});