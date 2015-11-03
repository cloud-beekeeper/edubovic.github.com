define('todo/store', [],  function () {
        return (function () {

            /**
             *
             * @param {string}      name
             * @param {function}    callback
             *
             * @private
             */
            function _createEmptyStore(name, callback) {
                localStorage[name] = JSON.stringify({
                    taskList: []
                });

                if (typeof callback === 'function') {
                    callback();
                }
            }

            /**
             * Constructor for store
             *
             * @property {string}   _dbName
             *
             * @constructor
             */
            function Store(name) {
                this._dbName = name;
                if (!localStorage[this._dbName]) {
                    _createEmptyStore(this._dbName, null);
                }
            }

            /**
             * Save record
             *
             * @param {object}      record
             * @param {function}    callback
             */
            Store.prototype.save = function (record, callback) {
                var data = JSON.parse(localStorage[this._dbName]);
                if (record.id === undefined) {
                    record.id = new Date().getTime();
                    data.taskList.push(record);
                } else {
                    data.taskList.every(function (element, index, array) {
                        if (element.id === +record.id) {
                            data.taskList[index].title = record.title;
                            //r = data.taskList[index];
                            return false;
                        }
                        return true;
                    });
                }
                localStorage[this._dbName] = JSON.stringify(data);
                callback(record);
            };

            /**
             *
             * @param {function}    callback
             */
            Store.prototype.findAll = function (callback) {
                callback(JSON.parse(localStorage[this._dbName]).taskList);
            };

            /**
             * Find record by id
             *
             * @param {number}      id
             * @param {function}    callback
             */
            Store.prototype.findById  = function (id, callback) {
                var record = {};
                JSON.parse(localStorage[this._dbName]).taskList.every(function (element, index, array) {
                    if (element.id === id) {
                        record = element;
                        return false;
                    }
                    return true;
                });
                callback(record);
            };

            /**
             * Remove record
             *
             * @param {number}      id
             * @param {function}    callback
             */
            Store.prototype.remove = function (id, callback) {
                var record = {},
                    data = JSON.parse(localStorage[this._dbName]);
                data.taskList.every(function (element, index, array) {
                    if (element.id === id) {
                        record = data.taskList.splice(index, 1);
                        return false;
                    }
                    return true;
                });
                localStorage[this._dbName] = JSON.stringify(data);
                callback(record[0]);
            };

            /**
             *
             * @param {function}    callback
             */
            Store.prototype.removeAll = function (callback) {
                _createEmptyStore(this._dbName, callback);
            };

            return Store;
        })();
    }
);
