var company = require('../model/companyModel.js');
module.exports = function(app) {

    //POST - Insert a new company in the DB
    addCompany = function(req, res) {
        console.log('POST');
        console.log(req.body);

        var newCompany = new company({
            companyID: req.body.companyID,
            companyNAME: req.body.companyNAME
        });

        newCompany.save(function(err, newCompany) {
            if (err) return res.send(500, err.message);
            res.status(200).json(newCompany);
        });
    };

    //GET - Return all companies in the DB
    // its, actually, "getAllComanies" rather than "findAllCompanies" 
    // as "findAllCompanies" implies a filter
    findAllCompanies = function(req, res) {
        company.find(function(err, companies) {
            if (err) res.send(500, err.message);
            else console.log('GET /companies')
            res.status(200).json(companies);
        });
    };

    //GET - Return a company with specified ID
    findCompanyByID = function(req, res) {
        company.findById(req.params.id, function(err, companies) {
            if (err) return res.send(500, err.message);
            else console.log('GET /companies/' + req.params.id);
            res.status(200).json(companies);
        });
    };

    //GET - Return a company with specified Name
    findCompanyByName = function(req, res) {
        company.findOne({
            'companyNAME': req.params.companyNAME
        }, function(err, companies) {
            if (err) return res.send(500, err.message);
            else console.log('GET /companies/' + req.params.companyNAME);
            res.status(200).json(companies);
        });
    };

    //DELETE - Delete a company with specified Name
    // falta validar si existe, y en caso de que no, que no explote
    deleteCompany = function(req, res) {
        company.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.send(500, err.message);
            else console.log('DELETE /companies/' + req.params.id);
            res.status(200).send("The company by the name: " + req.params.id + " has been deleted");
        });
    };

    //PUT - Update a company that already exists
    // falta validar si existe, y en caso de que no, que no explote
    updateCompany = function(req, res) {
        company.findById(req.body.id, function(err, newCompany) {
            var keys = Object.keys(req.body);
            keys.forEach(key => {
                if (key != "id") {
                    newCompany[key] = req.body[key];
                }
            });

            newCompany.save(function(err) {
                if (err) return res.send(500, err.message);
                res.status(200).json(newCompany);
            });
        });
    };
};