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

// app.get('/weather', function(request, response) {
//   response.render('pages/weather');
// });

var apikey = weather.getApiKey();
console.log('This is the api key...')
console.log(apikey)


//Weather page
app.get('/weather', function(request, response) {
  response.render('pages/weather', { apikey: apikey });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
