module.exports = function(app) {

    addImage = function(req, res) {
        console.log("hola");
        console.log(req.files);
        console.log(req.body);
        res.status(200).json({
            result: true
        });
    };
};

var vehicle = require('../model/vehicleModel.js');
var user = require('../controllers/userController.js');
var item = require('../controllers/productsController.js');
var utility = require("../utility.js");
var product = require('../model/productsModel.js');
var orderModel = require('../model/orderModel.js');
var orderDB = require('../model/orderModel.js');
var error = require('../errors.js');
var utility = require("../utility.js");
var roles = require('../roles.js');
var Promise = require('promise');
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

// Transform an quickbook's receipt into an order friendly for mobile
function ReceiptToOrder(receipt) {

    var productList = {};

    receipt.Line.forEach(product => {
        try {
            productLine = product.SalesItemLineDetail;
            itemRef = productLine.ItemRef;

            productList[itemRef.value] = {
                name: itemRef.name,
                price: productLine.UnitPrice,
                qty: productLine.Qty
            };
        } catch (e) {}
    });

    var order = {
        clientName: receipt.CustomerRef.name,
        productList: productList,
        address: {
            latitude: receipt.BillAddr.Lat,
            longitude: receipt.BillAddr.Long
        },
        date: receipt.MetaData.CreateTime,
        status: receipt.PrintStatus
    };

    return order;
}

module.exports = function(app) {


    //GET - Return all order in Quickbook.
    findAllOrder = function(req, res) {
        utility.getUserByToken(req, function(error, currentUser) {
            if (error) {
                res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
            } else {
                console.log("===========================" + currentUser.role + "=========================");
                if (currentUser != undefined && currentUser.role != undefined) {
                    switch (currentUser.role) {
                        case roles.superadmin:
                        case roles.admin:
                            qbo.findSalesReceipts({
                                fetchAll: true
                            }, function(err, order) { // Finds all SalesReceipts in QuickBooks, optionally matching the specified criteria
                                if (err) res.status(400).json("Something happen with this function"); //modificar mensaje
                                else {
                                    var orderResponse = [];
                                    order.QueryResponse.SalesReceipt.forEach(singleOrder => {
                                        // productMobile[x] = {
                                        //     productId: sale.Line[x].SalesItemLineDetail.ItemRef.value,
                                        //     name: sale.Line[x].SalesItemLineDetail.ItemRef.name,
                                        //     qty: sale.Line[x].SalesItemLineDetail.Qty,
                                        //     price: sale.Line[x].SalesItemLineDetail.UnitPrice
                                        //     saleId: sale.Id,
                                        //     clientValue: sale.CustomerRef.value,
                                        //     clientName: sale.CustomerRef.name,
                                        //     address: {
                                        //         latitude: item.lat,
                                        //         longitude: item.lng
                                        //     },
                                        //     productList: productMobile,
                                        //     date: sale.MetaData.CreateTime,
                                        //     status: item.status
                                        //
                                        // }
                                        orderResponse.push(singleOrder);
                                    });
                                    res.status(200).json(orderResponse);
                                }
                            });
                            break;
                        case roles.vendor:
                            orderModel.find({
                                "IdSeller": currentUser._id
                            }, function(err, list) {
                                if (err) {
                                    res.send(500, err.message);
                                } else {
                                    var orderResponse = {};
                                    list.forEach(singleOrder => {
                                        orderResponse[singleOrder.Id] = ReceiptToOrder(singlerOrder)
                                    });
                                    res.status(200).json(orderResponse);
                                }
                            });
                            break;

                            defaul:
                                res.status(warning.methodNotAllow[0]).send(warning.methodNotAllow[1]);
                            break;
                    }
                } else {
                    res.status(401).send("no autorizado");
                }

            }
        });
    };

    findAllOrderMobile = function(req, res) {
        qbo.findSalesReceipts({
            fetchAll: true
        }, function(err, order) { // Finds all SalesReceipts in QuickBooks, optionally matching the specified criteria
            if (err) {
                console.log(err);
                res.status(400).json("Something happen with this function"); //modificar mensaje
            } else {
                //console.log('GET /item');

                var receiptList = order.QueryResponse.SalesReceipt;
                var ordersMobile = {};

                for (var i in receiptList) {
                    var receipt = receiptList[i];

                    try {
                        ordersMobile[receipt.Id] = ReceiptToOrder(receipt);
                    } catch (err) {
                        if (receipt.Id !== undefined)
                            console.log('Error when getting the order with id: ' + receipt.Id + ', error = ' + err.message);
                        else
                            console.log('Error when getting an order without Id, error = ' + err.message);
                    }
                }
                res.status(200).json(ordersMobile);
            }
        });
    };

    //Get order by id. Retrieves the Item from QuickBooks
    findOrderByID = function(req, res) {
        console.log(req.params.id);
        qbo.getSalesReceipt(req.params.id, function(err, sale) { //Retrieves the SalesReceipt from QuickBooks
            if (err)
                res.status(404).json("Order not found"); //modificar mensaje
            else {
                var productMobile = [];
                var x = 0;
                sale.Line.forEach(product => {
                    console.log(product);
                    if (product.SalesItemLineDetail != null) {
                        productMobile[x] = {
                            productId: sale.Line[x].SalesItemLineDetail.ItemRef.value,
                            name: sale.Line[x].SalesItemLineDetail.ItemRef.name,
                            qty: sale.Line[x].SalesItemLineDetail.Qty,
                            price: sale.Line[x].SalesItemLineDetail.UnitPrice
                        };
                    }
                    x += 1;
                });
                orderModel.findOne({
                    "IdQB": req.params.id
                }, function(err, item) {
                    if (err) {
                        res.status(404).json("Order not found");
                    } else {
                        res.status(200).json({
                            saleId: sale.Id,
                            clientValue: sale.CustomerRef.value,
                            clientName: sale.CustomerRef.name,
                            address: {
                                latitude: item.lat,
                                longitude: item.lng
                            },
                            productList: productMobile,
                            date: sale.MetaData.CreateTime,
                            status: item.status

                        });
                    };
                });
            }
        });
    };

    /****************************************************************/

    //Get price of one product
    function getPrice(req) {
        return new Promise(function(resolve, reject) {

            qbo.findItems({ // Finds all Items in QuickBooks, optionally matching the specified criteria
                fetchAll: true
            }, function(err, items) {
                if (items == null) {
                    reject(err);
                } else {
                    //console.log(req.body);
                    var j = 0;
                    var idLine = 1;
                    var order = [];
                    console.log(items);
                    var keys = Object.keys(req.body.productList);
                    keys.forEach(key => {
                        for (var i in items.QueryResponse.Item) {
                            if (items.QueryResponse.Item[i].Id == keys[j]) {
                                var item = {
                                    "Id": idLine,
                                    "Amount": (items.QueryResponse.Item[i].UnitPrice * req.body.productList[key]),
                                    "DetailType": "SalesItemLineDetail",
                                    "SalesItemLineDetail": {
                                        "ItemRef": {
                                            "value": keys[j]
                                        },
                                        "Qty": req.body.productList[key],
                                        "UnitPrice": items.QueryResponse.Item[i].UnitPrice,
                                        "TaxCodeRef": {
                                            "value": "NON"
                                        }
                                    }
                                }
                                order.push(item);
                                idLine++;
                            }
                        }
                        j++;
                    });
                    resolve(order);
                }
            });
        });
    }

    /****************************************************************/

    function getBox(req) {
        return new Promise(function(resolve, reject) {
            product.find(function(err, item) {
                if (err) {
                    return reject(err);
                } else {
                    var sizeBox = 0;
                    var keys = Object.keys(req.body.productList);
                    var j = 0;

                    keys.forEach(key => {
                        for (var i in item) {
                            if (item[i].externalId == keys[j]) {
                                sizeBox += parseInt(item[i].volumen.box) * req.body.productList[key];
                                j++;
                                break;
                            }
                        }
                    });
                    resolve(sizeBox);
                };
            });
        })
    }

    /****************************************************************/

    //POST - Insert a new Item in Quickbook
    addOrder = function(req, res) {
            //{idClient, productList: {productId: Qty,..}, address : {latitude:, longitude:}, date, status}
            utility.getUserByToken(req, function(error, currentUser) {
                if (error) {
                    res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
                } else {
                    if (currentUser.role == roles.vendor) {
                        Promise.all([
                            getPrice(req),
                            getBox(req)
                        ]).then(function(data) {
                            if (data[1] <= 0) {
                                res.status(400).json({
                                    result: currentUser._id //modificar mensaje
                                });
                                return;
                            }

                            var dataOrder = ({
                                "CustomerRef": {
                                    "value": req.body.idClient
                                },
                                "MetaData": {
                                    "CreateTime": req.body.date
                                },
                                "Line": data[0],
                                "ShipAddr": {
                                    "Lat": req.body.address.latitude,
                                    "Long": req.body.address.longitude
                                },
                            });

                            qbo.createSalesReceipt(dataOrder, function(err, order) { //Creates the SalesReceipt in QuickBooks
                                if (err) {
                                    res.status(400).json({
                                        result: "false" //modificar mensaje
                                    });
                                } else {
                                    var orderdb = new orderDB({
                                        IdQB: order.Id,
                                        IdSeller: currentUser._id,
                                        IdClient: order.CustomerRef.name,
                                        status: req.body.status,
                                        lat: req.body.address.latitude,
                                        lng: req.body.address.longitude,
                                        box: data[1],
                                        imagePathDelivery: "",
                                        imagePathSeller: ""
                                    });
                                    orderdb.save(function(err, dborder) {
                                        if (err) {
                                            res.status(400).json({
                                                result: "false" //modificar mensaje
                                            });
                                        } else {
                                            utility.callme({
                                                id: dborder.IdQB,
                                                lat: dborder.lat,
                                                lng: dborder.lng,
                                                box: dborder.box
                                            })
                                            res.status(200).json({
                                                result: "true" //modificar mensaje
                                            });
                                        }
                                    });
                                }
                            })
                        })
                    } else {
                        res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]);
                    }
                }
            });
        }
        /****************************************************************/

    //PUT - Update a register already exists
    updateOrder = function(req, res) {
        utility.getUserByToken(req, function(error, currentUser) {
            if (error) {
                res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
            } else {
                if (currentUser.role == roles.admin || currentUser.role == roles.superadmin || currentUser.role == roles.vendor) {
                    //console.log("====================Entrando==================");
                    orderModel.findOne({
                        "IdQB": req.body.IdQB
                    }, function(err, order) {
                        order.status = req.body.status;
                        order.save(function(err, savedOrder) {
                            if (err)
                                res.status().json(err.message);
                            else
                                res.status(200).json(savedOrder);
                        });
                    })
                } else {
                    res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]); //modificar
                }
            }
        });
    };

    /******************************************************************************/

    //DELETE - Delete a user with specified ID
    deleteOrder = function(req, res) {
        item.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.send(500, err.message);
            orderModel.findOne({
                "IdQB": req.params.id
            }, function(err, order) {
                order.status = "Cancelada";
                order.save(function(err, savedOrder) {
                    if (err)
                        res.status(500).json(err.message);
                });
            })
            res.status(200).send("Order with the id " + req.params.id + " has been Deleted");
        });
    };

    orderAssing = function(req, res) {
        utility.getUserByToken(req, function(error, currentUser) {
            vehicle.findOne({
                user: currentUser.id
            }, function(err, vehicle) {
                if (!err) {
                    orders = {};
                    var index = 0;
                    vehicle.order.forEach(order => {
                        orders[order.IdQB] = index;
                        index++;
                    })
                    res.status(200).json(orders)
                }
            })
        });
    }
    confirmOrderDelivery = function(req, res) {
        if (req.file) {
            console.dir(req.file);
            console.log('File');
            return res.end('Thank you for the file');

            orderModel.findOne({
                    IdQB: req.file.filename.split(".")[0]
                },
                function(err, current) {
                    if (current == null) {
                        res(error);
                    } else {
                        current.imagePathDelivery = req.file.path;
                        current.save(function(err, orderObj) {
                            if (err) {
                                res.status(errorDatabase.update[0]).json(errorDatabase.update[1]);
                            } else {
                                res.status(success.ok).json(orderObj);
                            }
                        });
                    }
                });
        } else {
            console.log("no file");
            res.end('Missing file');
        }
    };
};
