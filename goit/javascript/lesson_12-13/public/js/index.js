'use strict';

var GoItTest = (function () {
    function GoItTest(test, id) {
        localStorage.clear();
        localStorage.setItem('test', JSON.stringify(test));
        document.getElementById(id).innerHTML = tmpl('tQuestion', JSON.parse(localStorage.getItem('test')));
    }

    GoItTest.prototype.checkMyResults = function () {
        var theDiv = document.createElement('div');
        theDiv.id = 'modal';
        theDiv.innerHTML = tmpl('modalDialog', {
            body: 'body'
        });
        document.body.appendChild(theDiv);
        document.querySelector('.m-dialog__close').addEventListener('click', function () {
            closeModal();
        });
        document.querySelector('.m-dialog__OK').addEventListener('click', function () {
            closeModal(this);
        });

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
                trueAnswer: [1,2]
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
        GoApp.checkMyResults();
    });



    //document.body.appendChild(GoApp.generateHtml(options));
});
