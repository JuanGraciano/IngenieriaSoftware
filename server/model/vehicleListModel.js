var mongoose = require('mongoose');

//Vehicle Model
var listVehicleSchema = new mongoose.Schema({
    list: {type: Array}
}, {
    collection: 'listVehicle'
});

module.exports = mongoose.model('listVehicle', listVehicleSchema);
