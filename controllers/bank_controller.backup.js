var express = require("express");
var router = express.Router();
var db = require("../models");
var nodemailer = require('nodemailer');




// // findAll Customers
router.post("/customers", function (req, res) {
  
  db.Customer.findAll({}).then(function (dbCustomers) {
   // db.Txnjournal.findAll({where: {customer_no:10001},}).then(function (dbCustomers) {
    const response = { 
      
      fulfillmentText : JSON.stringify(dbCustomers)
     
    }

    res.json(response);
  });

});


// findAll transactions Customers

router.get("/txns/:id", function (req, res) {
  console.log("inside txn route ");
  const CustomerID = req.params.id;

  db.Txnjournal.findAll({where: {customer_no:CustomerID},}).then(function (dbTxns) {

    const response = { 
      
      fulfillmentText : JSON.stringify(dbTxns)
     
    }

    res.json(response);
  });

});


module.exports = router;