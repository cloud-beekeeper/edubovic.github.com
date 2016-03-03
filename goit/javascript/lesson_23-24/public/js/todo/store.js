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
                var response = {}, data = JSON.parse(localStorage[this._dbName]);
                if (record.id === undefined) {
                    response.newRecord = true;
                    response.id = new Date().getTime();
                    data.taskList.push({
                        id: response.id,
                        title: record.title
                    });
                } else {
                    response.newRecord = false;
                    //data.taskList[record.id] = record.title;
                    //response.id = record.id;
                    console.log('dddddddddddddddddddddddddddddddddddddddd',response);
                    var res = data.taskList.every(function (element, index, array) {
                        if (element === record.id) {

                            return false;
                        }

                        return true;
                    });
                    console.log('res', res);
                }
                response.title = record.title;

                console.log('response',response);
                localStorage[this._dbName] = JSON.stringify(data);
                callback(response);
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
                callback({
                    id: id,
                    title: JSON.parse(localStorage[this._dbName]).taskList[id]
                });
            };

            /**
             * Remove record
             *
             * @param {number}      id
             * @param {function}    callback
             */
            Store.prototype.remove = function (id, callback) {
                var removeData, data = JSON.parse(localStorage[this._dbName]);
                removeData = data.taskList.splice(id, 1);
                localStorage[this._dbName] = JSON.stringify(data);
                callback({
                    id: id,
                    title: removeData
                });
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
