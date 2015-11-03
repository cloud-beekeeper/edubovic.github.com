class GoItTest {
    constructor(localStorage) {
        this.localStorage = localStorage;
    }

    init(test) {
        this.localStorage.clear();
        this.localStorage.setItem('test', JSON.stringify(test));
        this.test = JSON.parse(this.localStorage.getItem('test'));
    }

    innerHTML(id, callback) {
        return callback(id, this.test);
    }

    checkResults(elements) {
        return this._getResults(elements).every((element) => element)
    }

    _getAnswer(questionId) {
        for (let value of this.test.questions) {
            if (value.id === +questionId) {
                return value.trueAnswer;
            }
        }
    }

    _getResults(elements) {
        let livrare = [], t, result = {};

        for (let value of elements) {
            t = value.name.match(/question\[([0-9])\]\[answer([0-9])\]/);
            result[t[1]] = result[t[1]] || [];
            if (value.checked) {
                result[t[1]].push(value.value);
            }
        }
        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                livrare.push(result[key].toString() === this._getAnswer(key).toString());
            }
        }

        return livrare;
    }

}

try {
    module.exports = GoItTest;
} catch (e) {

}
