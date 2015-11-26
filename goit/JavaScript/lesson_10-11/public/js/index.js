
var GoApp;

function GoMath() {
    GoMath.prototype.pow = function () {
        var base, exponent, i, result;
        base = prompt('Введите число (base)', 1) * 1;
        result = base;
        exponent = prompt('Введит степень (exponent)', 1) * 1;
        if (typeof(base) !== 'number' || typeof(exponent) !== 'number' || !((exponent ^ 0) === exponent)) {
            alert('Error base or exponent');
            return false;
        }
        if (exponent !== 1) {
            for (i = 1; i < exponent; i++) {
                result *= base;
            }
        }
        console.info('Результат: ', result);
        return true;
    }

    GoMath.prototype.findByName = function () {
        var i, element, nameUser
        mas = [],
        COUNTER = 4;
        for (i = 0; i <= COUNTER; i++) {
            mas[i] = prompt('Введит элемент массива [' + ++i + ']', 'default');
        }
        nameUser = prompt('Введите имя пользователя', 'user');
        for (i = 0; i < mas.length; i++) {
            if (mas[i] === nameUser) {
                alert(nameUser.concat(', вы успешно вошли'));
                return true;
            }
        }
        alert ('Error. User not find');
        return false;
    }
}

GoApp = new GoMath();
