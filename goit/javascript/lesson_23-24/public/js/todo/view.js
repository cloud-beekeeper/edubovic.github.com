define('todo/view', ['helpers', 'todo/template'],  function (Helpers, Template) {
        return (function () {
            /**
             * Constructor for view
             *
             * @property {Helpers}  helper
             * @property {Template} template
             * @property {object}   listTasks
             * @property {object}   createTask
             * @property {object}   removeAllTasks
             * @property {object}   newTask
             *
             * @constructor
             */
            function View() {
                this.helper = new Helpers();
                this.template = new Template();

                this.listTasks  = this.helper.qs('.list-tasks');
                this.submit = this.helper.qs('.submit-task');
                this.removeAllTasks = this.helper.qs('.remove-all-tasks');
                this.newTask = this.helper.qs('.new-task');
            }

            View.prototype.bind = function (event, handler) {
                var me = this, listEvents;
                listEvents = {
                    submit: function () {
                        var callback = function () {
                            var value = this.value;
                            this.value = '';
                            handler({
                                id: this.dataset.id,
                                title: value.trim()
                            });
                        };
                        me.helper.on(me.submit, 'click', callback);
                        me.helper.on(me.newTask, 'change', callback);
                    },
                    getIdRecord: function () {
                        me.helper.delegate(me.listTasks , '.t-edit-id', 'click', function () {
                            var tr = me.helper.parent(this, 'tr');
                            handler(parseInt(tr.dataset.id.replace('item-', ''), 10));
                        });
                    },
                    editCancel: function () {
                        me.helper.on(me.newTask, 'keyup', function (event) {
                            if (event.keyCode === 27) {
                                handler(me.newTask.dataset.id);
                            }
                        });
                    },
                    remove: function () {
                        me.helper.delegate(me.listTasks , '.t-remove-id', 'click', function () {
                            var tr = me.helper.parent(this, 'tr');
                            handler(parseInt(tr.dataset.id.replace('item-', ''), 10));
                        });
                    },
                    removeAll: function () {
                        me.helper.on(me.removeAllTasks, 'click', function () {
                            me.newTask.focus();
                            handler();
                        });
                    }
                };
                listEvents[event]();
            };

            View.prototype.render = function (render, record) {
                var me = this, listEvents;
                listEvents = {
                    newTask: function (r) {
                        me.listTasks.insertBefore(me.template.renderRecord(r), null);
                        me.newTask.focus();
                    },
                    allTasks: function (r) {
                        me.listTasks.innerHTML = me.template.show(r);
                    },
                    edit: function (r) {
                        var element;
                        me.newTask.value = r.title;
                        me.newTask.dataset.id = r.id;
                        me.submit.innerHTML = 'Save';
                        element = me.helper.qs('[data-id="item-' + r.id + '"]');
                        element.className = 'pure-table-odd';
                    },
                    editCancel: function (r) {
                        var element;
                        me.newTask.value = '';
                        if (r.id === undefined) {
                            return false;
                        }
                        me.newTask.removeAttribute('data-id');
                        me.submit.innerHTML = 'Create';
                        element = me.helper.qs('tr[data-id="item-' + r.id + '"]');
                        element.className = '';
                    },
                    editSave: function (r) {
                        var tr = me.template.renderRecord(r),
                            element = me.helper.qs('[data-id="item-' + r.id + '"]');
                        me.listTasks.replaceChild(tr, element);
                        me.newTask.removeAttribute('data-id');
                        me.submit.innerHTML = 'Create';
                    },
                    remove: function (r) {
                        var element = me.helper.qs('[data-id="item-' + r.id + '"]');
                        me.listTasks.removeChild(element);
                    },
                    removeAll: function () {
                        me.listTasks.innerHTML = ''
                    }
                };
                me.newTask.focus();
                listEvents[render](record);
            };

            return View;
        })();
    }
);
