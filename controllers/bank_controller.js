var express = require("express");
var router = express.Router();
var db = require("../models");
var nodemailer = require('nodemailer');


// router.use(function(req,res){  //express catch middleware if page doesn't exist
// 	res.status(404);  //respond with status code
// 	res.render('404'); //respond with 404 page
// });

// Create all our routes and set up logic within those routes where required.
// router.get("/login", function (req, res) {

//   //res.send("Hello Word");
//   res.sendFile(process.cwd() + "/public/assets/html/login.html");
// });

// router.get("/home", function (req, res) {

//   //res.send("Hello Word");
//   res.sendFile(process.cwd() + "/public/assets/html/home.html");
// });


// // findAll Customers
// router.post("/customers", function (req, res) {

//   db.Customer.findAll({}).then(function (dbCustomers) {

//     const response = { 
      
//       fulfillmentText : JSON.stringify(dbCustomers)
     
//     }

//     res.json(response);
//   });

// });



// findOne Customer

//router.post("/customer/:id", function (req, res) {

  router.post("/customer", function (req, res) {

    
  const CustomerID = req.body.parameters.client_no;

  
  db.Customer.findOne({where: {id: CustomerID},}).then(function (dbCustomers) {
  
    const response = { 
      
        fulfillmentText : JSON.stringify(dbCustomers)
      //fulfillmentText : "Webhook for id works fine for ID : " + req.params.id
      //  fulfillmentText : req.body.queryResult.queryText.parameters
     
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
    //res.json(response);

    


  });

});



// router.post("/test",(req,res) => {

//    const data = req.body;

//    const response = { 
      
//          fulfillmentText : req.body.result['action']

//    }
    

//   res.json(response);


// });




module.exports = router;