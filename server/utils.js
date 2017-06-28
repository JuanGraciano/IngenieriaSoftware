//export dependencies
 module.exports = function(){
  var express = require("express");
  var bodyParser = require("body-parser");
  var morgan = require("morgan");
  var methodOverride = require("method-override");
  var mongoose = require('mongoose');
  var config = require('./config');
  var user = require('./model/userModel.js');
  var vehicle = require('./model/vehicleModel.js');
  var jwt = require('jsonwebtoken');
  var apiRoutes = express.Router();
  var app = require("express");
};

//Export controllers
module.export = function(app){
  var user = require('/controllers/userController.js')(app); 
  var vehicle = require('/controllers/vehicleController.js')(app); 
  var auth = require('/controllers/authenticationController.js')(app); 
}

//Export model
module.export = function(model){
  user = require('./model/userModel.js');
  vehicle = require('/model/vehicleModel.js')
}