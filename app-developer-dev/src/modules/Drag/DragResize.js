'use strict';
/**
 * 处理调整大小拖放事件
 * @author   
 * @datetime 
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragResizeClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../../core/Base.class');

var _pubsub = require('../../core/pubsub');

var _Actions = require('../../apps/playground/Actions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 发布/订阅模式库


// 产生私有成员key
var _getOffset_ = Symbol('_getOffset_'); // 获取偏移矩阵
var _timer_ = Symbol('_timer_'); // 计时器
var _offsetCache_ = Symbol('_offsetCache_'); // 偏移缓冲器

var DragResizeClass = exports.DragResizeClass = function (_BaseClass) {
    _inherits(DragResizeClass, _BaseClass);

    function DragResizeClass() {
        _classCallCheck(this, DragResizeClass);

        var _this = _possibleConstructorReturn(this, (DragResizeClass.__proto__ || Object.getPrototypeOf(DragResizeClass)).call(this));

        _this.oldMoveX = 0;
        _this.oldMoveY = 0;
        _this[_timer_] = 0;
        _this.ghostDom = null;
        _this.ghostLv = null;
        _this.ghostTh = null;
        _this.ghostRv = null;
        _this.ghostBh = null;
        return _this;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */


    _createClass(DragResizeClass, [{
        key: 'getMoveDom',
        value: function getMoveDom(dom) {
            this.dir = dom.className.match(/tl|tc|tr|ml|mr|bl|bc|br/)[0];
            var tmp = document.createElement('div');
            this.ghostDom = dom.parentNode.className == 'ghost' && dom.parentNode;
            this.ghostLv = this.ghostDom.querySelector('.lv');
            this.ghostTh = this.ghostDom.querySelector('.th');
            this.ghostRv = this.ghostDom.querySelector('.rv');
            this.ghostBh = this.ghostDom.querySelector('.bh');
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
            this.oldMoveX = 0;
            this.oldMoveY = 0;
            (0, _pubsub.publish)('start_drag_user_widget', 0, 0, 0); // 发布消息：开始拖放
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
        value: function onMove(dom, offsetX, offsetY) {
            var dragable = this.ghostDom.getAttribute('data-dragable');
            if (dragable == 'false' || dragable == false) return;

            var dragStatusJson = this.ghostDom.getAttribute('data-dragstatus'),
                dragStatus = dragStatusJson ? JSON.parse(dragStatusJson) : null;

            var x = offsetX - this.oldMoveX,
                y = offsetY - this.oldMoveY;

            var o = this[_getOffset_](x, y);

            this.oldMoveX = offsetX;
            this.oldMoveY = offsetY;

            var preX = parseInt(this.ghostDom.style.left);
            var preY = parseInt(this.ghostDom.style.top);
            var preW = parseInt(this.ghostDom.style.width);
            var preH = parseInt(this.ghostDom.style.height);

            // this.ghostLv = this.ghostDom.querySelector('.lv');
            // this.ghostTh = this.ghostDom.querySelector('.th');
            // this.ghostRv = this.ghostDom.querySelector('.rv');
            // this.ghostBh = this.ghostDom.querySelector('.bh');

            if (preW + o.offsetWidth > 1) {
                if (dragStatus.changeWidth) {
                    this.ghostDom.style.width = this.ghostTh.style.width = this.ghostBh.style.width = preW + o.offsetWidth + 'px';
                    this.ghostDom.style.left = preX + o.offsetLeft + 'px';
                } else {
                    o.offsetLeft = 0;
                    o.offsetWidth = 0;
                }
            }
            if (preH + o.offsetHeight > 1) {
                if (dragStatus.changeHeight) {
                    this.ghostDom.style.height = this.ghostLv.style.height = this.ghostRv.style.height = preH + o.offsetHeight + 'px';
                    this.ghostDom.style.top = preY + o.offsetTop + 'px';
                } else {
                    o.offsetTop = 0;
                    o.offsetHeight = 0;
                }
            }

            (0, _pubsub.publish)('resize_drag_user_widget', 0, o.offsetLeft, o.offsetTop, o.offsetWidth, o.offsetHeight); // 发布消息：开始放缩
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
            var dragable = this.ghostDom.getAttribute('data-dragable');
            if (dragable == 'false' || dragable == false) return;
            var dragStatusJson = this.ghostDom.getAttribute('data-dragstatus'),
                dragStatus = dragStatusJson ? JSON.parse(dragStatusJson) : null;

            var o = this[_getOffset_](x, y);

            if (!dragStatus.changeWidth) {
                o.offsetLeft = 0;
                o.offsetWidth = 0;
            }

            if (!dragStatus.changeHeight) {
                o.offsetTop = 0;
                o.offsetHeight = 0;
            }

            console.log(o);
            _Actions.Actions.resizeUserWidget(o.offsetTop, o.offsetLeft, o.offsetWidth, o.offsetHeight);
            _Actions.Actions.showPanel('rightPanel');
            _Actions.Actions.historyPush();
            (0, _pubsub.publish)('end_drag_user_widget', 0, 0, 0); // 发布消息：拖放结束
        }
    }, {
        key: 'sendOffset',
        value: function sendOffset() {
            var _this2 = this;

            var o = this[_offsetCache_];
            _Actions.Actions.resizeUserWidget(o.offsetTop, o.offsetLeft, o.offsetWidth, o.offsetHeight);
            this[_offsetCache_] = { offsetTop: 0, offsetLeft: 0, offsetWidth: 0, offsetHeight: 0 };
            this[_timer_] = setTimeout(function () {
                return _this2.sendOffset();
            }, 0);
        }

        /**
         * 获取偏移矩阵
         * @param {integer} x 偏移x
         * @param {integer} y 偏移y
         */

    }, {
        key: _getOffset_,
        value: function value(x, y) {
            var offsetTop = 0,
                offsetLeft = 0,
                offsetWidth = 0,
                offsetHeight = 0;
            switch (this.dir) {
                case 'tl':
                    // 左上
                    offsetTop = y;
                    offsetLeft = x;
                    offsetWidth = -offsetLeft;
                    offsetHeight = -offsetTop;
                    break;
                case 'tc':
                    // 上
                    offsetTop = y;
                    offsetHeight = -offsetTop;
                    break;
                case 'tr':
                    // 右上
                    offsetTop = y;
                    offsetWidth = x;
                    offsetHeight = -offsetTop;
                    break;
                case 'ml':
                    // 左
                    offsetLeft = x;
                    offsetWidth = -offsetLeft;
                    break;
                case 'mr':
                    // 右
                    offsetWidth = x;
                    break;
                case 'bl':
                    // 左下
                    offsetLeft = x;
                    offsetWidth = -offsetLeft;
                    offsetHeight = y;
                    break;
                case 'bc':
                    // 下
                    offsetHeight = y;
                    break;
                case 'br':
                    // 右下
                    offsetWidth = x;
                    offsetHeight = y;
                    break;
            }
            return { offsetTop: offsetTop, offsetLeft: offsetLeft, offsetWidth: offsetWidth, offsetHeight: offsetHeight };
        }
    }]);

    return DragResizeClass;
}(_Base.BaseClass);