var GoIt = (function () {
    function GoIt() {
    }

    GoIt.prototype.generateHtml = function (options) {
        var h1, wrapper, label, question, input, div, divWrapper, i = 0;
        wrapper = document.createElement('div');
        h1 = document.createElement('h1');
        h1.innerHTML = options.title;
        wrapper.appendChild(h1);
        for (var key in options.questions) {
            if (options.questions.hasOwnProperty(key)) {
                i++;
                question = document.createTextNode(i + '. ' + options.questions[key].question);
                wrapper.appendChild(question);
                div = document.createElement('div');
                for (var j = 0; j < options.questions[key].answers.length ; j++) {
                    divWrapper = document.createElement('div');
                    label = document.createElement('label');
                    label.innerHTML = options.questions[key].answers[j];
                    input = document.createElement('input');
                    input.type = 'checkbox';
                    divWrapper.appendChild(input);
                    divWrapper.appendChild(label);
                    div.appendChild(divWrapper);
                }
                wrapper.appendChild(div);
            }
        }

        return wrapper;
    };

    return GoIt;
})();


document.addEventListener('DOMContentLoaded', function () {
    var options, GoApp;
    GoApp = new GoIt();
    options = {
        title: 'Тест по программированию',
        questions: [
            {
                question: 'Вопрос №1',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3']
            },
            {
                question: 'Вопрос №2',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3']
            },
            {
                question: 'Вопрос №3',
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3']
            }
        ]
    };

    document.body.appendChild(GoApp.generateHtml(options));
});
