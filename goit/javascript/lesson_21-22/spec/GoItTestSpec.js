var me = {}, mockLocalStorage, mockDocument;
mockLocalStorage = (function() {
    var store = {};

    return {
        getItem: function(key) {
            return store[key];
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };
})();

mockDocument = (function() {
    return {
        createElement: function() {
            return true;
        },
        body: function() {
            return true;
        },
        querySelector: function() {
            return true;
        }
    };
})();

Object.defineProperty(me, 'localStorage', { value: mockLocalStorage });
Object.defineProperty(me, 'document', { value: mockDocument });


var GoItTest = require('../public/build/js/GoItTest.js'),
    data, GoApp, elementsFalse, elementsTrue;
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
elementsTrue = [{"name":"question[1][answer0]","checked":true,"value":"0"},{"name":"question[1][answer0]","checked":false,"value":"1"},{"name":"question[1][answer0]","checked":false,"value":"2"},{"name":"question[2][answer1]","checked":true,"value":"0"},{"name":"question[2][answer1]","checked":false,"value":"1"},{"name":"question[2][answer1]","checked":true,"value":"2"},{"name":"question[3][answer2]","checked":false,"value":"0"},{"name":"question[3][answer2]","checked":false,"value":"1"},{"name":"question[3][answer2]","checked":true,"value":"2"}];
elementsFalse = [{"name":"question[1][answer0]","checked":true,"value":"0"},{"name":"question[1][answer0]","checked":false,"value":"1"},{"name":"question[1][answer0]","checked":false,"value":"2"},{"name":"question[2][answer1]","checked":true,"value":"0"},{"name":"question[2][answer1]","checked":false,"value":"1"},{"name":"question[2][answer1]","checked":true,"value":"2"},{"name":"question[3][answer2]","checked":false,"value":"0"},{"name":"question[3][answer2]","checked":true,"value":"1"},{"name":"question[3][answer2]","checked":false,"value":"2"}];

GoApp = new GoItTest(me.localStorage);
GoApp.init(data);


describe("GoItTest", function() {
    it("checkResults", function() {
        expect(GoApp.checkResults(elementsTrue)).toBe(true);
        expect(GoApp.checkResults(elementsFalse)).toBe(false);
        expect(GoApp.innerHTML('id', function (id, data) {
            return id;
        })).toBe('id');
    });
});
