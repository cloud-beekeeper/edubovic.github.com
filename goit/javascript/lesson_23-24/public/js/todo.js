define('todo', [
    'todo/controller', 'todo/model', 'todo/view', 'todo/store'
],  function (Controller, Model, View, Store) {
        return (function () {
            function Todo() {
                new Controller(new View(), new Model(new Store('todo')));
            }

            return Todo;
        })();
    }
);
