(function ($) {
    $.fn.carousel = function (options) {
        var settings = $.extend({
            pixelsOffset: 125,
            currentLeftValue: 0,
            maximumOffset: 0,
            show: 5,
            btnLeft: '.carousel-arrow-left',
            btnRight: '.carousel-arrow-right',
            carousel: '.carousel-hider'
        }, options);

        var carousel = $(this);

        var leftUIEl = $(this).find(settings.btnLeft);
        var rightUIEl = $(this).find(settings.btnRight);
        var elementsList = $(this).find(settings.carousel).find('ul');

        $(this).find(settings.carousel).css({
            'width': (settings.show * settings.pixelsOffset) + 'px'
        });
        console.log(settings, (settings.show * settings.pixelsOffset) + 'px');
        var elementsCount = elementsList.find('li').length;
        var minimumOffset = - ((elementsCount - settings.show) * settings.pixelsOffset);


        leftUIEl.on('click', function() {
            if (settings.currentLeftValue != settings.maximumOffset) {
                settings.currentLeftValue += settings.pixelsOffset;
                elementsList.animate({ left : settings.currentLeftValue + "px"}, 500);
            }
        });

        rightUIEl.on('click', function() {
            if (settings.currentLeftValue != minimumOffset) {
                settings.currentLeftValue -= settings.pixelsOffset;
                elementsList.animate({ left: settings.currentLeftValue + "px"}, 500);
            }
        });
    };

    return this;
})(jQuery);
