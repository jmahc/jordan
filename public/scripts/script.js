var Jmac = {}; //SiteName can be an abbreviation (e.g. SN for SiteName)
Jmac.development = false;
Jmac.debug = false;
Jmac.home = {};

Jmac.home.init = function () {
    var t = this;

    t.init_variables();
    t.init_methods();
};

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
};

Jmac.home.init_methods = function () {
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

    $(function () {
      //close navbar menu on click mobile
      $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function () {
        $(".navbar-nav li a").on('click', function(event) {
          $(".navbar-collapse").collapse('hide');
        });
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
};
