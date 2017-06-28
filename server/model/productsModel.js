var mongoose = require('mongoose');

//User Model
var itemSchema = new mongoose.Schema({
    externalId: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    volumen: {
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        long: {
            type: Number,
            default: 0
        },
        box: {
            type: Number,
            default: 0
        }
    }
}, {
    collection: 'products'
});

module.exports = mongoose.model('products', itemSchema);
