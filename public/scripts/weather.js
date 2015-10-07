//var weather = <%- weather %>;

var weather = {
    "location": {
        "name": "Nashville",
        "region": "Tennessee",
        "country": "United States Of America",
        "lat": 36.17,
        "lon": -86.78,
        "tz_id": "America/Chicago",
        "localtime_epoch": 1444165374,
        "localtime": "2015-10-06 23:02"
    },
    "current": {
        "last_updated_epoch": 1444163403,
        "last_updated": "2015-10-06 20:30",
        "temp_c": 23.9,
        "temp_f": 75,
        "condition": {
            "text": "Overcast",
            "icon": "//cdn.apixu.com/weather/64x64/night/122.png",
            "code": 1009
        },
        "wind_mph": 6.9,
        "wind_kph": 11.2,
        "wind_degree": 20,
        "wind_dir": "NNE",
        "pressure_mb": 1017,
        "pressure_in": 30.5,
        "precip_mm": 0,
        "precip_in": 0,
        "humidity": 52,
        "cloud": 100,
        "feelslike_c": 25.2,
        "feelslike_f": 77.4
    }
}

var conditions = [{"code":1000,"day":"Sunny","night":"Clear","icon":113},{"code":1003,"day":"Partly Cloudy","night":"Partly Cloudy","icon":116},{"code":1006,"day":"Cloudy","night":"Cloudy","icon":119},{"code":1009,"day":"Overcast","night":"Overcast","icon":122},{"code":1030,"day":"Mist","night":"Mist","icon":143},{"code":1063,"day":"Patchy rain nearby","night":"Patchy rain nearby","icon":176},{"code":1066,"day":"Patchy snow nearby","night":"Patchy snow nearby","icon":179},{"code":1069,"day":"Patchy sleet nearby","night":"Patchy sleet nearby","icon":182},{"code":1072,"day":"Patchy freezing drizzle nearby","night":"Patchy freezing drizzle nearby","icon":185},{"code":1087,"day":"Thundery outbreaks in nearby","night":"Thundery outbreaks in nearby","icon":200},{"code":1114,"day":"Blowing snow","night":"Blowing snow","icon":227},{"code":1117,"day":"Blizzard","night":"Blizzard","icon":230},{"code":1135,"day":"Fog","night":"Fog","icon":248},{"code":1147,"day":"Freezing fog","night":"Freezing fog","icon":260},{"code":1150,"day":"Patchy light drizzle","night":"Patchy light drizzle","icon":263},{"code":1153,"day":"Light drizzle","night":"Light drizzle","icon":266},{"code":1168,"day":"Freezing drizzle","night":"Freezing drizzle","icon":281},{"code":1171,"day":"Heavy freezing drizzle","night":"Heavy freezing drizzle","icon":284},{"code":1180,"day":"Patchy light rain","night":"Patchy light rain","icon":293},{"code":1183,"day":"Light rain","night":"Light rain","icon":296},{"code":1186,"day":"Moderate rain at times","night":"Moderate rain at times","icon":299},{"code":1189,"day":"Moderate rain","night":"Moderate rain","icon":302},{"code":1192,"day":"Heavy rain at times","night":"Heavy rain at times","icon":305},{"code":1195,"day":"Heavy rain","night":"Heavy rain","icon":308},{"code":1198,"day":"Light freezing rain","night":"Light freezing rain","icon":311},{"code":1201,"day":"Moderate or heavy freezing rain","night":"Moderate or heavy freezing rain","icon":314},{"code":1204,"day":"Light sleet","night":"Light sleet","icon":317},{"code":1207,"day":"Moderate or heavy sleet","night":"Moderate or heavy sleet","icon":320},{"code":1210,"day":"Patchy light snow","night":"Patchy light snow","icon":323},{"code":1213,"day":"Light snow","night":"Light snow","icon":326},{"code":1216,"day":"Patchy moderate snow","night":"Patchy moderate snow","icon":329},{"code":1219,"day":"Moderate snow","night":"Moderate snow","icon":332},{"code":1222,"day":"Patchy heavy snow","night":"Patchy heavy snow","icon":335},{"code":1225,"day":"Heavy snow","night":"Heavy snow","icon":338},{"code":1237,"day":"Ice pellets","night":"Ice pellets","icon":350},{"code":1240,"day":"Light rain shower","night":"Light rain shower","icon":353},{"code":1243,"day":"Moderate or heavy rain shower","night":"Moderate or heavy rain shower","icon":356},{"code":1246,"day":"Torrential rain shower","night":"Torrential rain shower","icon":359},{"code":1249,"day":"Light sleet showers","night":"Light sleet showers","icon":362},{"code":1252,"day":"Moderate or heavy sleet showers","night":"Moderate or heavy sleet showers","icon":365},{"code":1255,"day":"Light snow showers","night":"Light snow showers","icon":368},{"code":1258,"day":"Moderate or heavy snow showers","night":"Moderate or heavy snow showers","icon":371},{"code":1261,"day":"Light showers of ice pellets","night":"Light showers of ice pellets","icon":374},{"code":1264,"day":"Moderate or heavy showers of ice pellets","night":"Moderate or heavy showers of ice pellets","icon":377},{"code":1273,"day":"Patchy light rain in area with thunder","night":"Patchy light rain in area with thunder","icon":386},{"code":1276,"day":"Moderate or heavy rain in area with thunder","night":"Moderate or heavy rain in area with thunder","icon":389},{"code":1279,"day":"Patchy light snow in area with thunder","night":"Patchy light snow in area with thunder","icon":392},{"code":1282,"day":"Moderate or heavy snow in area with thunder","night":"Moderate or heavy snow in area with thunder","icon":395}];
var conditionCode = weather.current.condition.code;
var nightHour = 19;
var nightMinute = 20;
var morningHour = 6;
var morningMinute = 20;
var day = "";
var active = [];

$(function () {
  var currentWeatherCode = $.grep(conditions, function(e){
    return e.code == conditionCode;
  });

  var isDay = function () {
    var localTime = weather.location.localtime;
    var time = localTime.split(' ')[1];
    var hour = parseFloat(time.split(':')[0]);
    var minute = parseFloat(time.split(':')[1]);
    var doubleMinute = minute.toString();
    if (doubleMinute.length === 1) {
      doubleMinute = "0" + doubleMinute;
    }
    console.log('Time is ' + hour + ':' + doubleMinute)

    var tod = timeOfDay(hour, minute);
    console.log('Time of day is ' + tod);
    return tod;
  }

  var getCodeTime = function () {
    var code = {};
    code = currentWeatherCode;
    console.log('OK, we have the code!')

    var t = isDay();
    if (t === true) {
      console.log('Yes, it ISDAY')
      day = "day";
      return code[0].day;
    } else {
      console.log('NO, it IS NOT DAY')
      day = "night";
      return code[0].night;
    }
  }

  var timeOfDay = function (hour, minute) {
    var x = 0;
    if (hour > nightHour || hour < morningHour) {
      console.log('The night hour or morning hour is within 19-6')
      return x = false;
    } else if ((hour == nightHour && minute >= nightMinute) || (hour == morningHour && minute <= morningMinute)) {
      console.log('The night hour is 19 or morning hour is 6 and the minutes are over/under 20, respectively.')
      return x = false;
    } else if ((hour == nightHour && minute < nightMinute) || (hour == morningHour && minute > nightMinute)) {
      console.log('The night hour is 19 or morning hour is 6 and the minutes are under/over 20, respectively.')
      return x = true;
    } else {
      return x = true;
    }
  }

  var t = getCodeTime();

  $('#weather_location').text(weather.location.name);
  $('#weather_current').text(weather.current.condition.text);
  $('#weather_timeOfDay').text(day);

  var determineActive = function () {
    var sun = true;
    if (day === "day") {
      sun = true;
    } else {
      sun = false;
    }
  }

  console.log('It is ' + t + ' outside.');
});
