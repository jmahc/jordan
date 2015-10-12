var weather = require('./lib/weatherlib.js')
    , express = require('express')
    , bodyParser = require('body-parser');

var app = express();

var jsonParser = bodyParser.json();

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

app.post('/getweather', jsonParser, function(req, res){
  weather.currentWeather(req.body.location, function(weather) {
		res.json( JSON.parse(weather) );
    console.log('The weather outside is ' + weather)
	}, function(err) {
		console.log('ERROR')
	});

	//res.send(req.body);
});

app.listen(app.get('port'), function() {
  console.log('The party is happening on port ', app.get('port'));
}).listen(5000);
