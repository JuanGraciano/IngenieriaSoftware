var user = require('../model/userModel.js');
var utility = require("../utility.js");
var error = require('../errors.js');
var roles = require('../roles.js');
var errorToken = error.token;
var errorUser = error.user;
var warning = error.warning;
var success = error.success;
var errorDatabase = error.database;

/*
  @@@@@@@Params

  current = this is the user executing the action
  resultObj = this is the json return by the function
  newUserObj = the user the server is creating
  user = collection user from the database PaqueteXpress

*/


module.exports = function(app) {


  //GET - Return all users in the DB
  findAllUsers = function(req, res) {
    user.find(function(err, current) {
      if (err){
        res.status(errorUser.userEmpty[0].send(errorUser.userEmpty[0]));
      }
      else {
        console.log('GET /users');
        res.status(success.ok).json(current);
      }
    });
  };

  //Get current user
  getCurrentUser = function(req, res) {
    utility.getUserByToken(req, function(error, current) {
      if(error){
        res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[0]);
      }
      else{
        res.status(success.ok).json({
          id: current.username,
          status: current.status,
          role: current.role
        });
      }
    });
  }

  //GET - Return a user with specified ID
  findUserByID = function(req, res) {
    console.log(req.params.id);
    user.findById(req.params.id, function(err, current) {
      if (err) {
        return res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1]);
      }
      else {
        console.log('GET /users/' + req.params.id);
        res.status(success.ok).json(current);
      }
    });
  };

  //POST - Insert a new user in the DB
  addUser = function(req, res) {
    user.findOne({username: req.body.username}, function(err, current) {
      if(err){
        res.status(warning.badRequest[0]).send(err);
      }
      if (current != null){
        res.status(errorUser.userExist[0]).send(errorUser.userExist[1]);
      }
      else {
        console.log('POST');
        var newUserObj = new user({
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          phone: req.body.phone,
          token: false,
          role: req.body.role,
          status: req.body.status,
          email: req.body.email
        });
        newUserObj.save(function(err, resultObj) {
          if (err){
            return res.status(errorDatabase.create[0]).send(errorDatabase.create[1]);
          }
          else{
            res.status(success.created).json(resultObj);
          }
        });
      };
    });
  };

  //PUT - Update a register already exists
  updateUser = function(req, res) {
    utility.getUserByToken(req, function(error, current) {
      if(error){
        res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1])
      }
      else{
        switch(current.role) {

          case(roles.superadmin || roles.admin): 
            console.log('PUT /users/' + req.body.id);
            user.findById(req.body.id, function(error, userObj) {
              if(error){
                res.status(warning.notFound[0]).json(warning.notFound[1]);
              }
              else{
                var keys = Object.keys(req.body);
                keys.forEach(key => {
                  if(key != "id" && key != "token" && key != "username" ){
                    userObj[key] = req.body[key];
                  }
                });
              };
              userObj.save(function(err, resultObj) {
                if(err){
                  res.status(errorDatabase.update[0]).json(errorDatabase.update[1]);
                }
                else{
                  res.status(success.ok).json(resultObj);
                }
              });
            });
            break;

          case(roles.vendor):
            var keys = Object.keys(req.body);
            keys.forEach(key => {
              if(key != "id" && key != "token" && key != "username" ){
                current[key] = req.body[key];
              }
            });
            current.save(function(err, resultObj) {
              if(err){
                res.status(errorDatabase[0]).json({result: false});
              }
              else{
                res.status(success.ok).json({result: true});
              };
            });
            break;
          
          defaul:
            res.status(warning.methodNotAllow[0]).send(warning.methodNotAllow[1]);
            break;
        }
      };
    });
  };

  //DELETE - Delete a user with specified ID
  deleteUser = function(req, res) {
    utility.getUserByToken(req, function(current, error){
      if(error){
        res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1])
      }
      else{
        if(current.role == roles.admin || current.role == roles.superadmin){
          if(current.id == req.params.id){
            res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
          }
          else{
            user.findByIdAndRemove(req.params.id, function(err) {
              if (err){
                res.status(errorUser.userNotFound[0]).send(errorUser.userNotFound[1]);
              }
              else { 
                res.status(success.ok).send("User with the id " + req.params.id + " Deleted");
              }
            });
          }
        }
        else{
          res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
        }
      }
    })
  };
};
