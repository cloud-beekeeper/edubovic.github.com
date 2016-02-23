$(function () {

   $('.nav-menu__li').hover(function () {
       $(this).find('a').next().slideDown();

    }, function () {
       $(this).find('a').next().slideUp();
   });
});
