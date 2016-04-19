window.FRPopup = (function (window, $) {
    'use strict';
    var self;


    function FRPopup(config) {
        self = this;
        self.config = $.extend(self.defaults, config);
        self.popup = $.magnificPopup.instance;

        self.init();
    }


    FRPopup.prototype = {

        defaults: {
            selector: '.fr-popup-anchor'
        },


        init: function () {
            self.$popupEls = $(self.config.selector);
            self._attachPopup();
        },


        destroy: function () {
            self.$popupEls.off('click', self._showPopup);
            self.popup.close();
        },


        _attachPopup: function () {
            self.$popupEls.on('click', self._showPopup);
        },


        _recalculateSwiperSlideshow: function (el) {
            var slideshows = el.find('.swiper-container');

            if (el.get(0).classList.contains('swiper-container')) {
                slideshows = slideshows.addBack(el);
            }

            slideshows.each(function() {
                var swiper = window.swiperSlideshows && window.swiperSlideshows[this.id];
                if (swiper) {
                    swiper.resizeFix();
                }
            });
        },


        _showPopup: function (e) {
            e.preventDefault();

            var el = $(this);
            var href = el.attr('href');
            var src;

            if (href) {
                var target = $(href);

                if (target) {
                    var items = {type: 'inline', src: target},
                        isDisplayingImage = false;

                    // if target is image widget then show image popup
                    if (target.hasClass('fr-img')) {
                        var img = target.find('img').first();

                        if (img) {
                            isDisplayingImage = true;
                            src = img.attr('src');
                            items = {type: 'image', src: src};
                        }
                    }

                    // if target widget is container and has no children find background image and show it in popup
                    else if (target.hasClass('fr-container')) {
                        var childWidgets = target.find('.fr-widget');
                        if (!childWidgets.length) {
                            var backgroundImage = target.css('background-image').match(/url\(['"]?([^'"]+)['"]?\)/);

                            if (backgroundImage) {
                                isDisplayingImage = true;
                                src = backgroundImage[1];
                                items = {type: 'image', src: src};
                            }
                        }
                    }

                    self.popup.open({
                        items: items,
                        removalDelay: 300,
                        callbacks: {
                            open: function () {
                                if (!isDisplayingImage) {
                                    target.show();
                                }
                                // Recalculate Swiper slideshows when open in popup
                                self._recalculateSwiperSlideshow(target);
                            },
                            afterClose: function () {
                                target.removeClass('mfp-hide').css('display', '');
                                // Recalculate Swiper slideshows when returned to DOM
                                self._recalculateSwiperSlideshow(target);
                            }
                        }
                    });
                }
            }
        }
    };

    return FRPopup;

})(window, $);
