var data, GoApp;

function showModal(title, body) {
    var theDiv = document.createElement('div');
    theDiv.id = 'modal';
    theDiv.innerHTML = tmpl('modalDialog', {
        title: title,
        body: body
    });
    document.body.appendChild(theDiv);
    document.querySelector('.m-dialog__close').addEventListener('click', function (e) {
        closeModal(e.target);
    });
    document.querySelector('.m-dialog__OK').addEventListener('click', function (e) {
        closeModal(e.target);
    });
}

function closeModal(target) {
    target.removeEventListener();
    document.body.removeChild(document.getElementById('modal'));
    localStorage.clear();
}


document.addEventListener('DOMContentLoaded', function () {
    data = {
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
    GoApp = new GoItTest(localStorage);
    GoApp.init(data);
    GoApp.innerHTML('idFormBody', function (id, data) {
        document.getElementById(id).innerHTML = tmpl('tQuestion', data);
    });

    document.querySelector('#checkMyResults').addEventListener('click', function (event) {
        event.preventDefault();

        var elements =[];

        for (var i = 0; i < document.forms[0].elements.length; i++) {
            elements.push({
                name: document.forms[0].elements[i].name,
                checked: document.forms[0].elements[i].checked,
                value: document.forms[0].elements[i].value
            }
            );
        }

        var result = GoApp.checkResults(elements);
        showModal('Result', result ? 'Вы сдали!' : 'Вы не сдали!');
    });
});
