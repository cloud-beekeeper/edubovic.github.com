var GoItTest = (function () {
    function GoItTest(localStorage) {
        this.localStorage = localStorage;
    }

    GoItTest.prototype.init = function (test) {
        this.localStorage.clear();
        this.localStorage.setItem('test', JSON.stringify(test));
        this.test = JSON.parse(this.localStorage.getItem('test'));
    };

    GoItTest.prototype.innerHTML = function (id, callback) {
        return callback(id, this.test);
    };

    GoItTest.prototype.checkResults = function (elements) {
        return getResults.call(this, elements).every(function (element) {
            return element;
        })
    };

    function getAnswer(questionId) {
        for (var key in this.test.questions) {
            if (this.test.questions.hasOwnProperty(key) &&  this.test.questions[key].id === +questionId) {
                return this.test.questions[key].trueAnswer;
            }
        }
    }

    function getResults(elements) {
        var livrare = [], t, result = {};
        for (var i = 0; i < elements.length - 1; i++) {
            t = elements[i].name.match(/question\[([0-9])\]\[answer([0-9])\]/);
            result[t[1]] = result[t[1]] || [];
            if (elements[i].checked) {
                result[t[1]].push(elements[i].value);
            }
        }
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                livrare.push(result[key].toString() === getAnswer.call(this, key).toString());
            }
        }

        return livrare;
    }

    return GoItTest;
})();

try {
    module.exports = GoItTest;
} catch (e) {

}
