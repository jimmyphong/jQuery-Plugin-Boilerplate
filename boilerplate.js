(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([
            'jquery'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(
            require('jquery')
        );
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    "use strict";

    var MyPluginNameObject = function (element, options) {
        this.$select = $(element);
        this.options = $.extend(true, {}, $.fn.myPluginName.defaults, options);
        this._init();
    };  

    MyPluginNameObject.prototype = {

        /**
         * Start our app
         * @private
         */
        _init: function() {
            // code
        }

        publicMethodName: function() {
            // code
        },

        /**
         * Sets multiple options on the plugin
         * @private
         * @return  {object} current instance of the plugin
         */
        _setOptions: function (options) {
            var self = this;
            $.each(options, function (key, value) {
                self._setOption(key, value);
            });

            return this;
        },

        /**
         * Sets an option on the plugin
         * @private
         * @return  {object} current instance of the plugin
         */
        _setOption: function (key, value) {
            this.options[key] = value;
            
            return this;
        },

        /**
         * Gets the plugin instance
         * @public
         * @return  {object} current instance of the plugin
         */
        widget: function () {
            return this;
        },

        /**
         * Gets/Sets an option for the plugin
         * @public
         * @return  {*} Either the value of the option or the current instance of the plugin
         */
        option: function(key, value) {
            var options = key;
            if (arguments.length === 0) {
                return $.extend( {}, this.options );
            }

            if (typeof key === "string") {
                if (value === undefined) {
                    return this.options[key];
                }
                options = {};
                options[key] = value;
            }
            this._setOptions(options);

            return this;
        }
    };

    $.fn.myPluginName = function (option) {
        var isMethodCall = typeof option === "string",
            args = Array.prototype.slice.call(arguments, 1),
            returnValue = this;

        // prevent calls to internal methods
        if (isMethodCall && option.charAt(0) === "_") {
            return returnValue;
        }

        // call internal method
        if (isMethodCall) {
            this.each(function() {
                var instance = $(this).data('myPluginName'),
                    methodValue = instance && $.isFunction(instance[option]) ? instance[ option ].apply(instance, args) : instance;
                if (instance && methodValue && methodValue !== undefined) {
                    returnValue = methodValue;
                    return false;
                }
                return false;
            });
        }

        // instantiate plugin
        else {
            this.each(function () {
                var $this = $(this),
                    data = $this.data('myPluginName'),
                    options = typeof option === 'object' && option;
                if (!data) {
                    $this.data('myPluginName', (data = new MyPluginNameObject(this, options)));
                }
            });
        }

        return returnValue;
    };

    $.fn.myPluginName.defaults = {
        // option: value
    };

    $.fn.myPluginName.Constructor = MyPluginNameObject;

}));