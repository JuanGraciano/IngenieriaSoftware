var mongoose = require('mongoose');
var vehicle = require('../model/vehicleModel.js');

//User Model
var userSchema = new mongoose.Schema({
  name:    { type: String },
  username:     { type: String },
  password:  { type: String },
  phone:  { type: String},
  email:      {type: String},
  role:     { type: String},
  token:    {type: String},
  status:    {type: String},
  vehicle:    {type: String},
}, {collection: 'user'});

module.exports = mongoose.model('user', userSchema);
