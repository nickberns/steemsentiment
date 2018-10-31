var express = require('express');
var app = express();
var dotenv= require('dotenv').config();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'Steemit-cryptonik',
        password: `${process.env.STEEMPASSWORD}`,
        server: 'vip.steemsql.com', 
        database: 'DBSteem' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT name, vesting_withdraw_rate, next_vesting_withdrawal FROM dbo.Accounts WHERE name=\'netuoso\' OR name=\'dan\' OR name=\'ned\' OR name=\'dantheman\' OR name=\'mrdelegation\' OR name=\'steem\' OR name=\'bittrex\' OR name=\'poloniex\' OR name=\'freedom\' OR name=\'blocktrades\' OR name=\'val-a\' OR name=\'mottler\' OR name=\'ben\' OR name=\'databass\' OR name=\'hendrikgrote\' OR name=\'jamesc\' OR name=\'michael-b\' OR name=\'val-b\' OR name=\'xeldal\' OR name=\'roadscape\' OR name=\'fyrstikken\' OR name=\'riverhead\'', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
    console.log(process.env.STEEMPASSWORD);
});
