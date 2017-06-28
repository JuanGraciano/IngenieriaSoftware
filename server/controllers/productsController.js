var item = require('../model/productsModel.js');
//var jwt = require('jsonwebtoken');
var erp;
var QuickBooks = require('node-quickbooks');
var config = require('../config.js');
qbo = new QuickBooks(config.consumerKey,
    config.consumerSecret,
    config.token,
    config.tokenSecret,
    config.realmId,
    true, // use the Sandbox
    true); // turn debugging on

// Transform an quickbook's item into a product friendly for mobile
function ItemToProduct(item) {
    product = {
        name: item.Name,
        price: item.UnitPrice
    };

    return product;
}

module.exports = function(app) {

    //Get item by id. Retrieves the Item from database
    findAllItemDB = function(req, res) {
        item.find(function(err, products) {
            if (err) res.send(500, err.message);
            else {
                var productList = []
                products.forEach(product => {
                    productList.push(product)
                })
                console.log(productList);
                res.status(200).json(productList);
            }
        })
    };

    /****************************************************************/

    //Find one products in database
    findItemByIDDB = function(req, res) {
        //console.log(req.params.id);
        item.findOne({
            "externalId": req.params.id
        }, function(err, item) {
            if (err) res.status(404).json("Product not found in database"); //modificar mensaje
            else {
                res.status(200).json(item);
            };
        });
    };

    /****************************************************************/

    //GET - Return all Item in Quickbook.
    findAllItem = function(req, res) {
        qbo.findItems({ // Finds all Items in QuickBooks, optionally matching the specified criteria
            fetchAll: true
        }, function(err, items) {
            if (err) {
                res.status(400).json("Something happen with this function") //modificar mensaje
            } else {
                var products = [];
                items.QueryResponse.Item.forEach(product => {
                    item.findOne({
                        "externalId": product.Id
                    }, function(err, detail) {
                        if (detail == null) {
                            var productDB = new item({
                                externalId: product.Id,
                                name: product.Name,
                                price: product.UnitPrice,
                                volumen: {
                                    width: 0,
                                    height: 0,
                                    long: 0,
                                    box: 0
                                }
                            })
                            productDB.save(function(err, prod) {
                                if (err) console.log("todo salio mal"); //modificar mensaje
                                else console.log("todo salio bien " + prod); //modificar mensaje
                            });
                        }
                    });
                    products.push(product);
                });
                res.status(200).json(products);
            }

        });
    };


    /****************************************************************/

    findAllItemMobile = function(req, res) {
        qbo.findItems({ // Finds all Items in QuickBooks, optionally matching the specified criteria
            fetchAll: true
        }, function(err, items) {
            if (err) {
                res.status(400).json("Something happen with this function") //modificar mensaje
            } else {
                //console.log('GET /item');
                var products = {};
                items.QueryResponse.Item.forEach(product => {
                    //console.log(x + "-) " + product.Id);
                    products[product.Id] = ItemToProduct(product);
                });

                res.status(200).json(products);
            };
        })
    };

    //Get item by id. Retrieves the Item from QuickBooks
    findItemByID = function(req, res) {
        console.log(req.params.id);
        qbo.getItem(req.params.id, function(err, item) {
            if (err) res.status(404).json("Product not found"); //modificar mensaje
            else {
                res.status(200).json({
                    itemId: item.Id,
                    Name: item.Name,
                    Description: item.Description,
                    UnitPrice: item.UnitPrice,
                    Type: item.Type,
                    IncomeAccountValue: item.IncomeAccountRef.value,
                    IncomeAccountName: item.IncomeAccountRef.name
                });
            };
        });
    };

    /****************************************************************/

    //PUT - Update a register already exists
    updateItem = function(req, res) {

        item.findById(req.body._id, function(err, updateProduct) { //Find a product with mongo _id
            //console.log("id: " + updateProduct.id);
            if (err)
                res.status(500).json("This product does not exist"); //modificar mensaje
            else {
                var pvWidth = 0,
                    pvLong = 0,
                    pvHeidht = 0,
                    pvBox = 0;

                if (req.body.volumen.width)
                    pvWidth = req.body.volumen.width;
                if (req.body.volumen.height)
                    pvHeidht = req.body.volumen.height;
                if (req.body.volumen.long)
                    pvLong = req.body.volumen.long;
                if (req.body.volumen.box)
                    pvBox = req.body.volumen.box;
                if (pvWidth > 0 && pvLong > 0 && pvHeidht > 0 && pvBox <= 0) //data validation 
                    pvBox = pvWidth * pvLong * pvHeidht;

                //Updating data
                updateProduct.volumen.width = pvWidth;
                updateProduct.volumen.height = pvHeidht;
                updateProduct.volumen.long = pvLong;
                updateProduct.volumen.box = pvBox;

                updateProduct.save(function(err, product) {
                    if (err)
                        res.status(500).json(err.message); //modificar mensaje
                    else
                        res.status(200).json(product);
                });
            };
        });
    };
    /******************************************************************************/
    //DELETE - Delete a product with specified ID
    deleteItem = function(req, res) {
        item.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.send(500, err.message); //modificar mensaje
            res.status(200).send("Item with the id " + req.params.id + " has been Deleted");
        });
    };
};
