define('todo/model', [],  function () {
        return (function () {

            /**
             * Constructor for Model
             *
             * @param {Storage} storage
             *
             * @property {Storage} storage
             *
             * @constructor
             */
            function Model(storage) {
                this.storage = storage;
            }

            /**
             *
             * @param {object}      record
             * @param {function}    callback
             */
            Model.prototype.save = function (record, callback) {
                this.storage.save(record, callback);
            };

            /**
             *
             * @param {object}      record
             * @param {function}    callback
             */
            Model.prototype.getData = function (record, callback) {
                (typeof record.id === 'number')
                    ? this.storage.findById(record.index, callback)
                    : this.storage.findAll(callback);
            };

            /**
             *
             * @param {number}      index
             * @param {function}    callback
             */
            Model.prototype.remove = function (index, callback) {
                this.storage.remove(index, callback);
            };

            /**
             *
             * @param {function}    callback
             */
            Model.prototype.removeAll = function (callback) {
                this.storage.removeAll(callback);
            };

            return Model;
        })();
    }
);
