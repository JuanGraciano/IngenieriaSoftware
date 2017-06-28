googleMapsClient = require('@google/maps')
google = googleMapsClient.createClient({key: "AIzaSyARDJW8U0TlIoSskbVeU8ZqLzLR9M9vZx8"});
var roles = require('../roles.js');
var error = require('../errors.js');
var vehicle = require('../model/vehicleModel.js');
var utility = require("../utility.js");
var errorToken = error.token;
var errorUser= error.user;
var warning = error.warning;
var success = error.success;
var errorDatabase = error.database;

/*
  @@@@@@@Params

  current = this is the user executing the action
  resultObj = this is the json return by the function
  newVehicleObj = the user the server is creating
  user = collection user from the database PaqueteXpress

*/

module.exports = function(app) {

//GET - Return all vehicles in the DB
  findAllVehicles = function(req, res) {
    utility.getUserByToken(req, function(error, currentUser){
      if(error){
        res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
      }
      else{
        if(currentUser.role == roles.admin || currentUser.role == roles.superadmin){
          vehicle.find(function(error, current) {
            if(error){ 
              res.status(warning.notFound[0]).send(warning.notFound[1]);
            }
            else {
              console.log('GET /vehicles');
              res.status(success.ok).json(current);
            }
          });
        }
        else{
          res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
        }
      }
    });
  };

//GET - Return a vehicle in the DB with de chassis
  findVehicleByID = function(req, res) {
    utility.getUserByToken(req, function(error, currentUser){
      if(error){
        res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
      }
      else{
        if(currentUser.role == roles.admin || currentUser.role == roles.superadmin){
        vehicle.findById(req.params.id, function(error, current) {
          if(error){
            res.status(warning.notFound[0].send(warning.notFound[1]));
          }
          else{ 
            console.log('GET /vehicles/' + req.params.id);
            res.status(success.ok).json(current);
          }
        });
      }
      else{
          res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
        }
      };
    });
  };

//POST - Create a vehicle
  addVehicle = function(req, res) {
    utility.getUserByToken(req, function(error, currentUser){
      if(error){
        res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
      }
      else{
        if(currentUser.role == roles.admin || currentUser.role == roles.superadmin){
          console.log('POST');
          var newVehicleObj = new vehicle({
            status:         req.body.status,
            capacity:       req.body.capacity,
            chassis:        req.body.chassis,
            finalCapacity:  req.body.capacity,
            order: []
          });
          newVehicleObj.save(function(error, resultObj) {
            if(error){
              res.status(errorDatabase.create[0].send(errorDatabase.create[1]));
            }
            else{
              res.status(success.ok).json(resultObj);
            }
          });
        }
        else{
          res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
        }
      }
    });
  };

//PUT - Update a vehicle already exists
  updateVehicle = function(req, res) {
    utility.getUserByToken(req, function(error, currentUser){
      if(error){
        res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
      }
      else{
        if(currentUser.role == roles.admin || currentUser.role == roles.superadmin){
          vehicle.findById(req.body.id, function(err, current) {
            if(err)
              res.status(warning.notFound[0].send(warning.notFound[1]));
            else{
              var keys = Object.keys(req.body);
              keys.forEach(key => {
                if(key != "id"){
                  current[key] = req.body[key];
                }
              });
              current.save(function(err, resultObj) {
              if(err) {
                res.status(errorDatabase.update[0].send(errorDatabase.update[1]));
              }
              else
                res.status(success.ok).json(resultObj);   
              });
            }
          });
        }
        else{
          res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
        }
      }
    });  
  };

//DELETE - Delete a vehicle in the DB with de chassis
  deleteVehicle = function(req, res) {
    utility.getUserByToken(req, function(error, currentUser){
      if(error){
        res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
      }
      else{
        if(currentUser.role == roles.admin || currentUser.role == roles.superadmin){
          vehicle.findByIdAndRemove(req.params.id, function(err) {
            if(err){
              return res.status(errorDatabase.delete[0]).send(errorDatabase.delete[1]);
            }
            else{
              console.log('DELETE /vehicles/');
              res.status(success.ok).send("Vehicle with the chassis " + req.body.id + " Deleted");
            }
          });
        }
        else{
          res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
        }
      }
    });
  }
};
