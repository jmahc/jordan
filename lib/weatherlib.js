var http = require('http');

var apixuKey = '42dea182f5d54734a20210806150610';


exports.getApiKey = function getApiKey(options, weatherApiKey) {
  var x = {
    host: 'api.apixu.com',
    port: 80,
    path: '/v1/current.json?key=' + apixuKey + '&q=',
    method: 'GET'
  };
  return x;
}

exports.currentWeather = function currentWeather(query, callback, errorHandler){
	options.path = '/v1/current.json?key=' + apixuKey + '&q=' + query;
	http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
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

// exports.forecastWeather = function forecastWeather(query, noOfDays, callback){
// 	options.path = '/v1/forecast.json?key=' + weatherApiKey + '&q=' + query + '&days=' + noOfDays;
// 	http.request(options, function(res) {
// 	  res.setEncoding('utf8');
// 	  res.on('data', function (chunk) {
// 		console.log(chunk);
// 	  });
// 	  res.on('end', function (chunk) {
// 	  });
// 	}).on('error', function(err) {
//         // handle errors with the request itself
//         console.error('Error with the request:', err.message);
//         callback(err);
//     }).end();
// }
