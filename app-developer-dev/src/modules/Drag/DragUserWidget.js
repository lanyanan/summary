'use strict';
/**
 * 处理用户控件拖放事件
 * @author   vilien
 * @datetime 2015-12-15
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragUserWidgetClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../../core/Base.class');

var _pubsub = require('../../core/pubsub');

var _Actions = require('../../apps/playground/Actions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 发布/订阅模式库


var DragUserWidgetClass = exports.DragUserWidgetClass = function (_BaseClass) {
    _inherits(DragUserWidgetClass, _BaseClass);

    function DragUserWidgetClass() {
        _classCallCheck(this, DragUserWidgetClass);

        var _this = _possibleConstructorReturn(this, (DragUserWidgetClass.__proto__ || Object.getPrototypeOf(DragUserWidgetClass)).call(this));

        _this.oldMoveX = 0;
        _this.oldMoveY = 0;
        _this.ghostDom = null;
        return _this;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */


    _createClass(DragUserWidgetClass, [{
        key: 'getMoveDom',
        value: function getMoveDom(dom) {
            var tmp = document.createElement('div');
            this.ghostDom = dom;
            return tmp;
            // return dom;
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
            this.oldMoveX = 0;
            this.oldMoveY = 0;
            (0, _pubsub.publish)('start_drag_user_widget', 1, x, y); // 发布消息：开始拖放
            _Actions.Actions.showPanel('rightPanel');
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
            var dragStatusJson = this.ghostDom.getAttribute('data-dragstatus'),
                dragStatus = dragStatusJson ? JSON.parse(dragStatusJson) : null;
            var offsetX = void 0,
                offsetY = void 0;

            if (dragStatus.left) {
                offsetX = x - this.oldMoveX;
                this.oldMoveX = x;
            }

            if (dragStatus.top) {
                offsetY = y - this.oldMoveY;
                this.oldMoveY = y;
            }

            if (dragStatus.left) {
                this.ghostDom.style.left = parseInt(this.ghostDom.style.left) + offsetX + 'px';
            }

            if (dragStatus.top) {
                this.ghostDom.style.top = parseInt(this.ghostDom.style.top) + offsetY + 'px';
            }

            (0, _pubsub.publish)('move_drag_user_widget', 1, offsetX, offsetY); // 发布消息：拖放中
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
            var dragStatusJson = this.ghostDom.getAttribute('data-dragstatus');
            var dragStatus = dragStatusJson ? JSON.parse(dragStatusJson) : null;

            if (!dragStatus.left) {
                x = 0;
            }

            if (!dragStatus.top) {
                y = 0;
            }

            _Actions.Actions.moveUserWidget(x, y);
            _Actions.Actions.showPanel('rightPanel');
            _Actions.Actions.historyPush();
            (0, _pubsub.publish)('end_drag_user_widget', 1, x, y); // 发布消息：拖放结束
        }
    }]);

    return DragUserWidgetClass;
}(_Base.BaseClass);