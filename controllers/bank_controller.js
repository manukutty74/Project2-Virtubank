var express = require("express");
var router = express.Router();
var db = require("../models");
var nodemailer = require('nodemailer');


// router.use(function(req,res){  //express catch middleware if page doesn't exist
// 	res.status(404);  //respond with status code
// 	res.render('404'); //respond with 404 page
// });

//Create all our routes and set up logic within those routes where required.
router.get("/login", function (req, res) {

  //res.send("Hello Word");
  res.sendFile(process.cwd() + "/public/assets/html/login.html");
});

router.get("/home", function (req, res) { 

  //res.send("Hello Word");
  res.sendFile(process.cwd() + "/public/assets/html/home.html");
});


// // findAll Customers
router.post("/customers", function (req, res) {

  db.Customer.findAll({}).then(function (dbCustomers) {

    const response = { 
      
      fulfillmentText : JSON.stringify(dbCustomers)
     
    }

    res.json(response);
  });

});



// findOne Customer

//router.post("/customer/:id", function (req, res) {

  router.post("/customer", function (req, res) {

    
  const CustomerID = req.body.queryResult.parameters.client_no;
  const WebhookID = req.body.queryResult.action;
  
    // This is for one client
    if (WebhookID==='get.one.client.details') 
    {
        db.Customer.findOne({where: {id: CustomerID},}).then(function (dbCustomers) {
        
          const response = { 
            
              fulfillmentText : JSON.stringify(dbCustomers)
              
          }

          res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify(response));
          res.json(response);

        });
      } 

   // This is for all clients 
   if (WebhookID==='get.all.clients.details') 
   {

  
    db.Customer.findAll({}).then(function (dbCustomers) {

      const response = { 
        
        fulfillmentText : JSON.stringify(dbCustomers)
       
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.json(response);

      
    });

   }

   // Get transactions for one client 

   if (WebhookID==='get.txns.for.one.client') 
   {
    const CustomerID = req.body.queryResult.parameters.client_No;
    db.Txnjournal.findAll({where: {customer_no:CustomerID},}).then(function (dbTxns) {

      const response = { 
        
        fulfillmentText : JSON.stringify(dbTxns)
       
      }
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
    });

  }

});


// findAll transactions Customers
// router.get("/txns/:id", function (req, res) {
//   console.log("inside txn route ");
//   const CustomerID = req.params.id;

//   db.Txnjournal.findAll({where: {customer_no:CustomerID},}).then(function (dbTxns) {

//     const response = { 
      
//       fulfillmentText : JSON.stringify(dbTxns)
     
//     }
//     res.setHeader('Content-Type', 'application/json');
//     res.json(response);
//   });

// });


module.exports = router;