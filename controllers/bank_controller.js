var express = require("express");
var router = express.Router();
var db = require("../models");
var nodemailer = require('nodemailer');


// router.use(function(req,res){  //express catch middleware if page doesn't exist
// 	res.status(404);  //respond with status code
// 	res.render('404'); //respond with 404 page
// });

// Create all our routes and set up logic within those routes where required.
router.get("/login", function (req, res) {

  //res.send("Hello Word");
  res.sendFile(process.cwd() + "/public/assets/html/login.html");
});

router.get("/home", function (req, res) {

  //res.send("Hello Word");
  res.sendFile(process.cwd() + "/public/assets/html/home.html");
});


// findAll Customers
router.post("/customers", function (req, res) {

  db.Customer.findAll({}).then(function (dbCustomers) {


    const response = { 
      
      fullfillmentText : JSON.stringify(dbCustomers)
}
    res.json(response);

    


  });

});


router.post("/customer",(req,res) => {

   const data = req.body;

   const response = { 
      
         fullfillmentText : "Webhook works fine",
   }
    

  res.json(response);


});




module.exports = router;