define('todo/controller', [],  function () {
    return (function () {

        /**
         * Constructor for controller
         *
         * @param {View} view
         * @param {Model} model
         *
         * @property {View} view
         * @property {Model} model
         *
         * @constructor
         */
        function Controller(view, model) {
            var me = this;
            this.view = view;
            this.model = model;

            this.view.bind('submit', function (record) {
                (record.id === undefined) ? me.addItem(record) : me.editSave(record);
            });

            this.view.bind('getIdRecord', function (id) {
                me.getRecordById({ id: id });
            });

            this.view.bind('editCancel', function () {
                me.editCancel();
            });

            this.view.bind('remove', function (id) {
                me.remove(id);
            });

            this.view.bind('removeAll', function () {
                me.removeAll();
            });
            this.showAll();
        }

        Controller.prototype.addItem = function (record) {
            var me = this;
            if (record.title === '') {
                return false;
            }
            this.model.save(record, function (r) {
                me.view.render('newTask', r);
            });
        };

        Controller.prototype.editSave = function (record) {
            var me = this;
            if (record.title === '') {
                return false;
            }
            this.model.save(record, function (r) {
                me.view.render('editSave', r);
            });
        };

        Controller.prototype.editCancel = function () {
            var me = this;
            me.view.render('editCancel', {});
        };

        /**
         *
         * @param {number}  id
         */
        Controller.prototype.remove = function (id) {
            var me = this;
            this.model.remove(id, function (r) {
                me.view.render('remove', r);
            });
        };

        /**
         *
         */
        Controller.prototype.removeAll = function () {
            var me = this;
            this.model.removeAll(function () {
                me.view.render('removeAll');
            });
        };

        /**
         *
         */
        Controller.prototype.showAll = function () {
            var me = this;
            me.model.getData({ id: undefined }, function (r) {
                console.log(r)
                me.view.render('allTasks', r);
            });
        };
        /**
         *
         * @param {object} record
         */
        Controller.prototype.getRecordById = function (record) {
            var me = this;
            console.log('record',record);
            this.model.getData(record, function (r) {
                me.view.render('edit', r);
            });
        };

        return Controller;
    })();
    }
);
