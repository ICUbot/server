
/*
 * upload.
 */

var http = require('http');
var request = require('request');
var querystring = require('querystring');

exports.landing = function(req, res){
	var code = req.query.code;
	
	var body = {
		'client_id': '000000004C17050B',
		'redirect_uri': 'http://localhost:3000/upload',
		'client_secret': 'Xt3QHHLqEP3cVnypMOTE8ImIuN0vBb9b',
		'code': code,
		'grant_type': 'authorization_code'
	};

	var post_data = querystring.stringify(body);

	var options = {
		host: 'https://login.live.com',
		path: '/oauth20_token.srf',
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	};
		
	var callback = function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('index', { title: 'a' });
        } else {
        	res.render('index', { title: querystring.stringify(error) });
        }
    };

    var req = http.request(options, callback);
    req.write(post_data);
	req.end();
};