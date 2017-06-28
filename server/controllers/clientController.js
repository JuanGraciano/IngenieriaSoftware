var user = require('../model/userModel.js');
var jwt = require('jsonwebtoken');
var erp;
var roles = require('../roles.js');
var config = require('../config.js');
var QuickBooks = require('node-quickbooks');
    qbo = new QuickBooks(config.consumerKey,
                         config.consumerSecret,
                         config.token,
                         config.tokenSecret,
                         config.realmId,
                         true, // use the Sandbox
                         false); // turn debugging on

var Errors = require("../errors");

module.exports = function(app) {

  //GET - Return all customer in Quickbook
  findAllClients = function(req, res) {
    var token = req.body.token || req.params.token || req.query.token || req.headers['x-access-token'];

    user.findOne({token: token}, function(err, currentUserObj){
      if(err)
        res.status(400).json("This user is not found");
      else{
        qbo.findCustomers({fetchAll: true}, function(err, data) {
         var customers = data.QueryResponse.Customer;
          var customerMobile = {};

          customers.forEach(customer => {
            customerMobile[customer.Id] = customer.DisplayName;
          });

          if(currentUserObj.role.toLowerCase() == roles.vendor || currentUserObj.role.toLowerCase() == roles.delivery){
            res.status(200).json(customerMobile);
          }
          else if(currentUserObj.role == roles.admin || currentUserObj.role == roles.superadmin){
            res.status(200).json(customers);
          }
          else{
            res.status(400).json({success: 'false', message: "This role cant use this function", role: currentUserObj.role});
          }
        });
      }
    });
  };

    //GET - Return a customer with specified ID
    findClientByID = function(req, res) {
        qbo.getCustomer(req.params.id, function(err, customer) {
            if (err) {
                res.status(404).json("User not found");
            } else {
                res.status(200).json({
                    id: customer.Id,
                    username: customer.DisplayName,
                    name: customer.GivenName,
                    lastname: customer.FamilyName,
                    telephone: (customer.PrimaryPhone) ? customer.PrimaryPhone.FreeFormNumber : '',
                    email: (customer.PrimaryEmailAddr) ? customer.PrimaryEmailAddr.Address : ''
                });
            };
        })
    };

    //POST - Insert a new clien in Quickbook
    addClient = function(req, res) {
        var qboUser =
            ({
                "Title": req.body.title,
                "GivenName": req.body.name,
                "FamilyName": req.body.lastname,
                "DisplayName": req.body.username,
                "PrimaryPhone": {
                    "FreeFormNumber": req.body.phone
                },
                "PrimaryEmailAddr": {
                    "Address": req.body.email
                }
            });
        qbo.createCustomer(qboUser, function(err, customer) {
            if (err)
                res.status(400).json("Something happen with this action");
            else
                res.status(200).json(qboUser)
        });
    };

    //PUT - Update a customer already exists in quickbook
    updateClient = function(req, res) {
      qbo.getCustomer(req.body.id, function(err, customer) {
          var upCus = {
            "Id": customer["Id"],
            "SyncToken": customer["SyncToken"],
            "DisplayName": customer["DisplayName"],
            "GivenName": req.body.name,
            "FamilyName": req.body.lastname,
            "PrimaryPhone": {
                "FreeFormNumber": req.body.phone
            },
            "PrimaryEmailAddr": {
                "Address": req.body.email
            }
          };
          qbo.updateCustomer(upCus, function(err, response) {
            if(err) {
              console.log("Quickbooks Error: ");
              console.log(err.Error);
              res.status(Errors.quickbooks.update[0]).json(
                {
                  success: false,
                  message: err.Error
                });
            }

            res.status(Errors.success.ok).json("Client " + upCus["Id"] + "was updated!");
          });
      });
    };

    //DELETE - Delete a user with specified ID
    deleteClient = function(req, res) {
      qbo.getCustomer(req.params.id, function(err, customer) {
          var delCus = {
            "Id": customer["Id"],
            "SyncToken": customer["SyncToken"],
            "DisplayName": customer["DisplayName"],
            "Active": false
          };
          qbo.updateCustomer(delCus, function(err, response) {
            if(err) {
              console.log("Quickbooks Error: ");
              console.log(err.Error);
              res.status(Errors.quickbooks.update[0]).json(
                {
                  success: false,
                  message: err.Error
                });
            }

            res.status(Errors.success.ok).json("Client " + delCus["Id"] + "was deleted!");
          });
      });
    };
};
