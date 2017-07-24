'use strict';
/**
 * 处理调整旋转事件
 * @author   Yanan
 * @datetime 2017-02-09
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragRotateClass = undefined;

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

var DragRotateClass = exports.DragRotateClass = function (_BaseClass) {
    _inherits(DragRotateClass, _BaseClass);

    function DragRotateClass() {
        _classCallCheck(this, DragRotateClass);

        var _this = _possibleConstructorReturn(this, (DragRotateClass.__proto__ || Object.getPrototypeOf(DragRotateClass)).call(this));

        _this.oldMoveX = 0;
        _this.oldMoveY = 0;
        _this[_timer_] = 0;
        _this.ghostDom = null;
        _this.rotate = 0;
        _this.rotateX = 0;
        _this.rotateY = 0;
        _this.dom = {};
        _this.rotateWidth = 0;
        _this.rotateHeight = 0;
        _this.DomWidth = 0;
        _this.DomHeight = 0;
        return _this;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */


    _createClass(DragRotateClass, [{
        key: 'getMoveDom',
        value: function getMoveDom(dom) {
            this.dom = dom;
            this.dir = dom.className.match(/ro/);
            var tmp = document.createElement('div');
            this.ghostDom = dom.parentNode.className == 'ghost' && dom.parentNode;
            return tmp;
        }

        /**
         * 
         * 开始拖放时将触发该方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   起始横坐标
         * @param    {integer}    y   起始纵坐标
         */

    }, {
        key: 'onStart',
        value: function onStart(dom, x, y) {
            this.DomWidth = parseInt(this.dom.parentNode.style.width);
            this.DomHeight = parseInt(this.dom.parentNode.style.height);
            if (this.rotate == 0) {
                this.rotateY = this.dom.parentNode.parentNode.offsetTop + 58 + parseInt(this.dom.parentNode.style.top) + parseInt(this.dom.parentNode.style.height) / 2;
                this.rotateX = this.dom.parentNode.parentNode.offsetLeft + 10 + parseInt(this.dom.parentNode.style.left) + parseInt(this.dom.parentNode.style.width) / 2;
            } else {}
            /* this.oldMoveX = 0;
             this.oldMoveY = 0;
              console.log(this.obj.node.parentNode.parentNode.offsetTop + 58 + parseInt(this.obj.node.parentNode.style.top))
                         console.log(this.obj.node.parentNode.parentNode.offsetLeft + 10 + parseInt(this.obj.node.parentNode.style.left))
             publish('start_rotate_user_widget', 0, 0); // 发布消息：开始拖放
             Actions.showPanel('rightPanel');*/
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
            this.getRotate(x, y);
            this.getRotateWidth();
            this.getRotateHeight();
            // this.ghostDom.style["WebkitTransform"] = "rotate(" + this.rotate + "deg)";  
            (0, _pubsub.publish)('resize_rotate_user_widget', 0, this.rotate, this.rotateWidth, this.rotateHeight); // 发布消息：开始旋转
            _Actions.Actions.rotateUserWidget(this.rotate, this.rotateWidth, this.rotateHeight);
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
            this.getRotate(x, y);
            this.getRotateWidth();
            this.getRotateHeight();
            _Actions.Actions.rotateUserWidget(this.rotate, this.rotateWidth, this.rotateHeight);
            _Actions.Actions.showPanel('rightPanel');
            _Actions.Actions.historyPush();
            (0, _pubsub.publish)('end_rotate_user_widget', 0, 0, 0); // 发布消息：拖放结束*/
        }

        /**
         * 获取旋转角度的方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   横坐标偏移量
         * @param    {integer}    y   纵坐标偏移量
         */

    }, {
        key: 'getRotate',
        value: function getRotate(x, y) {
            var Dx = x - this.rotateX;
            var Dy = y - this.rotateY;
            if (x >= this.rotateX && y < this.rotateY) {
                this.rotate = Math.atan(-Dx / Dy) * 180 / Math.PI;
            } else if (x >= this.rotateX && y > this.rotateY) {
                this.rotate = 90 + Math.atan(Dy / Dx) * 180 / Math.PI;
            } else if (x < this.rotateX && y > this.rotateY) {
                this.rotate = 180 + Math.atan(-Dx / Dy) * 180 / Math.PI;
            } else if (x <= this.rotateX && y < this.rotateY) {
                this.rotate = 270 + Math.atan(Dy / Dx) * 180 / Math.PI;
            }
        }

        /**
         * 由旋转角度获的外四边形的宽
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   横坐标偏移量
         * @param    {integer}    y   纵坐标偏移量
         */

    }, {
        key: 'getRotateWidth',
        value: function getRotateWidth() {
            var diagonal = Math.sqrt(Math.pow(this.DomWidth, 2) + Math.pow(this.DomHeight, 2));
            var diagonalRotateMax = Math.atan(this.DomWidth / this.DomHeight) * 180 / Math.PI;
            var diagonalRotateMin = Math.atan(this.DomHeight / this.DomWidth) * 180 / Math.PI;
            if (0 < this.rotate && this.rotate <= 90) {
                if (0 < diagonalRotateMax + this.rotate && diagonalRotateMax + this.rotate <= 90) {
                    this.rotateWidth = diagonal * Math.sin((diagonalRotateMax + this.rotate) * Math.PI / 180);
                } else {
                    this.rotateWidth = diagonal * Math.sin((180 - diagonalRotateMax - this.rotate) * Math.PI / 180);
                }
            } else if (90 < this.rotate && this.rotate <= 180) {
                if (diagonalRotateMin + this.rotate <= 180) {
                    this.rotateWidth = diagonal * Math.sin((diagonalRotateMin + this.rotate - 90) * Math.PI / 180);
                } else {
                    this.rotateWidth = diagonal * Math.sin((270 - diagonalRotateMin - this.rotate) * Math.PI / 180);
                }
            } else if (180 < this.rotate && this.rotate <= 270) {
                if (diagonalRotateMax + this.rotate <= 270) {
                    this.rotateWidth = diagonal * Math.sin((diagonalRotateMax + this.rotate - 180) * Math.PI / 180);
                } else {
                    this.rotateWidth = diagonal * Math.sin((360 - diagonalRotateMax - this.rotate) * Math.PI / 180);
                }
            } else if (270 < this.rotate && this.rotate < 360) {
                if (diagonalRotateMax + this.rotate <= 360) {
                    this.rotateWidth = diagonal * Math.sin((diagonalRotateMin + this.rotate - 270) * Math.PI / 180);
                } else {
                    this.rotateWidth = diagonal * Math.sin((450 - diagonalRotateMin - this.rotate) * Math.PI / 180);
                }
            }
        }

        /**
        * 由旋转角度获的外四边形的高
        * ! 该方法将由Drag模块自动调用
        * @param    {document}   dom [description]
        *
        */

    }, {
        key: 'getRotateHeight',
        value: function getRotateHeight() {
            var diagonal = Math.sqrt(Math.pow(this.DomWidth, 2) + Math.pow(this.DomHeight, 2));
            var diagonalRotateMax = Math.atan(this.DomWidth / this.DomHeight) * 180 / Math.PI;
            var diagonalRotateMin = Math.atan(this.DomHeight / this.DomWidth) * 180 / Math.PI;
            if (this.rotate <= 90) {
                if (0 < diagonalRotateMin + this.rotate && diagonalRotateMin + this.rotate <= 90) {
                    this.rotateHeight = diagonal * Math.sin((diagonalRotateMin + this.rotate) * Math.PI / 180);
                } else {
                    this.rotateHeight = diagonal * Math.sin((180 - diagonalRotateMin - this.rotate) * Math.PI / 180);
                }
            } else if (90 < this.rotate && this.rotate <= 180) {
                if (diagonalRotateMax + this.rotate <= 180) {
                    this.rotateHeight = diagonal * Math.sin((diagonalRotateMax + this.rotate - 90) * Math.PI / 180);
                } else {
                    this.rotateHeight = diagonal * Math.sin((270 - diagonalRotateMax - this.rotate) * Math.PI / 180);
                }
            } else if (180 < this.rotate && this.rotate <= 270) {
                if (diagonalRotateMin + this.rotate <= 270) {
                    this.rotateHeight = diagonal * Math.sin((diagonalRotateMin + this.rotate - 180) * Math.PI / 180);
                } else {
                    this.rotateHeight = diagonal * Math.sin((360 - diagonalRotateMin - this.rotate) * Math.PI / 180);
                }
            } else if (270 < this.rotate && this.rotate < 360) {
                if (diagonalRotateMin + this.rotate <= 360) {
                    this.rotateHeight = diagonal * Math.sin((diagonalRotateMax + this.rotate - 270) * Math.PI / 180);
                } else {
                    this.rotateHeight = diagonal * Math.sin((450 - diagonalRotateMax - this.rotate) * Math.PI / 180);
                }
            }
        }
    }]);

    return DragRotateClass;
}(_Base.BaseClass);