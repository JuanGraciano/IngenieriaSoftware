var express = require('express');
var jwt = require('jsonwebtoken');
var apiRoutes = express.Router();
var user = require('../model/userModel.js');
module.exports = function(app) {

    tokenProove = function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.params.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(401).send({
                success: false,
                message: 'No token provided.'
            });

        }
    };

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    authenticate = function(req, res) {
        // find the user
        console.log(req.body);
        user.findOne({
            username: req.body.username
        }, function(err, currentUser) {
            if (err) throw err;
            if (!currentUser) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (currentUser) {
                // check if password matches
                if (currentUser.password != req.body.password) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

                    // if user is found and password is right
                    // create a token
                    currentUser.token = 0;
                    currentUser.token = jwt.sign(currentUser, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });

                    //link user with token

                    currentUser.save(function(err) {
                        if (err) return res.send(500, err.message);
                    });
                    console.log("tamo aqui");
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: currentUser.token,
                        name: currentUser.name
                    });
                }
            }
        });
    };
};
