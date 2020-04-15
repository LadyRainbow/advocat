$(document).ready(function () {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var $header = $('header');

    var $popUpGeneralBlock = $('.pop-up-general-block');
    var $popUpFilterMob = $('.pop-up-filter-mob');
    var $popupServicesNavMob = $('.pop-up-services-nav-mob');

    var $overlayPopUpWRP = $('.pop-up-overlay-wrapper');
    var $overlay = $('.overlay-pop-up');
    var $closePopUpBtn = $('.pop-up-general-block-close-btn');

    var $openFilterMobBtn = $('.open-filter-mob-btn');
    var $openPopupServicesNavMob = $('.open-services-nav-mob-btn');

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // soft scroll
    $(".scrollTo").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        var id  = $(this).attr('href');
        var top = $(id).offset().top;
        // анимируем переход к блоку, время: 500 мс
        $('body,html').animate({scrollTop: top}, 500);
        // находим высоту, на которой расположен блок
    });
    $(".scrollUp").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        // анимируем переход к блоку, время: 500 мс
        $('body,html').animate({scrollTop: 0}, 500);
        // находим высоту, на которой расположен блок
    });

    $(".scrollToMinusHeader").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        var id  = $(this).attr('href');
        var top = $(id).offset().top - 70;
        $('body,html').animate({scrollTop: top}, 500);
    });

    function headerChange () {
        if($window.scrollTop() > 50) {
            $header.addClass('fixed');
        } else {
            $header.removeClass('fixed');
            $('.burger').removeClass('active');
            $('.header-bottom').removeClass('active');
        }
    };

    if($('main').length) {
        headerChange();
        $window.scroll(function(){
            headerChange();
         });
    } else {
        $header.addClass('fixed')
    };

    if($(window).width() > 767) {
        $('.floating').floatit({
            limiter: 'footer',
            top_spacing: 100,
            bottom_spacing: 144
        });
    };




    // only number
    $(".input-number").keypress(function(event){
      event = event || window.event;
      if (event.charCode && event.charCode!=0 && event.charCode!=8 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
        return false;
    });

    // masked
    $('.mask-phone').mask('+7 (999) 99-99-99');

    // reviews slider
    $('.reviews-slider').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        nextArrow: $('.reviews-arrow-right'),
        prevArrow: $('.reviews-arrow-left'),
        responsive: [
                    {
                         breakpoint: 1861,
                         settings: {
                           slidesToShow: 3,
                           slidesToScroll: 1
                         }
                   },
                    {
                         breakpoint: 1398,
                         settings: {
                           slidesToShow: 2,
                           slidesToScroll: 1,
                           // centerMode: true,
                           //  centerPadding: '150px',
                         }
                   },
                    {
                         breakpoint: 1232,
                         settings: {
                           slidesToShow: 2,
                           slidesToScroll: 1,
                           centerMode: false,
                            centerPadding: '0',
                         }
                   },
                    {
                         breakpoint: 768,
                         settings: {
                           slidesToShow: 1,
                           slidesToScroll: 1,
                         }
                   },
        ]
    });
    // case-success slider
    $('.case-success-slider').slick({
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        nextArrow: $('.case-success-arrow-right'),
        prevArrow: $('.case-success-arrow-left'),
        responsive: [
                    {
                         breakpoint: 768,
                         settings: {
                           slidesToShow: 1,
                           slidesToScroll: 1,
                         }
                   },
        ]
    });



    $('.btn-menu-close').click(function () {
        $('.menu').fadeOut();
        $('.burger').removeClass('opacity');
        $('body').removeClass('active');
    });
    $('.menu-overlay').click(function () {
        $('.menu').fadeOut();
        $('.burger').removeClass('opacity');
        $('body').removeClass('active');
    });

    if(windowWidth > 991) {
        $('.burger').click(function () {
            $(this).toggleClass('active');
            $('header.fixed .header-bottom').toggleClass('active');
        });
    } else {
        $('.burger').click(function () {
            $('.menu').fadeIn();
            $(this).addClass('opacity');
            $('body').addClass('active');
        });
    }
    // pagination articles items
    if($('.success-page').length) {
        $('#pagination-container-success').pagination({
            dataSource: function(done){
              var result = [];
              for (var i = 1; i <= 10; i++) {
                result.push(i);
              }
              done(result);
            },
            pageSize: 6,
            showPrevious: true,
            showNext: true,
            callback: function(data, pagination) {
                // template method of yourself
                $('.paginationjs-prev a').html('<i class="fas fa-arrow-left"></i>');
                $('.paginationjs-next a').html('<i class="fas fa-arrow-right"></i>');
            }
        });
    };
    if($('.reviews-page').length) {
        $('#pagination-container-reviews').pagination({
            dataSource: function(done){
              var result = [];
              for (var i = 1; i <= 10; i++) {
                result.push(i);
              }
              done(result);
            },
            pageSize: 6,
            showPrevious: true,
            showNext: true,
            callback: function(data, pagination) {
                // template method of yourself
                $('.paginationjs-prev a').html('<i class="fas fa-arrow-left"></i>');
                $('.paginationjs-next a').html('<i class="fas fa-arrow-right"></i>');
            }
        });
    };
    if($('.articles-page').length) {
        $('#pagination-container-articles').pagination({
            dataSource: function(done){
              var result = [];
              for (var i = 1; i <= 10; i++) {
                result.push(i);
              }
              done(result);
            },
            pageSize: 6,
            showPrevious: true,
            showNext: true,
            callback: function(data, pagination) {
                // template method of yourself
                $('.paginationjs-prev a').html('<i class="fas fa-arrow-left"></i>');
                $('.paginationjs-next a').html('<i class="fas fa-arrow-right"></i>');
            }
        });
    };

    // pop-ups
    $openFilterMobBtn.click(function () {
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $popUpFilterMob.addClass('active');
    });

    $openPopupServicesNavMob.click(function () {
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $popupServicesNavMob.addClass('active');
    });

    $overlay.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
        $popUpFilterMob.removeClass('active');
        $popupServicesNavMob.removeClass('active');
    });
    $closePopUpBtn.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
        $popUpFilterMob.removeClass('active');
        $popupServicesNavMob.removeClass('active');
    });

    // open pop-ups functions
    function requestThnx () {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#requestThnx').addClass('active');
    };

    $('.how-to-get-btn').click(function (e) {
        e.preventDefault()
        howToGet ();
    });
});
