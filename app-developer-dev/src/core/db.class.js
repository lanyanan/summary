'use strict';

/**
 * 数据库类
 * 使用indexedDB来提供存储大型数据的能力
 * @author   vilien
 * @datetime 2015-11-20
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DBClass = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./Base.class');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 常量
var DEF_DATABASE_NAME = 'V_DEF_STORE'; // 缺省数据库名称

// 私有成员key
var _stores_ = Symbol('_stores_'); // 仓储列表
var _db_ = Symbol('_db_'); // 仓库对象
var _openStatus_ = Symbol('_openStatus_'); // 仓库打开状态
var _openStore_ = Symbol('_openStore_'); // 打开表

var DBClass = exports.DBClass = function (_BaseClass) {
    _inherits(DBClass, _BaseClass);

    /**
     * 构造方法
     * @param    {array}   stores 仓储列表
     */
    function DBClass(stores) {
        _classCallCheck(this, DBClass);

        var _this = _possibleConstructorReturn(this, (DBClass.__proto__ || Object.getPrototypeOf(DBClass)).call(this));

        try {
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        } catch (err) {}
        if (typeof window.indexedDB === 'undefined') {
            throw new Error('天！你还在用这么古董的浏览器！建议你换chrome以获得更好的操作体验！');
        }
        if (!Array.isArray(stores)) {
            throw new Error('仓储列表必须为数组类型！');
        }
        _this[_stores_] = stores;
        _this[_db_] = null;
        _this[_openStatus_] = 0; // 0：未打开，1：正在打开，2：打开完成，3：打开失败
        return _this;
    }

    /**
     * 打开数据库
     * @param    {string}   dbName    数据库名称
     * @param    {Number}   dbVersion 数据库版本号
     */


    _createClass(DBClass, [{
        key: 'open',
        value: function open() {
            var _this2 = this;

            var dbName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEF_DATABASE_NAME;
            var dbVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

            var request = window.indexedDB.open(dbName, dbVersion);
            this[_openStatus_] = 1;
            // 首次访问本站点（之前从未访问过）时将会触发该事件
            request.onupgradeneeded = function (event) {
                _this2[_db_] = event.target.result;
                _this2[_openStatus_] = 2;
                _this2[_stores_].map(function (tbName) {
                    return _this2[_db_].createObjectStore(tbName, { keyPath: 'rollNo' });
                });
            };
            request.onsuccess = function (event) {
                _this2[_db_] = event.target.result;
                _this2[_openStatus_] = 2;
            };
            request.onerror = function (event) {
                _this2[_openStatus_] = 3;
                console.log('Open ' + dbName + ' fail', event);
            };
        }

        /**
         * 获取一条记录
         * @param    {string}   storeName 表名称
         * @param    {string}   id        记录ID
         * @return   {object}             返回Promise对象，回馈值为json记录
         */

    }, {
        key: 'get',
        value: function get(storeName, id) {
            var getStore = this[_openStore_](storeName, 'rw');
            return new Promise(function (resolve, reject) {
                getStore.then(function (store) {
                    var request = store.get(id);
                    request.onsuccess = function (event) {
                        var result = request.result;
                        if (result && result.rollNo) {
                            delete result.rollNo;
                        }
                        resolve(result);
                    };
                });
            });
        }

        /**
         * 插入/修改一条记录
         * @param    {string}   storeName 表名称
         * @param    {string}   id        记录ID
         * @param    {json}     data      将插入的记录，必须为JSON格式
         * @return   {object}             返回Promise对象，回馈值为插入记录数量
         */

    }, {
        key: 'set',
        value: function set(storeName, id, data) {
            var getStore = this[_openStore_](storeName, 'rw');
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
                console.log('%c只能存储json格式的记录', 'color:red');
                return false;
            }
            return new Promise(function (resolve, reject) {
                getStore.then(function (store) {
                    var request = store.get(id);
                    request.onsuccess = function (event) {
                        var result = request.result;
                        var rs = result ? Object.assign(result, data) : Object.assign({ rollNo: id }, data);
                        // store.add(Object.assign({rollNo: id}, data));
                        store.put(rs);
                        resolve(1);
                    };
                });
            });
        }

        /**
         * 删除一条记录
         * @param    {string}   storeName 表名称
         * @param    {string}   id        记录ID
         * @return   {object}             返回Promise对象，回馈值为删除记录数量
         */

    }, {
        key: 'del',
        value: function del(storeName, id) {
            var getStore = this[_openStore_](storeName, 'rw');
            return getStore.then(function (store) {
                store.delete(id);
                return 1;
            });
        }

        /**
         * 清空指定仓储
         * @param    {string}   storeName 表名称
         * @return   {object}             返回Promise对象，回馈值为删除记录数量
         */

    }, {
        key: 'clear',
        value: function clear(storeName) {
            var getStore = this[_openStore_](storeName, 'rw');
            return getStore.then(function (store) {
                store.clear();
                return true;
            });
        }

        /**
         * 关闭数据库
         */

    }, {
        key: 'close',
        value: function close() {
            return this[_db_].close();
        }

        /**
         * 打开表，私有方法
         * @param    {string}   storeName 表名称
         * @param    {string}   id        读写模式（只读：r ，读写：rw）
         * @return   {object}             返回一个可供操作的IDBObjectStore
         */

    }, {
        key: _openStore_,
        value: function value(storeName) {
            var rw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'r';

            if (this[_openStatus_] === 0) {
                throw new Error('请先调用open方法打开数据库！');
            }
            if (this[_stores_].indexOf(storeName) < 0) {
                throw new Error(storeName + '\u4E0D\u5B58\u5728\uFF01');
            }
            var mode = rw === 'rw' ? 'readwrite' : 'readonly';
            var $this = this;
            return new Promise(function (resolve, reject) {
                if ($this[_db_] === null && $this[_openStatus_] !== 3) {
                    setTimeout(function () {
                        resolve($this[_db_]);
                    }, 200);
                } else {
                    resolve($this[_db_]);
                }
            }).then(function (db) {
                if (db === null) {
                    return Promise.reject('打开数据库失败，请重试');
                } else {
                    var trans = db.transaction(storeName, mode);
                    // trans.oncomplete = (event)=>console.log('The transaction is successful', event);
                    trans.onerror = function (event) {
                        return console.log('The transaction failed', event);
                    };
                    return trans.objectStore(storeName);
                }
            });
        }
    }]);

    return DBClass;
}(_Base.BaseClass);