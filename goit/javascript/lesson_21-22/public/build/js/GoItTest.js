'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoItTest = function () {
    function GoItTest(localStorage) {
        _classCallCheck(this, GoItTest);

        this.localStorage = localStorage;
    }

    _createClass(GoItTest, [{
        key: 'init',
        value: function init(test) {
            this.localStorage.clear();
            this.localStorage.setItem('test', JSON.stringify(test));
            this.test = JSON.parse(this.localStorage.getItem('test'));
        }
    }, {
        key: 'innerHTML',
        value: function innerHTML(id, callback) {
            return callback(id, this.test);
        }
    }, {
        key: 'checkResults',
        value: function checkResults(elements) {
            return this._getResults(elements).every(function (element) {
                return element;
            });
        }
    }, {
        key: '_getAnswer',
        value: function _getAnswer(questionId) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.test.questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    if (value.id === +questionId) {
                        return value.trueAnswer;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: '_getResults',
        value: function _getResults(elements) {
            var livrare = [],
                t = undefined,
                result = {};

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    t = value.name.match(/question\[([0-9])\]\[answer([0-9])\]/);
                    result[t[1]] = result[t[1]] || [];
                    if (value.checked) {
                        result[t[1]].push(value.value);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    livrare.push(result[key].toString() === this._getAnswer(key).toString());
                }
            }

            return livrare;
        }
    }]);

    return GoItTest;
}();

try {
    module.exports = GoItTest;
} catch (e) {}