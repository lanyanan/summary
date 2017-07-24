'use strict';

/**
 * 基类
 * @author   vilien
 * @datetime 2015-11-16
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseClass = exports.BaseClass = function () {
    function BaseClass() {
        // if (new.target === BaseClass) {
        //     throw new Error('This class cannot be instantiated!');
        // }

        _classCallCheck(this, BaseClass);
    }

    _createClass(BaseClass, [{
        key: 'toString',
        value: function toString() {
            return '[Class ' + this.getClassName() + ']';
        }

        /**
         * 获取类名
         * @return   {string}   返回类名
         */

    }, {
        key: 'getClassName',
        value: function getClassName() {
            return this.constructor.name;
        }
    }]);

    return BaseClass;
}();