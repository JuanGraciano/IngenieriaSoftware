var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    cors = require('cors'),
    config = require('./config'),
    user = require('./model/userModel.js'),
    vehicle = require('./model/vehicleModel.js');
company = require('./model/companyModel.js');

//mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
    next();
});

var router = express.Router();



app.use(router);
// app.use(morgan);
require('./app/routes.js')(app);
//Conect to database
mongoose.connect(config.database, function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else
        console.log("Connected to the db");

    //Create the server and listen in the port 3000
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
});
