define('todo/template', [],  function () {
        return (function () {
            /**
             * Constructor for template
             *
             * @property {string} templateItem
             *
             * @constructor
             */
            function Template() {
                this.templateItem = '<tr data-id="item-{id}">\n    <td class="t-list__td">\n        {title}\n        <i class="t-edit-id t-list__ico t-list__ico_edit fa fa-pencil-square-o"></i>\n        <i class="t-remove-id t-list__ico t-list__ico_remove fa fa-trash-o"></i>\n    </td>\n</tr>';
            }

            /**
             *
             * @param {[]}  data
             *
             * @returns {string}
             */
            Template.prototype.show = function (data) {
                var i, view = '';
                for (i = 0; i < data.length; i++) {
                    view += this.absorb(this.templateItem, {
                        id: data[i].id,
                        title: data[i].title
                    });
                }

                return view;
            };
            /**
             *
             * @param {object}  record
             *
             * @returns {Element}
             */
            Template.prototype.renderRecord = function (record) {
                var tr = document.createElement('tr'),
                    td = document.createElement('td');
                tr.dataset.id = 'item-' + record.id;
                td.className = 't-list__td';
                td.innerHTML = record.title + '<i class="t-edit-id t-list__ico t-list__ico_edit fa fa-pencil-square-o"></i><i class="t-remove-id t-list__ico t-list__ico_remove fa fa-trash-o"></i>';
                tr.insertBefore(td, null);

                console.log(record)

                return tr;
            };

            /**
             *
             * @param {string}  template
             * @param {object}  data
             *
             * @returns {string}
             */
            Template.prototype.absorb = function (template, data) {
                var h = typeof data === 'object',
                    parts = h ? data : arguments;
                return template.replace(/\{(\w+)\}/g, function (s, key) {
                    return parts[h ? key : Number(key)];
                });
            };

            return Template;
        })();
    }
);
