// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();

//Mongoose
var mongoUri = "mongodb://localhost:27017/Ecommerce";

// Controllers


// Express Middleware
app.use(bodyParser.json());
app.use(cors());
var mongoUri = 'mongodb://localhost:27017/mini-birds-mongoose';

mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
	console.log("Successsfully connected to mongodb");
});

app.use(express.static(__dirname + '/Frontend'));

// Endpoints

// Connetions

app.listen(3000, function() {
  console.log('listening on port: 3000');
});