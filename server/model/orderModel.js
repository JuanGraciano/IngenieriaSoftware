var mongoose = require('mongoose');

//Company Model
var OrderSchema = new mongoose.Schema({
    IdQB: {
        type: String
    },
    IdSeller: {
        type: String,
        default: ""
    },
    IdClient: {
        type: String
    },
    status: {
        type: String
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    box: {
        type: Number
    },
    imagePathDelivery: {
        type: String,
        default: ""
    },
    imagePathSeller: {
        type: String,
        default: ""
    }
}, {
    collection: 'order'
});

module.exports = mongoose.model('order', OrderSchema);
