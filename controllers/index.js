var   weather =     require('../models/weather.js')
    , express =     require('express')
    // , fs =          require('fs')
    , bodyParser =  require('body-parser')
    , app = express()
    , jsonParser = bodyParser.json()
    // , $ = jQuery =  require('jQuery')
    // , csv =         require('../source/js/libs/jquery.csv-0.71.js')
    ;

//Home page
app.get('/', function(req, res) {
  res.render('pages/index');
});

//Weather Page
app.get('/weather', function(req, res) {
  res.render('pages/weather');
});

//Notation Page
app.get('/notation', function(req, res) {
  res.render('pages/notation');
});

//Post location query to get weather for location
app.post('/getweather', jsonParser, function(req, res){
  weather.currentWeather(req.body.location, function(weather) {
		res.json( JSON.parse(weather) );
	}, function(err) {
		console.log('ERROR')
	});
});

// var sample = '../source/NUMS.csv';
// fs.readFile(sample, 'UTF-8', function(err, csv) {
//   console.log('Trying to read...')
//   $.csv.toArrays(csv, {}, function(err, data) {
//     console.log('Reading in the csv: ' + csv)
//     for(var i=0, len=data.length; i<len; i++) {
//       console.log(data[i]);
//     }
//   });
// });
module.exports = app;
