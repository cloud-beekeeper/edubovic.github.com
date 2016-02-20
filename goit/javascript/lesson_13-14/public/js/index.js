"use strict";

var GoItTest = (function () {
    function GoItTest(test, id) {
        localStorage.clear();
        localStorage.setItem('test', JSON.stringify(test));
        this.test = JSON.parse(localStorage.getItem('test'));
        document.getElementById(id).innerHTML = tmpl('tQuestion', this.test);
    }

    function getAnswer(questionId, questions) {
        for (var key in questions) {
            if (questions.hasOwnProperty(key) &&  questions[key].id === +questionId) {
                return questions[key].trueAnswer;
            }
        }
    }

    GoItTest.prototype.showModal = function (body) {
        var theDiv = document.createElement('div');
        theDiv.id = 'modal';
        theDiv.innerHTML = tmpl('modalDialog', {
            title: 'Result',
            body: body
        });
        document.body.appendChild(theDiv);
        document.querySelector('.m-dialog__close').addEventListener('click', function () {
            closeModal(this);
        });
        document.querySelector('.m-dialog__OK').addEventListener('click', function () {
            closeModal(this);
        });
    };

    GoItTest.prototype.getResults = function () {
        var livrare = [], t, el = document.forms[0].elements;
        var result = {};


        for (var i = 0; i < el.length - 1; i++) {
            t = el[i].name.match(/question\[([0-9])\]\[answer([0-9])\]/);
            result[t[1]] = result[t[1]] || [];
            if (el[i].checked) {
                result[t[1]].push(el[i].value);
            }
        }
        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                var answer = getAnswer(key, this.test.questions);
                livrare.push(result[key].toString() === answer.toString());
            }
        }

        return livrare.every(function (element) {
            return element;
        })
    };

    function closeModal(t) {
        t.removeEventListener();
        document.body.removeChild(document.getElementById('modal'));
        localStorage.clear();
    }

    return GoItTest;
})();

document.addEventListener('DOMContentLoaded', function () {
    var test, GoApp;
    test = {
        questions: [
            {
                id: 1,
                question: 'Вопрос №1',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                trueAnswer: 0
            },
            {
                id: 2,
                question: 'Вопрос №2',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                trueAnswer: [0, 2]
            },
            {
                id: 3,
                question: 'Вопрос №3',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                trueAnswer: 2
            }
        ]
    };
    GoApp = new GoItTest(test, 'idFormBody');

    document.querySelector('#checkMyResults').addEventListener('click', function (event) {
        event.preventDefault();
        GoApp.showModal(GoApp.getResults());
    });
});
