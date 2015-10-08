var weather = require('./lib/weatherlib.js');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Home page
app.get('/', function(request, response) {
  response.render('pages/index');
});

var apikey = weather.getApiKey();
console.log('This is the api key...')
console.log(apikey)


//Weather page
app.get('/weather', function(request, response) {
  response.render('pages/weather');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
