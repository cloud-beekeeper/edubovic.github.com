(function ($) {


    $.fn.menu = function () {
        console.log(11);
    };

    console.log($(this));
    $(this).find('.nav-menu__a_dropdown').hover(function ()
    {
        console.log(11);
    });

    return this;
})(jQuery);
