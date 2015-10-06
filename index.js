var weather = require('./lib/weatherlib.js');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//forecast weather takes pin code or location as first parameter, number of days as second, error handler callback as second
//weather.forecastWeather(20500, 2, errorHandler);

//Home page
app.get('/', function(request, response) {
  response.render('pages/index');
});

//Weather page
app.get('/weather', function(request, response) {
	weather.currentWeather('Nashville', function(weather) {
		response.render('pages/weather', {weather: weather});
	}, function(err) {
		res.status(500).json(err);
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
