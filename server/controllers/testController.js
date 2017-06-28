var vehicle = require('../utility.js');

var product = ({
  id: 3,
  box: 50,
  lat: "18.486373",
  lng: "-69.941125",
  name: "diamon mall",
  stopover: true
});

var product2 = ({
  id: 4,
  box: 100,
  lat:"18.472018",
  lng:"-69.956436",
  name: "lo prado",
  stopover:true  
});

var product3 = ({
  id:5,
  box: 100,
  lat:"18.469110", 
  lng: "-69.939603", 
  name: "acropolis",
  stopover:true
});

module.exports = function(app) {

  sendProduct = function(req, res) {
    console.log(req.params.id);
    // vehicle.capacityCalculator(req.params.id, product3);
    vehicle.routeCalculator(req.params.id);
    res.status(200).send("ok");
    // vehicle.capacityCalculator(res.params.id, Product2);
  }

};