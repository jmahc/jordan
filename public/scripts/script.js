var Jmac = {}; //SiteName can be an abbreviation (e.g. SN for SiteName)
Jmac.development = false;
Jmac.debug = false;

Jmac.global = {}

Jmac.global.init = function() {
  var t = this;

  t.init_variables();
  t.init_methods();
}
Jmac.global.init_variables = function() {
  var t = this;
}
Jmac.global.init_methods = function() {
  var t = this;

  $(function() {
    var hidden = "hidden";
    var oldTitle = document.title;
    var currentTitle;

    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = "visible", h = "hidden",
            evtMap = {
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
            };

        evt = evt || window.event;
        if (evt.type in evtMap) {
            currentTitle = oldTitle;
            $(document).attr('title', currentTitle);
        }
        else {
            currentTitle = this[hidden] ? "Come back!" : oldTitle;
            $(document).attr('title', currentTitle);
        }
      }
      // set the initial state (but only if browser supports the Page Visibility API)
      if( document[hidden] !== undefined ) {
          onchange({type: document[hidden] ? "blur" : "focus"});
      }
  });
}

Jmac.nav = {};

Jmac.nav.init = function () {
  var t = this;

  t.init_variables();
  t.init_methods();
}

Jmac.nav.init_variables = function() {
  var t = this;

  t.$arrow = $('.arrow.bounce');
  t.$page = $('body');
  t.$nav = $('nav');
}

Jmac.nav.init_methods = function () {
  var t = this;

  //enables navbar affix-top
  t.$nav.affix();

  //navbar affix closes arrow
  t.$nav.on('affixed.bs.affix', function () {
      t.$arrow.fadeOut(200);
  });
  t.$nav.on('affixed-top.bs.affix', function () {
      t.$arrow.fadeIn(200);
  });
  //Remove arrow bounce
  if(t.$nav.hasClass('affix'))
  {
      t.$arrow.fadeOut(200);
  }

  //enables scrollspy for navbar
  t.$page.scrollspy({target: '#navbar'});

  //smooth scrolling
  $('a[href*=#]:not([href=#])').click(function () {
    if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if(target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}

Jmac.home = {};

Jmac.home.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
}

Jmac.home.init_variables = function () {
    var t = this;

    t.$nav = $('nav');
    t.$arrow = $('.arrow.bounce');
    t.$page = $('body');
    t.$hero = $('.homepage-hero-module');
    t.$navBar = $('#navbar');
    t.$modal = $('#myModal');
    t.$modalTrigger = $('.icon-modal');
    t.$modalTitle = $('.modal-title');
    t.$modalImage = $('.modal-image');
    t.$modalLink = $('.modal-link');
    t.$projects = $('#projects');
    t.scrollDurationProjects = t.$projects.height();
    t.controllerProjects = new ScrollMagic.Controller({globalSceneOptions: {duration: t.scrollDurationProjects}});
    t.scrollDurationVideo = 400;
    t.controllerVideo = new ScrollMagic.Controller({globalSceneOptions: {duration: t.scrollDurationVideo}});
}

Jmac.home.init_methods = function () {
    var t = this;

    	// build scenes
    	new ScrollMagic.Scene({triggerElement: "#bigHalfCircle"})
    					.setClassToggle(".portfolio-item", "fade-in") // add class toggle
    					.addTo(t.controllerProjects);
      new ScrollMagic.Scene({triggerElement: ".welcome"})
    					.setClassToggle(".navbar.navbar-inverse", "scroll-mag") // add class toggle
    					.addTo(t.controllerVideo);

    $(function () {
      //close navbar menu on click mobile
      $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function () {
        $(".navbar-nav li a").on('click', function(event) {
          $(".navbar-collapse").collapse('hide');
        });
      });

      function preload(arrayOfImages) {
          $(arrayOfImages).each(function(){
          $('<img/>')[0].src = this;
          // Alternatively you could use:
          // (new Image()).src = this;
            });
      }

      // Usage:

      preload([
          'images/web/2-com.png',
          'images/web/bulwark.png',
          'images/web/columbia.png',
          'images/web/cub.png',
          'images/web/horace.png',
          'images/web/red.png',
          'images/web/vf.png',
          'images/web/yanmar.png',
      ]);

      //Remove arrow bounce
      if(t.$nav.hasClass('affix'))
      {
          t.$arrow.fadeOut(200);
      }

      //video scaling
      scaleVideoContainer();
      initBannerVideoSize('.video-container .poster img');
      initBannerVideoSize('.video-container .filter');
      initBannerVideoSize('.video-container video');

      $(window).on('resize', function () {
          scaleVideoContainer();
          scaleBannerVideoSize('.video-container .poster img');
          scaleBannerVideoSize('.video-container .filter');
          scaleBannerVideoSize('.video-container video');
      });

      t.$modalTrigger.on('click', function () {
          var $item = $(this).closest('.item-information');
          var company = getCompanyInfo($item);

          t.$modalTitle.text(company.title);
          t.$modalLink.attr('href', company.link).text(company.link);
          t.$modalImage.attr('src', company.image);
      });
    });

    var getCompanyInfo = function ($elements) {
        var info = {};
        var t = $elements.find('h4').text();
        var l = $elements.find('h4').data("link");
        var x = t.split(' ');
        var site = x[0];
        var i = 'images/web/' + site.toLowerCase() + '.png';

        info.title = t;
        info.link = l;
        info.image = i;

        return info;
    };

    function scaleVideoContainer() {

        var height = $(window).height() + 5;
        var unitHeight = parseInt(height) + 'px';
        t.$hero.css('height',unitHeight);

    };

    function initBannerVideoSize(element) {

        $(element).each(function(){
            $(this).data('height', $(this).height());
            $(this).data('width', $(this).width());
        });

        scaleBannerVideoSize(element);

    };

    function scaleBannerVideoSize(element) {

        var windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;
        var windowRatio = windowHeight / windowWidth;

        $(element).each(function(){
            var videoAspectRatio = $(this).data('height')/$(this).data('width');

            $(this).width(windowWidth);

            if(windowWidth < 1000) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;

                if($(this).hasClass('no-stretch')) {
                  var increase = 300;
                  var newW = videoWidth + increase;
                  var newH = (newW * videoHeight) / videoWidth;
                  videoWidth = newW;
                  videoHeight = newH;

                    $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

                }
                $(this).width(videoWidth).height(videoHeight);
            } else if (windowWidth > 1000) {
                if(windowRatio < 0.8 && windowRatio > 0.58) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                videoWidth = (videoHeight / videoAspectRatio) + 200;

                $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
                $(this).width(videoWidth).height(videoHeight);
              }
            }

            $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
        });
    };

    Jmac.nav.init();
}

Jmac.weather = {};

Jmac.weather.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
}

Jmac.weather.init_variables = function () {
    var t = this;

    t.$lookupButton = $('#lookup_coordinates');
    t.$latInput = $('#Latitude');
    t.$lngInput = $('#Longitude');
    t.baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    t.$city = $('#City');
    t.$state = $('#State');
    t.$postalCode = $('#Zip');
    t.$form = $('.user-search-weather');
    t.$footer = $('.footer');
    t.$animation = $('.animation');
    t.$userLocation = $('.weather-location');
    t.$currentText = $('.weather-current');
    t.$userSearch = $('div.user-search-weather');
    t.$userInputLocation = $('#input_location');
    t.$load = $('.loading-overlay');
    t.$go = $('#input_go');
    t.nightTime = "19:20";
    t.morningTime = "06:20";
    t.postLocation = function() {};
}

Jmac.weather.init_methods = function () {
    var t = this
        , query
        , weather
        , day = false
        , active = []
        , tod = "day"
        , currentW
        , conditions = [{"code":1000,"day":"Sunny","night":"Clear","icon":113},{"code":1003,"day":"Partly Cloudy","night":"Partly Cloudy","icon":116},{"code":1006,"day":"Cloudy","night":"Cloudy","icon":119},{"code":1009,"day":"Overcast","night":"Overcast","icon":122},{"code":1030,"day":"Mist","night":"Mist","icon":143},{"code":1063,"day":"Patchy rain nearby","night":"Patchy rain nearby","icon":176},{"code":1066,"day":"Patchy snow nearby","night":"Patchy snow nearby","icon":179},{"code":1069,"day":"Patchy sleet nearby","night":"Patchy sleet nearby","icon":182},{"code":1072,"day":"Patchy freezing drizzle nearby","night":"Patchy freezing drizzle nearby","icon":185},{"code":1087,"day":"Thundery outbreaks in nearby","night":"Thundery outbreaks in nearby","icon":200},{"code":1114,"day":"Blowing snow","night":"Blowing snow","icon":227},{"code":1117,"day":"Blizzard","night":"Blizzard","icon":230},{"code":1135,"day":"Fog","night":"Fog","icon":248},{"code":1147,"day":"Freezing fog","night":"Freezing fog","icon":260},{"code":1150,"day":"Patchy light drizzle","night":"Patchy light drizzle","icon":263},{"code":1153,"day":"Light drizzle","night":"Light drizzle","icon":266},{"code":1168,"day":"Freezing drizzle","night":"Freezing drizzle","icon":281},{"code":1171,"day":"Heavy freezing drizzle","night":"Heavy freezing drizzle","icon":284},{"code":1180,"day":"Patchy light rain","night":"Patchy light rain","icon":293},{"code":1183,"day":"Light rain","night":"Light rain","icon":296},{"code":1186,"day":"Moderate rain at times","night":"Moderate rain at times","icon":299},{"code":1189,"day":"Moderate rain","night":"Moderate rain","icon":302},{"code":1192,"day":"Heavy rain at times","night":"Heavy rain at times","icon":305},{"code":1195,"day":"Heavy rain","night":"Heavy rain","icon":308},{"code":1198,"day":"Light freezing rain","night":"Light freezing rain","icon":311},{"code":1201,"day":"Moderate or heavy freezing rain","night":"Moderate or heavy freezing rain","icon":314},{"code":1204,"day":"Light sleet","night":"Light sleet","icon":317},{"code":1207,"day":"Moderate or heavy sleet","night":"Moderate or heavy sleet","icon":320},{"code":1210,"day":"Patchy light snow","night":"Patchy light snow","icon":323},{"code":1213,"day":"Light snow","night":"Light snow","icon":326},{"code":1216,"day":"Patchy moderate snow","night":"Patchy moderate snow","icon":329},{"code":1219,"day":"Moderate snow","night":"Moderate snow","icon":332},{"code":1222,"day":"Patchy heavy snow","night":"Patchy heavy snow","icon":335},{"code":1225,"day":"Heavy snow","night":"Heavy snow","icon":338},{"code":1237,"day":"Ice pellets","night":"Ice pellets","icon":350},{"code":1240,"day":"Light rain shower","night":"Light rain shower","icon":353},{"code":1243,"day":"Moderate or heavy rain shower","night":"Moderate or heavy rain shower","icon":356},{"code":1246,"day":"Torrential rain shower","night":"Torrential rain shower","icon":359},{"code":1249,"day":"Light sleet showers","night":"Light sleet showers","icon":362},{"code":1252,"day":"Moderate or heavy sleet showers","night":"Moderate or heavy sleet showers","icon":365},{"code":1255,"day":"Light snow showers","night":"Light snow showers","icon":368},{"code":1258,"day":"Moderate or heavy snow showers","night":"Moderate or heavy snow showers","icon":371},{"code":1261,"day":"Light showers of ice pellets","night":"Light showers of ice pellets","icon":374},{"code":1264,"day":"Moderate or heavy showers of ice pellets","night":"Moderate or heavy showers of ice pellets","icon":377},{"code":1273,"day":"Patchy light rain in area with thunder","night":"Patchy light rain in area with thunder","icon":386},{"code":1276,"day":"Moderate or heavy rain in area with thunder","night":"Moderate or heavy rain in area with thunder","icon":389},{"code":1279,"day":"Patchy light snow in area with thunder","night":"Patchy light snow in area with thunder","icon":392},{"code":1282,"day":"Moderate or heavy snow in area with thunder","night":"Moderate or heavy snow in area with thunder","icon":395}];

    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
    }

    function errorHandler(){
    	console.log('An error occured.')
    }

    //Search for location
    t.$lookupButton.on('click', function () {
        var address = t.$city.val() + ", " + " " + t.$postalCode.val();
        var encoded = encodeURIComponent(address);

        $.getJSON(t.baseUrl + encoded, function (data) {
            if (data && data.results.length > 0) {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;

                query = lat + "," + lng;
            } else {
                alert('Could not determine geo-coordinates for that address.  Please enter them manually.');
            }
        }).done(function() {
          console.log('The query is now' + query)
          t.$form.hide();
          getWeather();
        });
    });

    //Add footer class
    t.$footer.addClass('weather-footer');

    function isDay() {
      var localTime = weather.location.localtime.split(' ')[1];
      if (localTime.length === 4) {
        localTime = "0" + localTime;
      }

      if (localTime >= t.nightTime) {
        $('.light').addClass('moon');
        $('.sky').addClass('night');
        return false;
      } else if (localTime <= t.morningTime) {
        $('.light').addClass('moon');
        $('.sky').addClass('night');
        return false;
      } else {
        $('.light').addClass('sun');
        $('.squiggle-container').show();
        $('.sky').addClass('day');
        return true;
      }
    }

    //Determine the amount of clouds and if overcast
    function cloudAmount() {
      var c = currentW.toLowerCase();
      if ((c.indexOf("overcast") > -1)) {
        $('.clouds').addClass('cloudy');
        $('.sky').addClass('overcast');
        for (var i = 1; i < 8; i++) {
          $('.clouds').append("<div class='cloud'></div>");
        }
      } else if (c.indexOf("cloudy") > -1) {
        $('.clouds').addClass('cloudy');
        for (var i = 1; i < 12; i++) {
          $('.clouds').append("<div class='cloud'></div>");
        }
      } else if (c.indexOf("partly") > -1) {
        $('.clouds').addClass('cloudy');
        for (var i = 1; i < 5; i++) {
          $('.clouds').append("<div class='cloud'></div>");
        }
      }
    }

    //Get weather depending on the time of day
    function getWeatherWithTime() {
      currentW = weather.current.condition.text;
      var xuCode = $.grep(conditions, function(e){
        return e.code == weather.current.condition.code;
      });

      var code = {};
      code = xuCode[0];

      var t = isDay();
      cloudAmount();
      if (t === true) {
        console.log('Yes, it ISDAY')
        day = true;
        return code.day;
      } else {
        console.log('NO, it IS NOT DAY')
        day = false;
        tod = "night";
        return code.night;
      }
    }
    function getWeather() {
      t.$animation.show();
      populate();
    }

    function populate() {
      t.$userLocation.text('Current weather for ' + weather.location.name);
      t.$currentText.text(weather.current.condition.text + ' during the ' + tod);

      getWeatherWithTime();
    }

    t.postLocation = function() {
      var data = {
        location: query
      }
      console.log(query)
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/getweather',
        success: function(data) {
            console.log('success');
            console.log('The data is' + data);
            weather = data;
            getWeather();
        }
      });
    }

    function userCanContinue() {
      t.$go.show().attr('onclick', 'Jmac.weather.postLocation()');
    }

    function userEntersLocation() {
      t.$userSearch.show();
    }

    function userSearchLocation () {
      var userInput = t.$userInputLocation.val();
    }

    // Get current user location
    function getLocation() {
        if (navigator.geolocation) {
          t.$load.show();
          navigator.geolocation.getCurrentPosition(function(position) {
              query = position.coords.latitude + "," + position.coords.longitude;
              t.$load.hide();
              userCanContinue();
          }, function(error) {
              t.$load.hide();
              userEntersLocation();
          },{timeout:5000});
        } else {
            alert("Geolocation is not supported by this browser.");
            userEntersLocation();
        }
    }

    $(function() {
      Jmac.nav.init();
      getLocation();
    })
}
