//SPDX-License-Identifier: Apache-2.0

/*
  This code is based on code written by the Hyperledger Fabric community.
  Original code can be found here: https://github.com/hyperledger/fabric-samples/blob/release/fabcar/query.js
  and https://github.com/hyperledger/fabric-samples/blob/release/fabcar/invoke.js
 */

// call the packages we need
//var express       = require('express');        // call express
//var app           = express();                 // define our app using express
//var bodyParser    = require('body-parser');
//var http          = require('http')
//var fs            = require('fs');
//var Fabric_Client = require('fabric-client');
var path          = require('path');
var util          = require('util');
var os            = require('os');

var helpers       = require('../helpers');

module.exports = (function() {
return {
  get_all_unprocessed_pigs: function(req, res) {
    console.log("Getting all unprocessed pigs from database");
    helpers.utils.getUnprocessedPigs((err, pigsArr) => {
      if (!err) 
        res.send(pigsArr.rows);
      else
        res.send('error');
    });
  },

  create_lot_no: function(req, res) {
    console.log("Creating new lotNo")
    
    var traceNoArr = req.params.trace_nos.split('-');
    //console.log(traceNoArr);

    helpers.utils.createLotNo(traceNoArr, (err, newLotNo) => {
      if (!err)
        res.send(newLotNo);
      else
        res.send('error');
    });
  },

  query_lot_no_with_date: function(req, res) {
    console.log("Query lotNo with created date")
    
    var created_date = req.params.created_date;
    //console.log(created_date);

    helpers.utils.queryLotNoWithDate(created_date, (err, lotNoArr) => {
      if (!err)
        res.send(lotNoArr.rows);
      else
        res.send('error');
    });
  },

  create_new_process: function(req, res) {
    console.log("Creating new processNo");

    var lotNo = req.params.lotNo;

    helpers.utils.createNewProcessNo(lotNo, (err, processNo) => {
      if (!err)
        res.send(processNo)
      else
        res.send('error');
    });
  },

  query_process_info_with_date: function(req, res) {
    console.log("Query processInfo with process date");
    
    var processDate = req.params.process_date;

    helpers.utils.queryProcessInfoWithDate(processDate, (err, processInfoArr) => {
      if (!err)
        res.send(processInfoArr)
      else
        res.send('error');
    });
  }
}
})();