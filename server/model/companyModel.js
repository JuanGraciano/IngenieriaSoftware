var mongoose = require('mongoose');

//Company Model
var companySchema = new mongoose.Schema({
    companyID: {
        type: String
    }, // unique id of the quickbook company
    companyNAME: {
        type: String
    }, //
    status: {
        type: String
    }
}, {
    collection: 'company'
});

module.exports = mongoose.model('company', companySchema);
