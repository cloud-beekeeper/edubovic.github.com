var GoMath = (function () {
    function GoMath() {

    }
    GoMath.prototype.pow = function (base, exponent) {
        var result = base;
        if (typeof(base) !== 'number' || typeof(exponent) !== 'number' || !((exponent ^ 0) === exponent)) {
            return false;
        }

        if (exponent === 1) {
            return result;
        }
        if (exponent === 0 || base === 0) {
            return 0;
        }
        if (base === 1) {
            return 1;
        }

        for (var i = 1; i < exponent; i++) {
            result *= base;
        }

        return result;
    };

    return GoMath;
})();

document.addEventListener('DOMContentLoaded', function () {
    var GoApp = new GoMath();

    document.getElementById("goApp_pow").onclick = function () {
        var base, exponent;
        base = +prompt('Введите число (base)', '1');
        exponent = +prompt('Введит степень (exponent)', '1');

        console.info('Результат: ', GoApp.pow(base, exponent));
    };

    document.getElementById("goApp_findUser").onclick = function () {
        var nameUser, arr = [], COUNTER = 5;
        for (var i = 0; i < COUNTER ; i++) {
            arr.push(prompt('Введит элемент массива', 'default'));
        }
        console.log(arr);
        nameUser = prompt('Введите имя пользователя', 'user');
        if (arr.indexOf(nameUser) == -1) {
            alert ('Error. User not find');
            return false;
        }
        alert(nameUser.concat(', вы успешно вошли'));
    };
});
