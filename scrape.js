var request = require('request');
var cheerio = require('cheerio');

var options ={
	url:'https://steemit.com/@freedom',
	headers: {
	  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4' 
	}
};


request(options, function (error, response, html){
	if (!error && response.statusCode == 200){
		console.log(html);
		}
	});
