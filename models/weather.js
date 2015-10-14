var http = require('http');

var weatherApiKey = 'a2a0da17d9f548f18e1144117151110';
var options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + weatherApiKey + '&q=',
  method: 'GET'
};


exports.getApiKey = function getApiKey(options, weatherApiKey) {
  var x = {
    host: 'api.apixu.com',
    port: 80,
    path: '/v1/current.json?key=' + weatherApiKey + '&q=',
    method: 'GET'
  };
  return x;
}

exports.currentWeather = function currentWeather(query, callback, errorHandler){
	options.path = '/v1/current.json?key=' + weatherApiKey + '&q=' + query;
	http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
      callback(chunk);
	  });
	  res.on('end', function (chunk) {
      console.log('No more data in response.');
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback(err);
    }).end();
}
