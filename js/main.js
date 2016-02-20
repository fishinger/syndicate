$(document).ready(function(){
	$(".open-popup").fancybox({
  	openEffect	: 'elastic',
  	closeEffect	: 'elastic',
  	scrolling: 'visible',
  	padding: 0,
  	width: 760,
    height: 'auto',
  	helpers : {
  		title : {
  			type : 'inside'
  		}
  	}
  });
  // Initialise Waves with the config
  var clickWaves = (function(){
    var config = {
        duration: 500,
        delay: 200
    };
    Waves.init(config);
  }());
  $('.slider').bxSlider({
    mode: 'horizontal',
    nextSelector: ".slider__next",
    prevSelector: ".slider__prev",
    nextText: "",
    prevText: "",
    auto: true,
    autoHover: true,
    pagerCustom: '.slider-pager'
  });
  var scrollbar = (function(){
    $(".custom-scroll").mCustomScrollbar({
      contentTouchScroll: true,
      theme:"theme-scroll"
    });
  }());
  var nextSection = (function(){
  	var btn = $('.next-section');
  	btn.on('click', function(e){
  		var $this = $(this),
  			section = $this.closest('.section'),
  			newSection = section.next('.section'),
  			newPosition = newSection.offset().top,
        winWidth = $(window).width();
      if(winWidth >= 640 && winWidth < 1000){
        newPosition -= 45;
      }
  		$('body, html').animate({'scrollTop' : newPosition}, 700);
  	})
  }());
  //слайдеры с динамичным выводом слайдов
  var slidersInit = (function(){
    var slider1,
        slider2,
        winWidth1 = false,
        winWidth2 = false,
        winWidth3 = false;
    var sliders = function(countSlides1, countSlides2){
      slider1 = $('.job__slider').bxSlider({
        slideWidth: 5000,
        minSlides: countSlides1,
        maxSlides: 4,
        slideMargin: 0,
        infiniteLoop: false,
        pager: false,
        nextSelector: ".job__next",
        prevSelector: ".job__prev",
        nextText: "",
        prevText: ""
      }),
      slider2 = $('.reviews__slider').bxSlider({
        slideWidth: 5000,
        minSlides: countSlides2,
        maxSlides: 2,
        slideMargin: 60,
        infiniteLoop: false,
        pager: false,
        nextSelector: ".reviews__next",
        prevSelector: ".reviews__prev",
        nextText: "",
        prevText: "",
        onSliderLoad: function(currentIndex){
          var slider = $('.reviews__slider'),
            slide = slider.find('.slide'),
            count = slide.length,
            controls = slider.closest('.reviews').find('.controls'),
            winWidth = $(window).width(),
            countBlock = $('.reviews__count');
          if(count < 3 && winWidth > 1000) {
            controls.hide();
          } else if(count < 2 && winWidth <= 1000){
            controls.hide();
          } else {
            controls.show();
          }
          countBlock.html(count)
        }
      });
    };
    var showSliders = function(){
      var winWidtn = $(window).width();
      if(winWidtn > 1000 && !winWidth1){
        if(slider1 !== undefined && slider2 !== undefined){
          slider1.destroySlider();
          slider2.destroySlider();
        }
        setTimeout(function(){
          sliders(4, 2);
        }, 100);
        winWidth1 = true;
        winWidth2 = false;
        winWidth3 = false;
      } else if(winWidtn <= 1000 && winWidtn > 640 && !winWidth2 ) {
        if(slider1 !== undefined && slider2 !== undefined){
          slider1.destroySlider();
          slider2.destroySlider();
        }
        setTimeout(function(){
          sliders(2, 1);
        }, 100);
        winWidth1 = false;
        winWidth2 = true;
        winWidth3 = false;
      } else if(winWidtn <= 640 && !winWidth3) {
        if(slider1 !== undefined && slider2 !== undefined){
          slider1.destroySlider();
          slider2.destroySlider();
        }
        setTimeout(function(){
          sliders(1, 1);
        }, 100);
        winWidth1 = false;
        winWidth2 = false;
        winWidth3 = true;
      }
    }
    showSliders();
    $(window).resize(function(){
      showSliders();
    })
  }());
  var wayp = (function(){
    var showSection = function(section, isAnimate){
        if(section && section !=='#'){
          var
            hasSec = section.replace('#', ''),
            newSec = $('.section').filter('[data-section="' + hasSec + '"]'),
            posSec = newSec.offset().top - 80;
          if(isAnimate){
            $('html, body').animate({scrollTop: posSec}, 900);
          } else {
            $('html, body').scrollTop(posSec);
          }
          
        }
        
      }
      var activsection = function(){
        $('.section').each(function(e){
          var $this = $(this),
            topSec = $this.offset().top - 200,
            botSec = $this.height() + topSec,
            winScroll = $(window).scrollTop();
          if(topSec < winScroll && botSec > winScroll){
            var secId = $this.data('section'),
              activLink = $('.nav_link_this').filter('[href="#' + secId + '"]');
            $('.nav_link_this').removeClass('active');
            activLink.addClass('active');
            window.location.hash = secId;
            if(secId === 'creating' && !$this.hasClass('viewed')){
              $this.addClass('viewed');
              var items = $this.find('.offer__item');
              items.addClass('fadeInRightMin');//fadeInRightMin
            }
          }
        })
      }
      $(window).scroll(function(){
        activsection();
      })
      $(document).ready(function(){
        showSection(window.location.hash, false);
        $('.nav_link_this').on('click', function(e){
          e.preventDefault();
          showSection($(this).attr('href'), true);
        })
      })
  }());
  var parallax = (function(){
    $(window).enllax();
  }())
  var openNav = (function(){
    var btn = $('.burger'),
      nav = $('.nav');
    btn.on('click', function(){
      if (!nav.hasClass('active')) {
        nav.addClass('active');
      } else {
        nav.removeClass('active');
      }
    })
    $('.nav__link, .nav__close, .nav__message').on('click', function(){
      if (nav.hasClass('active')) {
        nav.removeClass('active');
      }
    })
    $(document).on('click', function(e){
        if (!nav.is(e.target) && nav.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0 ) {
            if(nav.hasClass('active')){
               nav.removeClass('active')
            }
        }
    })
  }());
  /*маска для ввода телефона*/
  var maskPhone = (function(){
   $(".mask-phone").mask("+7(999)-999-99-99");
  }())
  //скрол наверх
  var topScrol = (function(){
      var btn = $('.scroll-top');
      btn.on('click', function(){
          $('body, html').animate({'scrollTop' : 0}, 800);

      });
      $(document).scroll(function(){
          var topPos = $(window).scrollTop(),
              face = $('.face').height() + 100,
              header = $('header');
          if(topPos > 300){
            header.addClass('fixed');
          } else {
            header.removeClass('fixed')
          }
          if(topPos > face ){
              btn.addClass('active');
          } else {
              btn.removeClass('active');
          }
      })
  }())

  ymaps.ready(function () {
      var myMap = new ymaps.Map('maps', {
              center: [55.999986534878296,37.22720134400442],
              zoom: 16,
              controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl']
          }, {
              searchControlProvider: 'yandex#search'
          }),
          myPlacemark = new ymaps.Placemark([55.999153868752195,37.223839091957075], {
              hintContent: '',
              balloonContent: 'Это красивая метка',
              balloonContentBody: [
          '<ul>',
          '<li>',
          'Москва, г. Зеленоград,',
          '<br>',
          'ул. Юности, д.8, офис. 502 и 503.',
          '</li>',
          '<li>',
          '<a href="tel:+74955437653">8 (495) 543-76-53</a>',
          '</li>',
          '<li>',
          '<a href="mailto:info@redsyndicate.ru">info@redsyndicate.ru</a>',
          '</li>',
          '</ul>'
              ].join('')
          },
          {
              iconLayout: 'default#image',
              iconImageHref: 'img/map-label.png',
              iconImageSize: [209, 195],
              iconImageOffset: [7, -184]
          });
      myMap.behaviors.disable('scrollZoom');
      myMap.geoObjects.add(myPlacemark);
  });

})