define('helpers', [],  function () {
        return (function (window) {

            /**
             * Constructor for helpers
             *
             * @constructor
             */
            function Helpers() {

            }

            Helpers.prototype.qs = function (selector) {
                return window.document.querySelector(selector);
            };

            Helpers.prototype.qsa = function (selector) {
                return window.document.querySelectorAll(selector);
            };

            Helpers.prototype.on = function (target, type, callback, useCapture) {
                target.addEventListener(type, callback, !!useCapture);
            };

            Helpers.prototype.delegate = function (target, selector, type, handler) {
                var me = this;
                var useCapture = type === 'blur' || type === 'focus';
                this.on(target, type, function (event) {
                    if (Array.prototype.indexOf.call(me.qsa(selector, target), event.target) >= 0) {
                        handler.call(event.target, event);
                    }
                }, useCapture);
            };

            Helpers.prototype.parent = function (element, tagName) {
                var parent = element.parentElement;
                if (parent.nodeName.toLowerCase() === tagName) {
                    return parent;
                }

                return this.parent(parent, tagName);
            };

            return Helpers;
        })(window);
    }
);
