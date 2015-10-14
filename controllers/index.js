var   weather =     require('../models/weather.js')
    , express =     require('express')
    , bodyParser =  require('body-parser')
    , app = express()
    , jsonParser = bodyParser.json();

//Home page
app.get('/', function(req, res) {
  res.render('pages/index');
});

//Weather Page
app.get('/weather', function(req, res) {
  res.render('pages/weather');
});

//Post location query to get weather for location
app.post('/getweather', jsonParser, function(req, res){
  weather.currentWeather(req.body.location, function(weather) {
		res.json( JSON.parse(weather) );
	}, function(err) {
		console.log('ERROR')
	});
});

module.exports = app;
