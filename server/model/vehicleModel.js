var mongoose = require('mongoose');

//Vehicle Model
var vehicleSchema = new mongoose.Schema({
    status: {
        type: String
    },
    chassis: {
        type: String
    },
    capacity: {
        type: Number
    },
    finalCapacity: {
        type: Number
    },
    order: {
        type: Array
    }
}, {
    collection: 'vehicle'
});

module.exports = mongoose.model('vehicle', vehicleSchema);
