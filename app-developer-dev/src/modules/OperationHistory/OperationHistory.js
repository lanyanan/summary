'use strict';
/**
 * 操作历史处理类
 * @author   vilien
 * @datetime 2016-01-06
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OH = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../../core/Base.class');

var _db = require('../../core/db.class');

var _app = require('../../config/app.config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OperationHistoryClass = function (_BaseClass) {
    _inherits(OperationHistoryClass, _BaseClass);

    function OperationHistoryClass() {
        _classCallCheck(this, OperationHistoryClass);

        var _this = _possibleConstructorReturn(this, (OperationHistoryClass.__proto__ || Object.getPrototypeOf(OperationHistoryClass)).call(this));

        _this.storeName = 'history';
        _this.pre = 'h-';
        _this.db = new _db.DBClass([_this.storeName]);
        _this.db.open('SHS-HISTORY');
        _this.db.clear(_this.storeName);
        _this.maxLength = _app.APP_CONFIG.operationHistoryLength || 20; // 最多存储20步
        _this.length = 0;
        _this.cursor = -1; // 当前游标（索引值）
        _this.topId = 0; // 顶部ID
        _this.latestId = -1; // 最新ID
        return _this;
    }

    /**
     * 添加一条新记录
     * @param    {json}   data 只能保存json格式的对象，如不满足，可先用JSON.parse(JSON.stringify(DATA))强制转换
     * @return   {[type]}      不返回任何值
     */


    _createClass(OperationHistoryClass, [{
        key: 'push',
        value: function push(data) {
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') return;
            this.latestId++;
            this.length = this.latestId - this.topId + 1;
            if (this.length > this.maxLength) {
                this.db.del(this.storeName, this.topId);
                this.length = this.maxLength;
                this.topId++;
                this.cursor = this.length - 1;
            } else {
                this.cursor++;
            }
            // this.db.del(this.storeName, this.latestId); // 保证该空间可用
            this.db.set(this.storeName, this.getId(), JSON.parse(JSON.stringify(data)));
        }

        /**
         * 返回指定索引的历史记录
         * @param    {integer}   index 记录索引值
         * @return   {promise}         返回一个promise对象
         */

    }, {
        key: 'go',
        value: function go(index) {
            this.cursor = index >= this.length - 1 ? this.length - 1 : index < 0 ? 0 : index;
            this.latestId = this.topId + this.cursor;
            return this.db.get(this.storeName, this.getId());
        }

        /**
         * 回退一条记录
         * @return   {promise}   返回一个promise对象
         */

    }, {
        key: 'back',
        value: function back() {
            this.cursor--;
            return this.go(this.cursor);
        }

        /**
         * 往前一条记录
         * @return   {promise}   返回一个promise对象
         */

    }, {
        key: 'forward',
        value: function forward() {
            this.cursor++;
            return this.go(this.cursor);
        }

        /**
         * 获取记录ID号
         * @return   {string}   ID字符串
         */

    }, {
        key: 'getId',
        value: function getId() {
            return this.pre + this.latestId;
        }
    }]);

    return OperationHistoryClass;
}(_Base.BaseClass);

var OH = exports.OH = new OperationHistoryClass();