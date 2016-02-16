$(document).ready(function(){
	/*--fancybox--*/
	// $(".open-popup").fancybox({
 //    	openEffect	: 'elastic',
 //    	closeEffect	: 'elastic',
 //    	scrolling: 'visible',
 //    	padding: 0,
 //    	width: 640,
 //    	helpers : {
 //    		title : {
 //    			type : 'inside'
 //    		}
 //    	}
 //    });
    /*--end-fancybox--*/

    var config = {
        // How long Waves effect duration 
        // when it's clicked (in milliseconds)
        duration: 500,

        // Delay showing Waves effect on touch
        // and hide the effect if user scrolls
        // (0 to disable delay) (in milliseconds)
        delay: 200
    };
                    
    // Initialise Waves with the config
    Waves.init(config);

    $('.slider').bxSlider({
      mode: 'horizontal',
      nextSelector: ".slider__next",
      prevSelector: ".slider__prev",
      nextText: "",
      prevText: "",
      pagerCustom: '.slider-pager'
      //captions: true
    });
    var scrollbar = function(){
      $(".custom-scroll").mCustomScrollbar({
        contentTouchScroll: true,
        theme:"theme-scroll"
      });
    }
    scrollbar();
    var nextSection = (function(){
    	var btn = $('.next-section');
    	btn.on('click', function(e){
    		e.preventDefault();
    		var $this = $(this),
    			section = $this.closest('.section'),
    			newSection = section.next('.section'),
    			newPosition = newSection.offset().top + 40;
    		$('body').animate({'scrollTop' : newPosition}, 700);
    	})
    }())
	$('.job__slider').bxSlider({
		slideWidth: 5000,
		minSlides: 4,
		maxSlides: 4,
		slideMargin: 0,
		infiniteLoop: false,
		pager: false,
		nextSelector: ".job__next",
		prevSelector: ".job__prev",
		nextText: "",
		prevText: ""
	});
	$('.reviews__slider').bxSlider({
		slideWidth: 5000,
		minSlides: 2,
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
				controls = slider.closest('.reviews').find('.controls');
			if(count < 3) {
				controls.hide();
			}
		}
	});
  var wayp = (function(){
    var showSection = function(section, isAnimate){
        if(section && section !=='#'){
          console.log(section)
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
              activLink = $('.nav__link').filter('[href="#' + secId + '"]');
            activLink.addClass('active')
            .closest('li')
            .siblings()
            .find('.nav__link')
            .removeClass('active');
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
        $('.nav ul li a').on('click', function(e){
          e.preventDefault();
          showSection($(this).attr('href'), true);
        })
      })
  }());
  var parallax = function(){
    $(window).enllax();
  }
  parallax();
})

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
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
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-label.png',
            // Размеры метки.
            iconImageSize: [209, 195],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [7, -184]
        });

    myMap.geoObjects.add(myPlacemark);
});