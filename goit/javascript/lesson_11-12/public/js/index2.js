$(function () {
    var profile = {
        image: '../../../html/lesson_01/public/img/i.jpg',
        name: 'Edward Dubovic',
        fullName: 'Дубовик Эдуард Анатольевич',
        phone: '+380971206306',
        vk: 'http://vk.com/edward.dubovic'
    };
    var profileElement = document.getElementById("profile");
    profileElement.innerHTML = tmpl('tProfile', profile);
});