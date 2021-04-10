$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 10000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/leftarrow.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/rightarrow.svg"></button>',
        responsive: [
            {
                breakpoint: 769,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__it').eq(i).toggleClass('catalog-item__it_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal windows

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    function validate_forms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите своё имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свой email",
                    email: "Неправильно введен адрес почты"
                }
            },
            submitHandler: function (form) {
                console.log("here");
                $('form').submit(function(e) {
                    e.preventDefault();
                    $.ajax({
                        type: "POST",
                        url: "mailer/smart.php",
                        data: $(this).serialize()
                    }).done(function() {
                    $(this).find("input").val("");
                    $('#consultation, #order').fadeOut();
                    $('.overlay, #thanks').fadeIn('slow');           
                    $('form').trigger('reset');
                    });
                    return false;
                }); 
            }
        }); 
    }

    validate_forms('#order form');
    validate_forms('#consultation-form');
    validate_forms('#consultation form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // smooth scroll and page up

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href").offsetTop;
        console.log(_href)
        $("html, body").animate({scrollTop: _href+"px"});
        return false;
    });

    new WOW().init();

});
          