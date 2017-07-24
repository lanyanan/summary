'use strict';
/**
 * 处理控件拖放事件
 * @author   vilien
 * @datetime 2015-12-10
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragWidgetClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../../core/Base.class');

var _pubsub = require('../../core/pubsub');

var _Widgets = require('../WidgetsPanel/Widgets.class');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 发布/订阅模式库


// 控件库

var DragWidgetClass = exports.DragWidgetClass = function (_BaseClass) {
    _inherits(DragWidgetClass, _BaseClass);

    function DragWidgetClass() {
        _classCallCheck(this, DragWidgetClass);

        var _this = _possibleConstructorReturn(this, (DragWidgetClass.__proto__ || Object.getPrototypeOf(DragWidgetClass)).call(this));

        _this.widget = null; // 组件对象
        _this.moveDom = document.createElement('div'); // 虚拟组件，用于拖放时占位
        _this.moveDom.className = 'virtual-widget';
        return _this;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */


    _createClass(DragWidgetClass, [{
        key: 'getMoveDom',
        value: function getMoveDom(dom) {
            var wId = dom.getAttribute('data-wid');
            this.widget = _Widgets.Widgets.getWidgetById(wId);
            // this.moveDom.style.width = this.widget.width + 'px';
            // this.moveDom.style.height = this.widget.height + 'px';
            this.moveDom.style.width = 65 + 'px';
            this.moveDom.style.height = 65 + 'px';
            return this.moveDom;
        }

        /**
         * 开始拖放时将触发该方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   起始横坐标
         * @param    {integer}    y   起始纵坐标
         */

    }, {
        key: 'onStart',
        value: function onStart(dom, x, y) {
            document.body.appendChild(this.moveDom);
            // this.moveDom.style.top = (y - this.widget.height / 2) + 'px';
            // this.moveDom.style.left = (x - this.widget.width / 2) + 'px';
            this.moveDom.style.top = Number(y) - 32.5 + 'px';
            this.moveDom.style.left = Number(x) - 32.5 + 'px';
            this.moveDom.style.display = 'block';
            (0, _pubsub.publish)('start_drag_widget', this.widget.id, x, y); // 发布消息：开始拖放
        }

        /**
         * 正在拖放时将触发该方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   横坐标偏移量
         * @param    {integer}    y   纵坐标偏移量
         */

    }, {
        key: 'onMove',
        value: function onMove(dom, x, y) {}

        /**
         * 结束拖放时将触发该方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   横坐标偏移量
         * @param    {integer}    y   纵坐标偏移量
         */

    }, {
        key: 'onEnd',
        value: function onEnd(dom, x, y) {
            this.moveDom.style.display = 'none';
            this.moveDom.style.transform = 'translate(0, 0)'; // 重置位移
            (0, _pubsub.publish)('end_drag_widget', this.widget.id, x, y); // 发布消息：拖放结束
        }
    }]);

    return DragWidgetClass;
}(_Base.BaseClass);