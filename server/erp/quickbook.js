var QuickBooks = require('node-quickbooks');
var config = require('../config.js');
    qbo = new QuickBooks(config.consumerKey,
                         config.consumerSecret,
                         config.token,
                         config.tokenSecret,
                         config.realmId,
                         true, // use the Sandbox
                         false); // turn debugging on

module.exports = function(erp){
  addUserQuickbook = function(req) {
    // console.log(req);
   var qboUser = 
   ({
      "Title": req.title,
      "GivenName": req.name,
      "FamilyName": req.lastname,
      "DisplayName": req.username,
      "PrimaryPhone": {
          "FreeFormNumber": req.phone
      },
      "PrimaryEmailAddr": {
          "Address": req.email
      }   
    });
    qbo.createCustomer(qboUser, function(err, customer) {
      // console.log(customer);
    });
  };
 };
  