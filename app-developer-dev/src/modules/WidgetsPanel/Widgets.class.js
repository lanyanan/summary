'use strict';

/**
 * 组件库
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Widgets = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../../core/Base.class');

var _list = require('../../widgets/list');

var widgetList = _interopRequireWildcard(_list);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 组件列表

var WidgetsClass = function (_BaseClass) {
    _inherits(WidgetsClass, _BaseClass);

    function WidgetsClass() {
        _classCallCheck(this, WidgetsClass);

        return _possibleConstructorReturn(this, (WidgetsClass.__proto__ || Object.getPrototypeOf(WidgetsClass)).call(this));
    }

    _createClass(WidgetsClass, [{
        key: 'valueOf',
        value: function valueOf() {
            return widgetList;
        }

        /**
         * 生成用户插件ID
         * @param    {object}   widget 插件对象
         * @return   {integer}         生成插件ID
         */

    }, {
        key: 'newUserWidgetID',
        value: function newUserWidgetID(widget) {
            var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var d = +new Date();
            var id = widget && widget.id ? widget.id * 1e4 : 1e7;
            return id + +d.toString().slice(4, 11) + i;
        }

        /**
         * 产生数组形式的组件列表，以供React渲染
         * @return   {array}   产生数组形式的组件列表
         */

    }, {
        key: 'getArrayWidgets',
        value: function getArrayWidgets() {
            var arr = [];

            var _loop = function _loop(k) {
                var URL = widgetList[k].cssFile;
                fetch(URL).then(function (res) {
                    if (res.ok) {
                        res.text().then(function (data) {
                            widgetList[k].cssCode = data;
                        });
                    } else {
                        console.log("Looks like the response wasn't perfect, got status", res.status);
                    }
                }, function (e) {
                    console.log("Fetch failed!", e);
                });
                arr.push(widgetList[k]);
            };

            for (var k in widgetList) {
                _loop(k);
            }
            return arr;
        }

        /**
         * 通过ID获取widget
         * @param    {integer}   id 组件ID号
         * @return   {object}       返回组件对象
         */

    }, {
        key: 'getWidgetById',
        value: function getWidgetById(id) {
            for (var k in widgetList) {
                if (widgetList[k].id == id) {
                    return widgetList[k];
                }
            }
            return {};
        }

        /**
         * 序列化用户控件，以便向服务器提交
         * 注：只处理需要序列化成字符串存储的节点，可直接保存的节点将过滤
         *     目的在于：节省资源的同时，增加控件的健壮性
         * @param    {object}   widget 用户控件对象
         * @return   {string}          可用于表单提交的字符串
         */

    }, {
        key: 'stringifyUserWidget',
        value: function stringifyUserWidget(widget) {
            var props = Object.assign({ htmlCode: '', jsCode: '', cssCode: '' }, widget);
            delete props.widgetId;
            delete props.caption;
            delete props.htmlCode;
            delete props.cssCode;
            delete props.jsCode;
            delete props.unsaved;
            return JSON.stringify(props);
        }

        /**
         * 解析从服务器拉取的用户控件
         * @param    {object}   widget 用户控件对象
         * @return   {object}          可用于场景的用户控件对象
         */

    }, {
        key: 'parseUserWidget',
        value: function parseUserWidget(widget) {
            return Object.assign({
                widgetId: widget.widgetId,
                caption: widget.widgetName,
                jsCode: widget.js,
                cssCode: widget.css,
                htmlCode: widget.html
            }, JSON.parse(widget.widgetProperties));
        }

        /**
         * 通过name获取widget
         * @param    {integer}   id 组件ID号
         * @return   {object}       返回组件对象
         */

    }, {
        key: 'getWidgetByName',
        value: function getWidgetByName(name) {
            return widgetList[name];
        }
    }]);

    return WidgetsClass;
}(_Base.BaseClass);

var Widgets = exports.Widgets = new WidgetsClass();