var vehicle = require('./model/vehicleModel.js');
var user = require('./model/userModel.js');
var vehicleList = require('./model/vehicleListModel.js')


//Get Vehicle
getVehicle = function(current) {
    vehicle.find({}, function(err, vehicles) {
        if (err)
            console.log("klk");
        else {
            vehicleList.find(function(err, listVehicles) {
                if (listVehicles == "") {
                    console.log("klk");
                    var listDB = [];
                    vehicles.forEach(vehicleObj => {
                        if (vehicleObj.status == "disponible") {
                            (listDB).push(vehicleObj);
                        }
                    })
                    listObj = new vehicleList({
                        list: listDB
                    });
                    listObj.save();
                    current(null, listObj);
                } else {
                    console.log("HOLA");
                    current(null, listVehicles[0]);
                }
            })
        }
    })
}

exports.callme = function(order) {
    capacityCalculator(order);
}

//Calculate vehicle capacity
capacityCalculator = function(order) {
    getVehicle(function(error, current) {
        console.log(order);
        vehicle.findById(current.list[0]._id, function(err, vehicleObj) {
            if (err) {
                return ("An error occur");
            } else {
                console.log(vehicleObj);
                if ((vehicleObj.finalCapacity - order.box) < 0) {
                    if (vehicleObj.finalCapacity != vehicleObj.capacity) {
                        vehicleObj.status = "in use";
                        (current.list).pop();
                        vehicleObj.save();
                        current.save();
                        routeCalculator(vehicleObj._id);
                    }
                    capacityCalculator(order);
                } else if (vehicleObj.finalCapacity - order.box < 500) {
                    vehicleObj.finalCapacity -= order.box;
                    (vehicleObj.order).push(order);
                    routeCalculator(vehicleObj._id);
                    vehicleObj.status = "in use";
                    (current.list).pop();
                } else {
                    vehicleObj.finalCapacity -= order.box;
                    (vehicleObj.order).push(order);
                    console.log(vehicleObj.order);
                }
                vehicleObj.save();
                current.save();
                return ("true");
            }

        })
    })
};

routeCalculator = function(id) {

    vehicle.findById(id, function(err, vehicleObj) {
        var inOneHour = new Date().getTime() + 60 * 60 * 1000;
        google.directions({
            origin: {
                lat: "18.468191",
                lng: "-69.941745"
            },
            destination: {
                lat: "18.468180",
                lng: "-69.941740"
            },
            departure_time: inOneHour,
            mode: 'driving',
            waypoints: vehicleObj.order,
            alternatives: true,
            avoid: ['tolls', 'ferries'],
            traffic_model: 'pessimistic',
            optimize: true,
        }, function(err, results) {
            if (!err) {
                console.log(results.json.routes);
                result = results.json.routes[0].waypoint_order;
            }
            var x = 0;
            (vehicleObj.order).forEach(routes => {
                routes.position = result[x];
                x++;
            });
            console.log(vehicleObj.order);
            vehicleObj.save(function(err, vehicles) {
                if (err)
                    console.log(err);
                else
                    console.log(vehicles);
            });
        });
    })
};

//Get user by authentication token
exports.getUserByToken = function(req, res) {
    var token = req.body.token || req.params.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    user.findOne({
        token: token
    }, function(error, current) {
        if (error) {
            res(error);
        } else
            res(null, current);
    });
}
