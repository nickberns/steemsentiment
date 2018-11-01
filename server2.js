var express = require('express');
var app = express();
var dotenv= require('dotenv').config();
var text;
app.get('/', function (req, res) {

  var sql = require('mssql');

  // config for your database
  var config = {
        user: 'Steemit-cryptonik',
        password: `${process.env.STEEMPASSWORD}`,
        server: 'vip.steemsql.com',
        database: 'DBSteem',

          options:{
              encrypt: false
                  }
              };

  sql.connect(config).then(pool => {
          return pool.request()
            .query('SELECT name, balance, sbd_balance, vesting_shares, to_withdraw, vesting_withdraw_rate, next_vesting_withdrawal FROM dbo.Accounts WHERE name=\'netuoso\' OR name=\'dan\' OR name=\'ned\' OR name=\'dantheman\' OR name=\'mrdelegation\' OR name=\'steem\' OR name=\'bittrex\' OR name=\'poloniex\' OR name=\'freedom\' OR name=\'blocktrades\' OR name=\'val-a\' OR name=\'mottler\' OR name=\'ben\' OR name=\'databass\' OR name=\'hendrikgrote\' OR name=\'jamesc\' OR name=\'michael-b\' OR name=\'val-b\' OR name=\'xeldal\' OR name=\'roadscape\' OR name=\'fyrstikken\' OR name=\'riverhead\'')
                }).then(result => {
                      // console.dir(result.recordset[0].vesting_withdraw_rate);
                        text="<table><tr><th>name</th><th>STEEM</th><th>SBD</th><th>STEEM POWER</th><th>Powered Down</th><th>Powering Down</th><th>Next Power Down</th>"
                        let data = result.recordset;

                        function powerDown (num){
                        num=num*13*497.282/1e6;
                        return num
                        }

                        function vestToSP(vest){
                          vest=vest*497.282/1e6;
                          return vest
                        }

                        for (i=0; i<data.length; i++){
                          console.log(data[i].name, data[i].balance, data[i].sbd_balance, data[i].vesting_shares, data[i].to_withdraw, data[i].vesting_withdraw_rate, data[i].next_vesting_withdrawal);
                         text +="<tr>" + "<td>" + data[i].name + "</td><td>" + data[i].balance + "</td><td>" + data[i].sbd_balance + "</td><td>" + vestToSP(data[i].vesting_shares) + "</td><td>" + data[i].to_withdraw + "</td><td>" + powerDown(data[i].vesting_withdraw_rate) + "</td><td>" + data[i].next_vesting_withdrawal + "</td></tr>";
                         }
                         text +="</table">
                       res.send(text);

                    //   for (i=0; i<result.recordset.length; i++){
                    //   for (var key in result.recordset[i]){
                    //     if (result.recordset.hasOwnProperty(key)){
                    //       console.log(key + " -> " + result.recordset[key]);
                    //     }
                    //   }
                    // }

                      // console.log(typeof result);

                                });

//stored procedure

  sql.on('error', err =>{
    console.log(err);
  });



});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
