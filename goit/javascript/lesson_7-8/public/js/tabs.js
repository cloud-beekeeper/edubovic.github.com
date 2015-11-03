$(function () {
    var $tabs = $('#tabs');

    $tabs.find('.btn-tab__item').click(function () {
        $(this).parent().find('.btn-tab__item_active').removeClass('btn-tab__item_active');
        $(this).addClass('btn-tab__item_active');
        var t = $(this).find('a').attr('id').split('-');
        $tabs.find('.tabs-content').find('.tabs-content__item').removeClass('tabs-content__item_active');
        $tabs.find('#tabs-content-'.concat(t[1])).addClass('tabs-content__item_active');
    });

    var $form = $('#form');

    $form.find('.form__input').hover(function () {
        $(this).next().show();
    }, function () {
        $(this).next().hide();
    });
});

