'use strict';
/**
 * 处理画布大小调节拖放事件
 * @author   Vilien
 * @datetime 2015-12-25
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragCanvasClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../../core/Base.class');

var _pubsub = require('../../core/pubsub');

var _Actions = require('../../apps/playground/Actions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 发布/订阅模式库


var DragCanvasClass = exports.DragCanvasClass = function (_BaseClass) {
    _inherits(DragCanvasClass, _BaseClass);

    function DragCanvasClass() {
        _classCallCheck(this, DragCanvasClass);

        var _this = _possibleConstructorReturn(this, (DragCanvasClass.__proto__ || Object.getPrototypeOf(DragCanvasClass)).call(this));

        _this.oldMoveY = 0;
        _this.scrollDOM = null;
        return _this;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */


    _createClass(DragCanvasClass, [{
        key: 'getMoveDom',
        value: function getMoveDom(dom) {
            var tmp = document.createElement('div');
            this.scrollDOM = document.querySelector('.scene-screen');
            return tmp;
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
            this.oldMoveY = 0;
            (0, _pubsub.publish)('start_drag_user_widget', 0, 0, 0); // 发布消息：开始拖放
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
        value: function onMove(dom, x, y) {
            var offsetY = y - this.oldMoveY;
            this.scrollDOM.scrollTop += offsetY;
            this.oldMoveY = y;
            (0, _pubsub.publish)('canvas_drag_user_widget', 0, offsetY); // 发布消息：拖放结束
        }

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
            _Actions.Actions.resizeCanvas(y);
            (0, _pubsub.publish)('end_drag_user_widget', 0, 0, 0); // 发布消息：拖放结束
        }
    }]);

    return DragCanvasClass;
}(_Base.BaseClass);