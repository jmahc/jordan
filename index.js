var weather = require('./lib/weatherlib.js');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');

//app.set('view engine', 'ejs');
app.set('view engine', 'jade');

//Home page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// var apikey = weather.getApiKey();
// console.log('This is the api key...')
// console.log(apikey)


//Weather page
// app.get('/weather', function(request, response) {
// 	weather.currentWeather('Nashville', function(weather) {
// 		response.render('pages/weather', {weather: weather});
// 	}, function(err) {
// 		res.status(500).json(err);
// 	});
// });
app.get('/weather', function(request, response) {
  response.render('pages/weather');
});

app.listen(app.get('port'), function() {
  console.log('The party is happening on port ', app.get('port'));
});
