module.exports = function(app) {
    require('../controllers/userController.js')(app);
    require('../controllers/clientController.js')(app);
    require('../controllers/productsController.js')(app);
    require('../controllers/vehicleController.js')(app);
    require('../controllers/authenticationController.js')(app);
    require('../controllers/orderController.js')(app);
    require('../controllers/companyController.js')(app);
    require('../controllers/testController.js')(app);
    var express = require('express');
    var apiRoutes = express.Router();
    var path = require("path");
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: path.join(__dirname, '../public/images/orders'),
        filename: function(request, file, callback) {
            console.log(file);
            callback(null, file.originalname)
        }
    });

    var upload = multer({
        storage: storage
    });

    //Loggin route
    app.post('/authenticate', authenticate);

    //Secure api routes with token authentication
    apiRoutes.use(tokenProove);
    app.use('/api', apiRoutes);

    //Get public images
    // app.get('/*', function(req, res) {
    //     console.log(req.url);
    //     res.sendFile(req.url);
    // });

    //User routes
    apiRoutes.get('/users', findAllUsers);
    apiRoutes.get('/current', getCurrentUser);
    apiRoutes.get('/users/:id', findUserByID);
    apiRoutes.post('/users', addUser);
    apiRoutes.put('/users', updateUser);
    apiRoutes.delete('/users/:id', deleteUser);
    apiRoutes.get('/test/:id', sendProduct);

    //User routes
    app.get('/users', findAllUsers);
    app.get('/current', getCurrentUser);
    app.get('/users/:id', findUserByID);
    app.post('/users', addUser);
    app.put('/users', updateUser);
    app.delete('/users/:id', deleteUser);
    app.get('/test/:id', sendProduct);

    //Client routes
    apiRoutes.get('/clients', findAllClients);
    app.get('/client/:id', findClientByID);
    apiRoutes.post('/clients', addClient);
    apiRoutes.put('/clients', updateClient); //Revisar
    // app.delete('/clients', deleteClient);

    //Products routes
    app.get('/productsdb', findAllItemDB); //Find all products in database
    app.get('/productdb/:id', findItemByIDDB); //Find one product in QuickBooks
    app.get('/products', findAllItem); //Find all products in QuickBooks
    app.get('/product/:id', findItemByID); //Find a product in QuickBooks
    app.put('/product', updateItem);
    app.delete('/product/:id', deleteItem);

    //Item routes mobiles
    app.get('/productdbMobile', findAllItemDB); //Find all products in database
    app.get('/productdbMobile/:id', findItemByIDDB); //Find one product in QuickBooks
    apiRoutes.get('/productsMobile', findAllItemMobile); //Find all products in QuickBooks
    app.get('/productsMobile/:id', findItemByID); //Find a product in QuickBooks

    //Vehiculos Routes
    apiRoutes.get('/vehicles', findAllVehicles);
    apiRoutes.get('/vehicles/:id', findVehicleByID);
    apiRoutes.post('/vehicles', addVehicle);
    apiRoutes.put('/vehicles', updateVehicle);
    apiRoutes.delete('/vehicles/:id', deleteVehicle);

    //Vehiculos Routes
    app.get('/vehicles', findAllVehicles);
    app.get('/vehicles/:id', findVehicleByID);
    app.post('/vehicles', addVehicle);
    app.put('/vehicles', updateVehicle);
    app.delete('/vehicles/:id', deleteVehicle);


    //Order routes
    app.get('/order', findAllOrder);
    app.get('/order/:id', findOrderByID);
    //app.post('/order/:id', getCurrentOrder);
    app.post('/order', addOrder);
    app.put('/order', updateOrder);
    app.delete('/order', deleteOrder);


    //Order routes
    apiRoutes.get('/order', findAllOrder);
    apiRoutes.get('/order/:id', findOrderByID);
    //apiRoutes.post('/order/:id', getCurrentOrder);
    apiRoutes.post('/order', addOrder);
    apiRoutes.put('/order', updateOrder);
    apiRoutes.delete('/order', deleteOrder);

    //Order routes for mobile
    app.get('/orders', findAllOrderMobile);
    app.get('/orders/:id', findOrderByID);
    //app.post('/order/:id', getCurrentOrder);
    //app.post('/orders', addOrder);
    app.post('/orders', upload.single('image'), confirmOrderDelivery);
    app.put('/orders', updateOrder);
    app.delete('/orders', deleteOrder);


    //company routes
    app.get('/companies', findAllCompanies);
    app.get('/companies/:id', findCompanyByID); //Revisar
    app.post('/companies', addCompany);
    app.put('/companies', updateCompany); //Revisar
    app.delete('/companies/:id', deleteCompany);

};
