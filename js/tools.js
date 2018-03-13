$(document).ready(function() {

    $('body').on('click', '.header-search-link', function(e) {
        $('.header-search').addClass('open');
        window.setTimeout(function() {
            $('.header-search-form-input input').trigger('focus');
        }, 300);
        e.preventDefault();
    });

    $('body').on('click', '.header-search-link-close', function(e) {
        $('.header-search').removeClass('open');
        e.preventDefault();
    });

    var timerSlider = null;

    $('.slider').each(function() {
        var curSlider = $(this);
        var curCount = curSlider.find('.slider-item').length;
        if (curCount > 1) {
            var ctrlHTML = '<ul>';
            for (var i = 0; i < curCount; i++) {
                ctrlHTML += '<li><a href="#"></a></li>';
            }
            ctrlHTML    += '</ul>';
            curSlider.find('.slider-ctrl-inner').html(ctrlHTML);
            curSlider.find('.slider-ctrl-inner li').eq(0).addClass('active');
        } else {
            $('.slider-ctrl').hide();
        }
        curSlider.data('isAnimation', false);
        timerSlider = window.setTimeout(function() { $('.slider-next a').trigger('click'); }, 5000);
    });

    $('body').on('click', '.slider-ctrl-inner ul li a', function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            var curSlider = curItem.parents().filter('.slider');
            if (!curSlider.data('isAnimation')) {
                curSlider.data('isAnimation', true);
                window.clearTimeout(timerSlider);
                timerSlider = null;

                var curIndex = curSlider.find('.slider-ctrl-inner ul li').index(curSlider.find('.slider-ctrl-inner ul li.active'));
                var newIndex = curSlider.find('.slider-ctrl-inner ul li').index(curItem);
                curSlider.find('.slider-ctrl-inner ul li.active').removeClass('active');
                curItem.addClass('active');

                var curSlide = curSlider.find('.slider-item').eq(curIndex);
                var newSlide = curSlider.find('.slider-item').eq(newIndex);
                curSlide.css({'z-index': 2});
                newSlide.find('.slider-item-text').css({'opacity': 0, 'left': -50});
                newSlide.find('.slider-item-left-bg').css({'margin-right': 1000});
                newSlide.find('.slider-item-right-inner img').css({'opacity': 0});
                newSlide.find('.slider-item-right-bg').css({'left': 0, 'width': 0});
                newSlide.css({'z-index': 3, 'visibility': 'visible'});
                newSlide.find('.slider-item-left-bg').animate({'margin-right': 0}, 300, function() {
                    curSlide.find('.slider-item-text').animate({'opacity': 0}, 300, function() {
                        newSlide.find('.slider-item-right-bg').animate({'width': 1500}, 300, function() {
                            newSlide.find('.slider-item-right-inner img').css({'opacity': 1});
                            newSlide.find('.slider-item-right-bg').animate({'left': 1500}, 300);
                            newSlide.find('.slider-item-text').animate({'opacity': 1, 'left': 0}, 300, function() {
                                curSlider.data('isAnimation', false);
                                timerSlider = window.setTimeout(function() { $('.slider-next a').trigger('click'); }, 5000);
                            });
                        });
                    });
                });
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.slider-next a', function(e) {
        var curSlider = $(this).parents().filter('.slider');
        var curIndex = curSlider.find('.slider-ctrl-inner ul li').index(curSlider.find('.slider-ctrl-inner ul li.active'));
        curIndex++;
        if (curIndex > curSlider.find('.slider-ctrl-inner ul li').length - 1) {
            curIndex = 0;
        }
        curSlider.find('.slider-ctrl-inner ul li').eq(curIndex).find('a').trigger('click');
        e.preventDefault();
    });

    $('.main-events-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1209,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 989,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('body').on('mouseover', '.main-useful-link-4', function() {
        var curVideo = $(this).find('video')[0];
        if (curVideo.paused) {
            curVideo.play();
        }
    });

    $('body').on('mouseout', '.main-useful-link-4', function() {
        var curVideo = $(this).find('video')[0];
        curVideo.pause();
    });

    $('.main-logos-list').each(function() {
        $('.main-logos-count-current').html('5');
        $('.main-logos-count-all').html($('.main-logos-item').length);
    });

    $('.main-logos-list').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1209,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 989,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 478,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }).on('afterChange', function(event, slick, currentSlide) {
        var countSlides = $('.main-logos-item').length;
        if (countSlides - (currentSlide + 5) < 5) {
            $('.main-logos-count-current').html(countSlides - (currentSlide + 5));
        } else {
            $('.main-logos-count-current').html(5);
        }
        if ((currentSlide + 5) >= countSlides) {
            $('.main-logos-count').hide();
        } else {
            $('.main-logos-count').show();
        }
    });

    $('.main-format-gallery-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M30,15 L30,34 L28,34 L28,15 L9,15 L9,13 L30,13 L30,15 Z" id="path-1"></path></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Arrow_white"><g id="Combined-Shape" transform="translate(19.500000, 23.500000) rotate(-315.000000) translate(-19.500000, -23.500000) "><use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use><path stroke="#FFFFFF" stroke-width="0.5" d="M27.75,15.25 L8.75,15.25 L8.75,12.75 L30.25,12.75 L30.25,34.25 L27.75,34.25 L27.75,15.25 Z"></path></g></g></g></svg></button>',
        dots: true
    });

    $('body').on('click', '.window-link', function(e) {
        e.preventDefault();
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    if (Cookies.get('subscribe-success') == '1') {
        $('.main-subscribe-content').addClass('success');
    }

    if (Cookies.get('subscribe-window') != '1' && Cookies.get('subscribe-success') != '1') {
        $('.window-subscribe').fadeIn();
        Cookies.set('subscribe-window', '1', {expires: 1});
    }

    $('body').on('click', '.window-subscribe-close', function(e) {
        $('.window-subscribe').fadeOut();
        e.preventDefault();
    });

    $('body').on('click', '.header-top-schedule-link', function(e) {
        $('.header-schedule').stop(true, true);
        $('.header-schedule-item').stop(true, true);
        if ($('.header-schedule-item').offset().top < 0) {
            $('.header-schedule').stop(true, true).animate({'top': 47}, 100, function() {
                $('.header-schedule-item').eq(0).animate({'opacity': 1}, 100, function() {
                    $('.header-schedule-item').eq(1).animate({'opacity': 1}, 100, function() {
                        $('.header-schedule-item').eq(2).animate({'opacity': 1}, 100);
                    });
                });
            });
        } else {
            $('.header-schedule-item').eq(2).animate({'opacity': 0}, 100, function() {
                $('.header-schedule-item').eq(1).animate({'opacity': 0}, 100, function() {
                    $('.header-schedule-item').eq(0).animate({'opacity': 0}, 100, function() {
                        $('.header-schedule').stop(true, true).animate({'top': -999}, 100);
                    });
                });
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.header-schedule-close', function(e) {
        $('.header-schedule').stop(true, true);
        $('.header-schedule-item').stop(true, true);
        $('.header-schedule-item').eq(2).animate({'opacity': 0}, 100, function() {
            $('.header-schedule-item').eq(1).animate({'opacity': 0}, 100, function() {
                $('.header-schedule-item').eq(0).animate({'opacity': 0}, 100, function() {
                    $('.header-schedule').stop(true, true).animate({'top': -999}, 100);
                });
            });
        });
        e.preventDefault();
    });

    $('body').on('click', '.mobile-menu-link', function(e) {
        $('html').addClass('mobile-menu-open');
        e.preventDefault();
    });

    $('body').on('click', '.mobile-menu-close', function(e) {
        $('html').removeClass('mobile-menu-open');
        e.preventDefault();
    });

    $(document).on('click', function(e) {
        if ($(e.target).parents().filter('.header-schedule').length == 0 && !$(e.target).hasClass('header-schedule') && $(e.target).parents().filter('.header-top-schedule-link').length == 0 && !$(e.target).hasClass('header-top-schedule-link')) {
        $('.header-schedule').stop(true, true);
        $('.header-schedule-item').stop(true, true);
        $('.header-schedule-item').eq(2).animate({'opacity': 0}, 100, function() {
            $('.header-schedule-item').eq(1).animate({'opacity': 0}, 100, function() {
                $('.header-schedule-item').eq(0).animate({'opacity': 0}, 100, function() {
                    $('.header-schedule').stop(true, true).animate({'top': -999}, 100);
                });
            });
        });
        }
    });

    $('body').on('click', '.gallery-slider-prev', function(e) {
        var curGallery = $(this).parents().filter('.gallery');
        var curGalleryInner = curGallery.find('.gallery-slider-inner');
        if (curGalleryInner.hasClass('slick-slider')) {
            curGalleryInner.slick('slickPrev');
        }
        e.preventDefault();
    });

    $('body').on('click', '.gallery-slider-next', function(e) {
        var curGallery = $(this).parents().filter('.gallery');
        var curGalleryInner = curGallery.find('.gallery-slider-inner');
        if (curGalleryInner.hasClass('slick-slider')) {
            curGalleryInner.slick('slickNext');
        }
        e.preventDefault();
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');


    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name-text').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
        curField.find('.form-file-name').addClass('active');
    });

    curForm.find('.form-file-name-del').click(function() {
        var curField = $(this).parents().filter('.form-file');
        curField.find('input').val('');
        curField.find('.form-file-name').removeClass('active');
        curField.find('.form-file-name-text').html(curField.find('.form-file-name-text').data('default'));
    });

    curForm.find('.form-reset a').click(function(e) {
        curForm.trigger('reset');

        curForm.find('label.error').remove();
        curForm.find('.error').removeClass('error');
        curForm.find('.valid').removeClass('valid');

        window.setTimeout(function() {
            curForm.find('.form-select select').chosen('destroy');
            curForm.find('.form-select select').chosen({disable_search: true, hide_results_on_select: false, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
        }, 100);

        e.preventDefault();
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        },
        submitHandler: function(form) {
            if ($(form).parent().hasClass('main-subscribe-form')) {
                $('.main-subscribe-content, .window-subscribe').addClass('success');
                $('.window-subscribe').fadeIn();
                Cookies.set('subscribe-success', '1', {expires: 365});
            } else if ($(form).parent().hasClass('window-subscribe-form')) {
                $('.main-subscribe-content, .window-subscribe').addClass('success');
                Cookies.set('subscribe-success', '1', {expires: 365});
            } else {
                form.submit();
            }
        }
    });
}

function checkErrors() {
    $('.form-checkbox, .form-file, .main-subscribe-checkbox, .form-policy').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

$(window).on('load resize', function() {
    var curDiff = ($('.wrapper').width() - $('.container').eq(0).width()) / 2;
    $('.content-header-right-map').css({'margin-right': -curDiff});

    $('.main-events-inner').each(function() {
        var curList = $(this);

        curList.find('.main-events-item-preview').css({'min-height': '0px'});

        curList.find('.main-events-item-preview').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.main-events-item-preview').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.main-events-item-content').css({'min-height': '0px'});

        curList.find('.main-events-item-content').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.main-events-item-content').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    $('.shops').each(function() {
        var curList = $(this);

        curList.find('.shops-item-preview').css({'min-height': '0px'});

        curList.find('.shops-item-preview').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.shops-item-preview').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.shops-item-content').css({'min-height': '0px'});

        curList.find('.shops-item-content').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.height();
            var curTop = curBlock.offset().top;

            curList.find('.shops-item-content').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.height();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        var curGalleryList = curGallery.find('.gallery-list a');
        var curGalleryInner = curGallery.find('.gallery-slider-inner');
        if (curGalleryInner.hasClass('slick-slider')) {
            curGalleryInner.slick('unslick');
        }
        var curCount = 6;
        var curWidth = $(window).width();
        if (curWidth < 990) {
            curCount = 4;
        }
        if (curWidth < 767) {
            curCount = 1;
        }
        var allCount = curGalleryList.length;
        var curPage = Math.ceil(allCount / curCount);
        var newHTML = '';
        for (var i = 0; i < curPage; i++) {
            newHTML += '<div class="gallery-slider-item">';
            for (var j = 0; j < curCount; j++) {
                if (i * curCount + j < curGalleryList.length) {
                    var curLink = curGalleryList.eq(i * curCount + j);
                    newHTML += '<div class="gallery-slider-item-img"><a href="' + curLink.attr('href') + '" data-fancybox="gallery">' + curLink.html() + '</a></div>';
                }
            }
            newHTML += '</div>';
        }
        curGalleryInner.html(newHTML);

        $('.gallery-slider-item-img a').fancybox({
            buttons : [
                'close'
            ],
            lang : 'ru',
            i18n : {
                'ru' : {
                    CLOSE   : 'Закрыть',
                    NEXT    : 'Вперед',
                    PREV    : 'Назад'
                }
            }
        });

        curGallery.find('.gallery-slider-current').html(1);
        curGallery.find('.gallery-slider-count').html(curPage);
        curGallery.find('.gallery-slider-prev').css({'display': 'none'});
        if (curPage > 1) {
            curGallery.find('.gallery-slider-next').css({'display': 'block'});
        } else {
            curGallery.find('.gallery-slider-next').css({'display': 'none'});
        }

        curGalleryInner.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            adaptiveHeight: true,
            dots: false,
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            curGallery.find('.gallery-slider-current').html(nextSlide + 1);
            if (nextSlide > 0) {
                curGallery.find('.gallery-slider-prev').css({'display': 'block'});
            } else {
                curGallery.find('.gallery-slider-prev').css({'display': 'none'});
            }
            if (nextSlide < curGallery.find('.gallery-slider-item').length - 1) {
                curGallery.find('.gallery-slider-next').css({'display': 'block'});
            } else {
                curGallery.find('.gallery-slider-next').css({'display': 'none'});
            }
        });

    });
});